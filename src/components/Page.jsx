import Image from "next/image";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 125px;
  }

  a {
    position: absolute;
    left: 0;
    font-size: 0.875rem;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Page = ({ children, title }) => {
  const router = useRouter();

  return (
    <PageContainer>
      <NavContainer>
        <Nav>
          {router.pathname !== "/" ? (
            <Link href="/">
              <a>Back</a>
            </Link>
          ) : null}

          {title ? (
            <H1>{title}</H1>
          ) : (
            <Image
              src="/s.png"
              alt="Pokenom logo"
              layout="fixed"
              width={125}
              height={45}
            />
          )}
        </Nav>
      </NavContainer>
      <Main>{children}</Main>
    </PageContainer>
  );
};

export default Page;
