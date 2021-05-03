import { MockedProvider } from "@apollo/client/testing";
import { useReactiveVar } from "@apollo/client";
import MyPokes from "../pages/mypokes";
import { act, render, screen, waitFor } from "./utils/test-utils";
import { myPokesVar } from "../apollo/client";
import userEvent from "@testing-library/user-event";

jest.mock("next/image", () => ({ src, alt, ...props }) => (
  <img src={src} alt={alt} {...props} />
));

describe("My Pokes", () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <MyPokes />
      </MockedProvider>
    );

    act(() => {
      myPokesVar([
        {
          id: 0,
          name: "pikachu",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          nickname: "Peeekaacuw",
        },
      ]);
    });
  });
  it("renders the page", () => {
    expect(screen.getByTestId("poke-container")).toBeInTheDocument();
  });

  it("renders list of pokes from localStorage", () => {
    expect(screen.getByTestId("mypoke-card")).toBeInTheDocument();
  });

  it("release the pokemon", async () => {
    const confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockImplementation(jest.fn(() => true));

    userEvent.click(screen.getByText("Release"));

    expect(confirmSpy).toHaveBeenCalled();

    expect(screen.queryByTestId("mypoke-card")).not.toBeInTheDocument();
  });
});
