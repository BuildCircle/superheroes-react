export type Character = {
  name: string;
  score: Number;
  type: "hero" | "villain";
  weakness?: string;
};

const characterApi = (): Promise<Character[]> =>
  // Would normally use config or process.env here
  fetch("https://s3.eu-west-2.amazonaws.com/build-circle/characters.json", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.items)
    .catch((err: Error) => err.message);

export const getAll = () => characterApi();

export const getByName = async (
  characterName: string
): Promise<Character | null> => {
  const characters = await getAll();

  return (
    characters.find((character) => character.name === characterName) ?? null
  );
};
