import { Character } from "../../services/characters";

const determineStrongerCharacter = (hero: Character, villain: Character) => {
  if (hero.score > villain.score) return hero;
  else if (villain.score > hero.score) return villain;
  else if (hero.score === villain.score) return hero;
};

export default determineStrongerCharacter;
