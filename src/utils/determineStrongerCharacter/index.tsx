import { Character } from "../../services/characters";

const determineStrongerCharacter = (a: Character, b: Character) => {
  if (a.score > b.score) return a;
  else if (b.score > a.score) return b;
  else return null;
};

export default determineStrongerCharacter;
