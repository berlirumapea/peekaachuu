import userEvent from "@testing-library/user-event";
import PokemonDetail from "../pages/poke/[poke]";
import { bulbasaur, pikachu } from "./utils/mock-data";
import { mockRouter, render, screen, waitFor } from "./utils/test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";

// create a mock server
const server = setupServer(
  rest.get(pikachu.pokemon.species.url, (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    return res(ctx.json({ capture_rate: 190 }));
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

/* 
  it's causing this error if it's not mocked

  Invalid src prop (https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png) on `next/image`, hostname "raw.githubusercontent.com" is not configured under images in your `next.config.js`
*/
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

describe("Pokemon Detail", () => {
  beforeEach(() => {
    render(<PokemonDetail poke={pikachu.pokemon} />);
  });

  it("renders pikachu detail page", () => {
    expect(screen.getByTestId("poke-title")).toBeInTheDocument();

    expect(screen.getByTestId("poke-title").textContent).toBe("pikachu");
  });

  it("renders list of pikachu's moves", () => {
    expect(screen.getAllByTestId("move")).toHaveLength(
      pikachu.pokemon.moves.length
    );
  });

  it("renders list of pikachu's types", () => {
    expect(screen.getAllByTestId("type")).toHaveLength(
      pikachu.pokemon.types.length
    );
  });

  it("renders list of pikachu's abilities", () => {
    expect(screen.getAllByTestId("ability")).toHaveLength(
      pikachu.pokemon.abilities.length
    );
  });

  it("renders list of pikachu's basic info", () => {
    const h = pikachu.pokemon.height / 10 + "m";
    const w = pikachu.pokemon.weight / 10 + "kg";

    expect(screen.getByText(h)).toBeInTheDocument();
    expect(screen.getByText(w)).toBeInTheDocument();
  });
});

jest.useFakeTimers();

it("catches pikachuuuw successfully", async () => {
  render(<PokemonDetail poke={pikachu.pokemon} />);

  userEvent.click(screen.getByText("Press to catch the poke!"));
  expect(screen.getByTestId("poke-modal")).toBeInTheDocument();

  // get ready state
  expect(screen.getByText("Getting ready...")).toBeInTheDocument();

  // catching the poke (fetch data)
  await waitFor(() => {
    expect(screen.getByText("Catching the poke...")).toBeInTheDocument();
  });

  // data arrives, capture rate is more 50
  await waitFor(() =>
    expect(screen.getByText("Success catch! GG EZ!")).toBeInTheDocument()
  );

  // input name shows up
  expect(screen.getByText("Submit")).toBeInTheDocument();

  const pikaNick = "My peekacuww";

  // type pokemon nickname
  userEvent.type(
    screen.getByPlaceholderText("Name your poke here.."),
    pikaNick
  );

  // click to save
  userEvent.click(screen.getByText("Submit"));

  // go to /mypokes
  expect(mockRouter.push).toHaveBeenCalled();
});

it("fails to catch pokemon bulbasaur", async () => {
  render(<PokemonDetail poke={bulbasaur.pokemon} />);

  userEvent.click(screen.getByText("Press to catch the poke!"));
  expect(screen.getByTestId("poke-modal")).toBeInTheDocument();

  // get ready state
  expect(screen.getByText("Getting ready...")).toBeInTheDocument();

  // catching the poke (fetch data)
  await waitFor(() => {
    expect(screen.getByText("Catching the poke...")).toBeInTheDocument();
  });

  // data arrives, capture rate is more 50
  await waitFor(() =>
    expect(
      screen.getByText("Sorry! Pokemon is too strong to catch")
    ).toBeInTheDocument()
  );

  const closeFn = jest.fn();

  screen.getByText("Close").onclick = closeFn;

  // close modal if fail
  userEvent.click(screen.getByText("Close"));

  expect(closeFn).toHaveBeenCalled();
});
