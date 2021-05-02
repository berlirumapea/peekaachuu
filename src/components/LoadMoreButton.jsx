import { css } from "@emotion/react";
import Container from "./Container";

const LoadMoreButton = ({ onClick, isLoading = false, children, ...props }) => {
  return (
    <Container
      css={css`
        padding-left: 1rem;
        padding-right: 1rem;

        button {
          width: 100%;
          outline: none;
          background-color: var(--primary);
          border: 2px solid var(--tertiary);
          font-weight: 500;
          font-size: 1rem;
          padding-top: 10px;
          padding-bottom: 10px;
          cursor: pointer;

          &:active {
            box-shadow: inset 0px 0px 999px 100px rgba(0, 0, 0, 0.08);
          }
        }
      `}
    >
      <button
        data-testid="loadmore-button"
        {...props}
        onClick={onClick}
        disabled={isLoading}
      >
        {children}
      </button>
    </Container>
  );
};

export default LoadMoreButton;
