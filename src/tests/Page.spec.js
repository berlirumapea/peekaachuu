import Page from "../components/Page";
import { mockRouter, screen, render } from "./utils/test-utils";

describe("Page", () => {
  it("renders page component", () => {
    render(<Page />);

    // check if logo exits
    expect(screen.getByTestId("pokemon-logo")).toBeInTheDocument();
  });

  it("renders nav link to /mypokes", () => {
    render(<Page />);

    // check if link to my pokes is there
    expect(screen.getByTestId("mypokes-link")).toBeInTheDocument();

    expect(screen.getByTestId("mypokes-link").getAttribute("href")).toBe(
      "/mypokes"
    );
  });

  it("renders page with custom title", () => {
    const customTitle = "Custom Title";
    render(<Page title={customTitle} />);

    // check if the title exists
    expect(screen.getByTestId("page-title").textContent).toBe(customTitle);
  });

  it("renders children", () => {
    render(
      <Page>
        <div>Children</div>
      </Page>
    );

    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("renders back link when not in home page", () => {
    mockRouter.pathname = "/mypokes";
    render(<Page />);

    expect(screen.getByTestId("back-link")).toBeInTheDocument();
  });
});
