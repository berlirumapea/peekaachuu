import styled from "@emotion/styled";
import Image from "next/image";

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;

  p {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: var(--tertiary);
  }
`;

const PikachuLoading = () => {
  return (
    <LoadingContainer>
      <Image
        src="/pikachu_loading.gif"
        alt="Pikachu loading"
        width={150}
        height={81}
      />
      <p>Loading...</p>
    </LoadingContainer>
  );
};

export default PikachuLoading;
