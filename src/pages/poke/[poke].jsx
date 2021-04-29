import React from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import Image from "next/image";
import Page from "../../components/Page";
import { PokemonDetailQuery } from "../../queries";
import client from "../../app-apollo-client";
import Container from "../../components/Container";
import PokeModal from "../../components/PokeModal";

const PokeDetailContainer = styled(Container)`
  padding: 0 1rem 2rem 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "logo info info info"
    "abilities abilities abilities abilities"
    "types types types types"
    "moves moves moves moves";

  @media screen and (min-width: 768px) {
    grid-template-areas:
      "logo logo info info"
      "types types abilities abilities"
      "moves moves moves moves";
  }
`;

const PokeDetailImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  grid-area: logo;
`;

const PokeDetailImage = styled.div`
  border-radius: 50%;
  border: 5px solid ${(props) => props?.color?.name || "var(--secondary)"};
  height: 110px;
  width: 110px;
  background-color: white;
`;

const DetailContainer = styled.div`
  height: auto;
  border: 1px solid #eaeaea;
  background-color: white;
  padding: 1rem;
  grid-area: ${(props) => props.gridArea};
  box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;

  h4 {
    margin: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eaeaea;
    color: var(--secondary);
    font-weight: 400;
  }
`;

const PillWrapper = styled.div`
  display: grid;
  font-size: 12px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  grid-gap: 4px;
`;

const PillBadge = styled.span`
  padding: 4px 4px;
  border-radius: 999px;
  text-align: center;

  background-color: rgba(255, 203, 5, 0.4);
  border: 1px solid var(--tertiary);
`;

const DataRow = styled.div`
  display: flex;
  width: full;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  font-size: 1rem;
  border-bottom: 1px solid #eaeaea;

  &:last-of-type {
    border-bottom: none;
  }

  span {
    &:first-child {
      color: #656f7c;
      font-size: 0.75rem !important;
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: "Press Start 2P", cursive;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;

  @media screen and (min-width: 500px) {
    font-size: 3rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 4rem;
  }
`;

const CatchButton = styled.button`
  padding: 10px 2rem;
  background-color: var(--primary);
  border: 3px solid var(--tertiary);
  border-radius: 999px;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:active {
    transform: translateY(10px);
  }
`;

export async function getServerSideProps(context) {
  const { poke } = context.params;

  const { data } = await client.query({
    query: PokemonDetailQuery,
    variables: {
      pokemonName: poke,
    },
  });

  return {
    props: {
      poke: data?.pokemon,
    },
  };
}

export default function PokemonDetail({ poke, species }) {
  const title = poke?.name;

  const [status, setStatus] = React.useState("");
  const [showNamePokemon, setShowNamePokemon] = React.useState(false);

  const fetchSpecies = async () => {
    // graphql-pokeapi doesn't provide data for
    // capture_rate, so i need to do a `fetch` instead
    const speciesData = await fetch(poke?.species?.url);
    const data = await speciesData.json();
    return data;
  };

  const catchPoke = React.useCallback(async () => {
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    setStatus("getReady");
    await wait(3000);
    setStatus("readyToThrow");
    const species = await fetchSpecies();
    console.log("speciess", species);
    await wait(3000);
    if (species?.capture_rate > 50) {
      setStatus("successCatch");
      setShowNamePokemon(true);
    } else {
      setStatus("failCatch");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Page title="Pokemon Detail">
        <Title>{title}</Title>
        <PokeDetailContainer>
          <PokeDetailImageContainer>
            <PokeDetailImage color={species?.color}>
              <Image
                src={poke?.sprites?.front_default}
                layout="fixed"
                width={100}
                height={100}
              />
            </PokeDetailImage>
          </PokeDetailImageContainer>

          {/* Basic Info  */}
          <DetailContainer gridArea="info">
            <DataRow>
              <span>Height</span>
              <span>{poke?.height / 10}m</span>
            </DataRow>
            <DataRow>
              <span>Weight</span>
              <span>{poke?.weight / 10}kg</span>
            </DataRow>
            <DataRow>
              <span>Shape</span>
              <span>{species?.shape?.name}</span>
            </DataRow>
            <DataRow>
              <span>Owned</span>
              <span>{0}</span>
            </DataRow>
          </DetailContainer>

          {/* Abilities */}
          <DetailContainer gridArea="abilities">
            <h4>Abilities</h4>
            <PillWrapper>
              {poke?.abilities.map(({ ability }, i) => (
                <PillBadge key={ability.name || i}>{ability.name}</PillBadge>
              ))}
            </PillWrapper>
          </DetailContainer>

          {/* Types */}
          <DetailContainer gridArea="types">
            <h4>Types</h4>
            <PillWrapper>
              {poke?.types.map(({ type }, i) => (
                <PillBadge key={type.name || i}>{type.name}</PillBadge>
              ))}
            </PillWrapper>
          </DetailContainer>

          {/* Moves */}
          <DetailContainer gridArea="moves">
            <h4>Moves</h4>
            <PillWrapper>
              {poke?.moves.map(({ move }, i) => (
                <PillBadge key={move.name || i}>{move.name}</PillBadge>
              ))}
            </PillWrapper>
          </DetailContainer>
          <CatchButton onClick={catchPoke}>
            Press to catch the poke!
          </CatchButton>
          {status === "" ? null : (
            <PokeModal status={status} onClose={() => setStatus("")} />
          )}
        </PokeDetailContainer>
      </Page>
    </div>
  );
}
