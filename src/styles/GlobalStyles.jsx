/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Emotion으로 관리할 글로벌 스타일 */
      a {
        color: inherit;
        text-decoration: none;
      }
      
      ul {
        list-style: none;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    `}
  />
);

export default GlobalStyles;