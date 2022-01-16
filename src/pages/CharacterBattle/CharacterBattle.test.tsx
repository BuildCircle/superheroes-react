import { act, screen } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import { Route, Routes } from "react-router-dom";
import CharacterBattle from ".";

import {
  hero,
  mock as characterMock,
  villain,
} from "../../services/characters/character.mock";
import { renderWithRouter } from "../../test-util";
import determineStrongerCharacter from "../../utils/determineStrongerCharacter";

jest.mock("../../utils/determineStrongerCharacter", () => {
  const _determineStrongerCharacter = jest.requireActual(
    "../../utils/determineStrongerCharacter"
  );

  return jest.fn(_determineStrongerCharacter.default);
});

describe("Page - Character Battle", () => {
  const path = "/:hero/:villain";

  const renderPage = (route = "/Hero/Villain") =>
    renderWithRouter(
      <Routes>
        <Route path={path} element={<CharacterBattle />} />
      </Routes>,
      {
        route: route,
      }
    );

  beforeEach(() => {
    jest.useFakeTimers();

    fetch.mockResponse(
      JSON.stringify({
        items: characterMock,
      })
    );
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.useRealTimers();
  });

  it("should render the heros name", async () => {
    renderPage();

    await screen.findByText(hero.name);
  });

  it("should render the villains name", async () => {
    renderPage();

    await screen.findByText(villain.name);
  });

  it("should simulate a battle", async () => {
    fetch.mockResponse(
      JSON.stringify({
        items: characterMock,
      })
    );

    renderPage();

    await screen.findByText(/battling/i);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(determineStrongerCharacter).toHaveBeenCalledWith(hero, villain);

    expect(await screen.findByTestId("winner")).toHaveTextContent(hero.name);
  });

  it("should handle ties", async () => {
    fetch.mockResponse(
      JSON.stringify({
        items: [
          { ...hero, score: 7 },
          { ...villain, score: 7 },
        ],
      })
    );

    renderPage();

    await screen.findByText(/battling/i);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await screen.findByText(`It's a tie!`);
  });

  it("should handle api failures", async () => {
    fetch.mockRejectedValueOnce(new Error("Oops"));

    renderPage();

    await screen.findByTestId(`error`);
  });

  it("should unknown characters", async () => {
    renderPage("/bob/Villain");

    await screen.findByText(`Hmmm we don't know that one`);
  });
});
