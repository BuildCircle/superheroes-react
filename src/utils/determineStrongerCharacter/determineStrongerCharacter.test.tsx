import determineStrongerCharacter from ".";
import { hero, villain } from "../../services/characters/character.mock";

type Input = Parameters<typeof determineStrongerCharacter>;
type Output = ReturnType<typeof determineStrongerCharacter>;

describe("Util - determineStrongerCharacter", () => {
  it.each([
    [
      [
        { ...hero, score: 7 },
        { ...villain, score: 8 },
      ] as Input,
      { ...villain, score: 8 } as Output,
    ],
    [
      [
        { ...hero, score: 8 },
        { ...villain, score: 7 },
      ] as Input,
      { ...hero, score: 8 } as Output,
    ],
    [
      [
        { ...hero, score: 8 },
        { ...villain, score: 8 },
      ] as Input,
      null as Output,
    ], // Tie
  ])(
    "should correctly calculate the stronger character based on score",
    (input, output) => {
      expect(determineStrongerCharacter(...input)).toEqual(output);
    }
  );
});
