import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Character, getByName } from "../../services/characters";
import determineStrongerCharacter from "../../utils/determineStrongerCharacter";

export default function CharacterBattle() {
  const { hero, villain } = useParams();
  const heroQuery = useQuery(["hero", hero], () => getByName(hero!));
  const villainQuery = useQuery(["villain", villain], () =>
    getByName(villain!)
  );
  const [tie, setTie] = useState(false);
  const [winner, setWinner] = useState<Character | undefined>(undefined);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!heroQuery.isFetched || !villainQuery.isFetched || timer.current) {
      return;
    }

    timer.current = setTimeout(() => {
      const _winner = determineStrongerCharacter(
        heroQuery.data!,
        villainQuery.data!
      );

      if (_winner) {
        setWinner(_winner);
      } else {
        setTie(true);
      }

      timer.current = null;
    }, 2000);
  }, [heroQuery, villainQuery]);

  if (heroQuery.isError || villainQuery.isError) {
    return <p data-testid="error">Oops something went wrong...</p>;
  }

  if (heroQuery.data === null || villainQuery.data === null) {
    return <p>Hmmm we don't know that one</p>;
  }

  return (
    <div className="relative flex flex-col flex-1 text-5xl">
      <div className="flex flex-col items-center justify-center flex-1 w-full md:flex-row">
        <p className="w-full py-6 text-center md:pr-32">
          {heroQuery.data?.name ?? "????"}
        </p>
        <p className="flex items-center gap-2 text-3xl md:text-5xl">
          <span className="inline-block pb-2">V</span>
          <span className="inline-block w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent md:h-32 rotate-12 "></span>
          <span className="inline-block pt-2">S</span>
        </p>
        <p className="w-full py-6 text-center md:pl-32">
          {villainQuery.data?.name ?? "????"}
        </p>
      </div>

      {winner || tie ? (
        <p
          data-testid="winner"
          aria-live="assertive"
          className="py-20 text-center"
        >
          {winner && (
            <>
              The winner is <span className="underline">{winner.name}</span>!
            </>
          )}
          {tie && "It's a tie!"}
        </p>
      ) : (
        <p className="py-20 text-center animate-pulse">Battling...</p>
      )}
    </div>
  );
}
