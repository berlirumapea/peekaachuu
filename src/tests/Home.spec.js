import Home from "../pages/index";
import { screen, render, waitFor, cleanup } from "./utils/test-utils";
import userEvent from "@testing-library/user-event";
import { moreData, nextData, pokemons } from "./utils/mock-data";
import { PokemonsQuery } from "../queries";
import { MockedProvider } from "@apollo/client/testing";
import { InMemoryCache } from "@apollo/client";
import LoadMoreButton from "../components/LoadMoreButton";

/*
  I don't know why for some reason, when we are not
  Mocking next/image, error Invalid src prop hostname is not configured under images in your `next.config.js`
*/

jest.mock("next/image", () => ({ src, alt, ...props }) => (
  <img src={src} alt={alt} {...props} />
));

describe("Page", () => {
  let cache;

  afterEach(cleanup);

  beforeEach(() => {
    cache = new InMemoryCache();

    const mocks = [
      {
        request: {
          query: PokemonsQuery,
          variables: {
            limit: 10,
            offset: 10,
          },
        },
        result: {
          data: {
            pokemons: nextData,
          },
        },
      },
      {
        request: {
          query: PokemonsQuery,
          variables: {
            limit: 10,
            offset: 20,
          },
        },
        result: {
          data: {
            pokemons: moreData,
          },
        },
      },
    ];

    render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: "no-cache" },
        }}
      >
        <Home pokemons={pokemons} />
      </MockedProvider>
    );
  });

  it("renders peekaachuw homepage", () => {
    expect(screen.getByTestId("pokemon-logo")).toBeInTheDocument();
  });

  it("renders 10 items of pokemon by default", () => {
    expect(screen.getAllByTestId("poke-card")).toHaveLength(10);
  });

  it("renders placeholders", () => {
    expect(screen.getAllByTestId("placeholder")).toHaveLength(6);
  });

  it("renders 10 more items of pokemon", async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId("poke-card-new")).toHaveLength(10);
    });
  });
});

describe("Load more", () => {
  it("gets clicked", () => {
    const mockCall = jest.fn();
    const isLoading = false;

    render(<LoadMoreButton onClick={mockCall} isLoading={isLoading} />);

    userEvent.click(screen.getByTestId("loadmore-button"));

    expect(mockCall).toHaveBeenCalledTimes(1);
  });
});
