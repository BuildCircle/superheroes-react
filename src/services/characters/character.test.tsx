import fetch from "jest-fetch-mock";

import { getAll, getByName as getCharacterByName } from ".";
import { hero, mock, villain } from "./character.mock";

describe("Services - Character", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("getAll", () => {
    it("should return a list of characters", async () => {
      fetch.mockResponse(
        JSON.stringify({
          items: mock,
        })
      );

      expect(await getAll()).toEqual(mock);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://s3.eu-west-2.amazonaws.com/build-circle/characters.json",
        { headers: { "Content-Type": "application/json" } }
      );
    });
  });

  describe("getByName", () => {
    it("should a single character with matching name", async () => {
      fetch.mockResponse(
        JSON.stringify({
          items: mock,
        })
      );

      expect(await getCharacterByName(villain.name)).toEqual(villain);
      expect(await getCharacterByName(hero.name)).toEqual(hero);

      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
