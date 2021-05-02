import styled from "@emotion/styled";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { useMyPokemons } from "../apollo/useMyPokemons";

export const PokesContainer = styled(Container)`
  padding: 1rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1.2rem;
`;

const PokeCardContainer = styled.div`
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 1);
  transition: all 100ms ease-in-out;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;

  a {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
    text-decoration: none;

    span {
      font-size: 12px;
      font-weight: 500;
      padding: 2px 0.5rem;
      color: inherit;
      background-color: var(--primary);
      margin-bottom: 0.5rem;
    }

    div {
      font-size: 0.8rem;
      line-height: 1;
      font-family: "Press Start 2P", cursive;
      min-height: 1rem;
      height: 1.2rem;
      color: inherit;
      margin-bottom: 1rem;
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  button {
    background-color: transparent;
    border: none;
    border-top: 1px solid #eaeaea;
    color: inherit;
    font-size: 0.875rem;
    padding: 10px 0;
    cursor: pointer;
    width: 100%;
    transition: all 100ms ease-in-out;
    &:hover {
      background-color: var(--tertiary);
      color: white;
    }
  }
`;

const PokeCard = ({ poke, ...props }) => {
  const {
    operations: { releasePoke },
  } = useMyPokemons();
  const onClick = () => {
    const conf = confirm(
      "It's a beaufitul poke. Are you sure you want to release this poke to the wild again? :("
    );

    if (conf === true) {
      releasePoke(poke?.id);
    }
  };

  return (
    <PokeCardContainer {...props}>
      <Link href={`/poke/${poke.name}`}>
        <a>
          <Image
            alt={poke.name}
            src={poke.image}
            layout="fixed"
            width={96}
            height={96}
          />
          <div>{poke?.nickname ? poke?.nickname : poke.name}</div>
          {poke?.nickname && <span>{poke.name}</span>}
        </a>
      </Link>
      {poke?.nickname && <button onClick={onClick}>Release</button>}
    </PokeCardContainer>
  );
};

export default PokeCard;
