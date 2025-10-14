//src/pages/SubmissionsPage.jsx
import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionAPI, restaurantAPI } from '../services/api';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: ${props => (props.$active ? '#667eea' : 'white')};
  color: ${props => (props.$active ? 'white' : '#333')};
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th, td { border-bottom: 1px solid #eee; padding: 0.5rem; text-align: left; vertical-align: top; }
  th { background: #fafafa; }
  tr:hover { background: #fafafa; }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  &:hover { background: #f5f5f5; }
`;

const Danger = styled(Button)`
  color: #ff4757;
  border-color: #ffb3ba;
`;

function SubmissionsPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('pending');

  const { data, isLoading, error } = useQuery({
    queryKey: ['submissions', status],
    queryFn: () => submissionAPI.listSubmissions(status === 'all' ? undefined : status),
  });

  const items = data?.data || [];

  const approveMutation = useMutation({
    mutationFn: async (submission) => {
      const payload = {
        name: submission.restaurantName,
        category: submission.category,
        location: submission.location,
        priceRange: submission.priceRange || undefined,
        description: submission.review || undefined,
        recommendedMenu: Array.isArray(submission.recommendedMenu) ? submission.recommendedMenu : undefined,
      };
      await restaurantAPI.createRestaurant(payload);
      await submissionAPI.updateSubmission(submission.id, { status: 'approved' });
    },
    onSuccess: () => {
      toast.success('승인하여 레스토랑에 등록했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id }) => submissionAPI.updateSubmission(id, { status: 'rejected' }),
    onSuccess: () => {
      toast.info('제보를 거절했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => submissionAPI.deleteSubmission(id),
    onSuccess: () => {
      toast.info('제보를 삭제했습니다.');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    }
  });

  const statuses = useMemo(() => [
    { key: 'pending', label: '대기' },
    { key: 'approved', label: '승인' },
    { key: 'rejected', label: '거절' },
    { key: 'all', label: '전체' },
  ], []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <Container>
      <Title>제보 관리</Title>
      <Controls>
        {statuses.map(s => (
          <FilterButton key={s.key} $active={status === s.key} onClick={() => setStatus(s.key)}>
            {s.label}
          </FilterButton>
        ))}
      </Controls>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>제보 내용</th>
            <th>제보자</th>
            <th>상태/액션</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>
                <div><strong>{it.restaurantName}</strong> ({it.category})</div>
                <div>{it.location}</div>
                {it.priceRange && <div>가격대: {it.priceRange}</div>}
                {Array.isArray(it.recommendedMenu) && it.recommendedMenu.length > 0 && (
                  <div>메뉴: {it.recommendedMenu.join(', ')}</div>
                )}
                {it.review && <div>한줄평: {it.review}</div>}
              </td>
              <td>
                <div>{it.submitterName || '-'}</div>
                <div>{it.submitterEmail || '-'}</div>
              </td>
              <td>
                <div style={{ marginBottom: '0.5rem' }}>상태: {it.status}</div>
                <Actions>
                  <Button onClick={() => approveMutation.mutate(it)} disabled={it.status === 'approved'}>승인</Button>
                  <Button onClick={() => rejectMutation.mutate({ id: it.id })} disabled={it.status === 'rejected'}>거절</Button>
                  <Danger onClick={() => { if (confirm('삭제하시겠습니까?')) deleteMutation.mutate(it.id); }}>삭제</Danger>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SubmissionsPage;