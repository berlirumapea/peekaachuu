import styled from "@emotion/styled";

const Container = styled.div`
  margin: auto;
  max-width: 30rem;
  background-color: #ffffff;
  height: 100vh;
  position: relative;
  padding-top: 3.5rem;
`;

const Main = styled.main`
  height: 100%;
`;

const Nav = styled.nav`
  height: 3.5rem;
  width: full;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const H1 = styled.h1`
  margin: 0;
  text-transform: capitalize;
`;

const Page = ({ children, title = "Pokemon" }) => {
  return (
    <Container>
      <Nav>
        <H1>{title}</H1>
      </Nav>
      <Main>{children}</Main>
    </Container>
  );
};

export default Page;
