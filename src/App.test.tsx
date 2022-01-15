import { render, screen } from "@testing-library/react";
import App from "./App";
import { renderWithRouter } from "./test-util";

describe("App", () => {
  describe("Routes", () => {
    it("should render the character selection page by default", () => {
      renderWithRouter(<App />);

      expect(screen.getByText(/select character/i)).toBeInTheDocument();
    });

    it("should render the character fight page", () => {
      renderWithRouter(<App />, {
        route: "/hero/villian",
      });

      expect(screen.getByText(/fight/i)).toBeInTheDocument();
    });
  });
});
