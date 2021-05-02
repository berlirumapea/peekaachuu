import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { cache } from "../../apollo/client";
import { PokemonsQuery } from "../../queries";
import { nextData } from "./mock-data";

// mock next/router & apollo-client provider
const Provider = ({ children, router }) => {
  return (
    <RouterContext.Provider value={{ ...mockRouter, ...router }}>
      {children}
    </RouterContext.Provider>
  );
};

const customRender = (ui, opts) =>
  render(ui, {
    wrapper: Provider,
    ...opts,
  });

export const mockRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn().mockResolvedValue(true),
  replace: jest.fn().mockResolvedValue(true),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

export * from "@testing-library/react";

export { customRender as render };
