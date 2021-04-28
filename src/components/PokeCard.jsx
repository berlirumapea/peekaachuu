import styled from "@emotion/styled";
import Container from "./Container";

export const PokesContainer = styled(Container)`
  padding: 1rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  grid-gap: 1.2rem;
`;

const PokeCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-top: 0;
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 1);
  transition: all 100ms ease-in-out;
  user-select: none;

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }

  div {
    font-size: 0.8rem;
    line-height: 1;
    font-family: "Press Start 2P", cursive;
  }
`;

const PokeCard = ({ poke }) => {
  return (
    <PokeCardContainer>
      <img alt={poke.name} src={poke.image} />
      <div>{poke.name}</div>
    </PokeCardContainer>
  );
};

export default PokeCard;
