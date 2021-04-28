import styled from "@emotion/styled";
import Head from "next/head";
import Page from "../../components/Page";
import { PokemonDetailQuery } from "../../queries";
import client from "../../app-apollo-client";
import Container from "../../components/Container";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { poke } = context.params;

  const { data } = await client.query({
    query: PokemonDetailQuery,
    variables: {
      pokemonName: poke,
    },
  });

  // graphql-pokeapi doesn't provide data for
  // capture_rate, so i need to do a `fetch` instead
  const species = await fetch(data?.pokemon?.species?.url);

  return {
    props: {
      poke: data?.pokemon,
      species: await species.json(),
    },
  };
}

const PokeDetailContainer = styled(Container)`
  padding: 0 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "logo detail detail"
    "types types types"
    "moves moves moves";
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
`;

const DetailContainer = styled.div`
  min-height: auto;
  border: 1px solid #eaeaea;
  background-color: white;
  padding: 1rem;

  h4 {
    margin: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eaeaea;
    color: var(--secondary);
    font-weight: 400;
  }
`;

const PokeBasicInfoContainer = styled(DetailContainer)`
  grid-area: detail;
`;

const PokeMoveContainer = styled(DetailContainer)`
  grid-area: moves;
`;

const PillWrapper = styled.div`
  display: grid;
  font-size: 12px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 4px;
`;

const PillBadge = styled.span`
  padding: 4px 4px;
  background-color: #fcfbfb;
  border-radius: 999px;
  border: 1px solid #eaeaea;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 203, 5, 0.4);
  }
`;

const PokeTypesContainer = styled(DetailContainer)`
  grid-area: types;
`;

const DataRow = styled.div`
  display: flex;
  width: full;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
  font-size: 1rem;

  span {
    &:first-child {
      color: #656f7c;
      font-size: 0.75rem !important;
    }
  }
`;

export default function PokemonDetail({ poke, species }) {
  console.log(poke, species);
  const title = poke?.name || "Pokemon Detail";

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Page title={title}>
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
          <PokeBasicInfoContainer>
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
          </PokeBasicInfoContainer>

          {/* Moves */}
          <PokeMoveContainer>
            <h4>Moves</h4>
            <PillWrapper>
              {poke?.moves.map(({ move }, i) => (
                <PillBadge key={move.name || i}>{move.name}</PillBadge>
              ))}
            </PillWrapper>
          </PokeMoveContainer>

          {/* Types */}
          <PokeTypesContainer>
            <h4>Types</h4>
            <PillWrapper>
              {poke?.types.map(({ type }, i) => (
                <PillBadge key={type.name || i}>{type.name}</PillBadge>
              ))}
            </PillWrapper>
          </PokeTypesContainer>
        </PokeDetailContainer>
      </Page>
    </div>
  );
}
