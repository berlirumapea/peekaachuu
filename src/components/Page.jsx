import styled from "@emotion/styled";

const PageContainer = styled.div`
  margin: auto;
  height: 100vh;
  position: relative;
  padding-top: 3.5rem;
`;

const Main = styled.main`
  height: 100%;
  overflow-y: auto;
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

const NavContainer = styled.div`
  height: 4rem;
  width: 100%;
  max-width: 100%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: rgb(0 0 0 / 7%) 0px 4px 6px -1px;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 60rem;
  margin: auto;
  text-align: center;

  img {
    width: 125px;
  }
`;

const H1 = styled.h1`
  margin: 0;
  text-transform: capitalize;
`;

const Page = ({ children, title }) => {
  return (
    <PageContainer>
      <NavContainer>
        <Nav>
          {title ? (
            <H1>{title}</H1>
          ) : (
            <img
              src="https://i.pinimg.com/originals/de/8a/0f/de8a0f82f1449b48f71828ede116ecd9.png"
              alt="Pokenom logo"
            />
          )}
        </Nav>
      </NavContainer>
      <Main>{children}</Main>
    </PageContainer>
  );
};

export default Page;
