import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithRouter } from "./test-util";

jest.mock("./pages/CharacterSelect", () => () => "Page - CharacterSelect");
jest.mock("./pages/CharacterBattle", () => () => "Page - CharacterBattle");

describe("App", () => {
  describe("Routes", () => {
    it("should render the character selection page by default", () => {
      renderWithRouter(<App />);

      expect(screen.getByText(/Page - CharacterSelect/i)).toBeInTheDocument();
    });

    it("should render the character fight page", () => {
      renderWithRouter(<App />, {
        route: "/hero/villain",
      });

      expect(screen.getByText(/Page - CharacterBattle/i)).toBeInTheDocument();
    });
  });
});
