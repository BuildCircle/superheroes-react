import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Select from "../../components/CharacterSelect";
import { Character, getAll } from "../../services/characters";

export default function CharacterSelect() {
  const navigate = useNavigate();
  const { data: heros = [] } = useQuery("characters", getAll, {
    select: (data) => data.filter((c) => c.type === "hero"),
  });
  const { data: villains = [] } = useQuery("characters", getAll, {
    select: (data) => data.filter((c) => c.type === "villain"),
  });

  const [hero, setHero] = useState<Character>();
  const [villain, setvillain] = useState<Character>();

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <h1 className="text-4xl">Select Characters</h1>
        <div className="flex items-center gap-8">
          <div className="">
            <Select
              value={hero}
              onChange={setHero}
              placeholder="Choose your hero..."
              options={heros}
            />
          </div>
          <div className="">VS</div>
          <div className="">
            <Select
              value={villain}
              onChange={setvillain}
              placeholder="Choose your villain..."
              options={villains}
            />
          </div>
        </div>

        <div className="">
          <Button
            disabled={!hero || !villain}
            onClick={() => navigate(`/${hero?.name}/${villain?.name}`)}
          >
            Fight!
          </Button>
        </div>
      </div>
    </div>
  );
}
