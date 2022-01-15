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

describe("Page - Character Battle", () => {
  const path = "/:hero/:villain";
  const routeUnderTest = "/Hero/Villain";

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    jest.useRealTimers();
  });

  it("should play out a battle", async () => {
    fetch.mockResponse(
      JSON.stringify({
        items: characterMock,
      })
    );

    renderWithRouter(
      <Routes>
        <Route path={path} element={<CharacterBattle />} />
      </Routes>,
      {
        route: routeUnderTest,
      }
    );

    await screen.findByText(hero.name);
    await screen.findByText(villain.name);

    await screen.findByText(/battling/i);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Workaround for span tag
    expect(
      (await screen.findByText("The winner is", { exact: false })).textContent
    ).toEqual(`The winner is ${hero.name}!`);
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

    renderWithRouter(
      <Routes>
        <Route path={path} element={<CharacterBattle />} />
      </Routes>,
      {
        route: routeUnderTest,
      }
    );

    await screen.findByText(hero.name);
    await screen.findByText(villain.name);

    await screen.findByText(/battling/i);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await screen.findByText(`It's a tie!`);
  });
});
