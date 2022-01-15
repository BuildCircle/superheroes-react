import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Character } from "../../services/characters";

type SelectProps = {
  placeholder: string;
  options: Array<Character>;
  value?: Character;
  onChange: (value: Character) => void;
};

export default function Select({
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-64 mt-1 font-sans tracking-normal text-gray-800">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-center bg-white border-2 border-black rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-black focus-visible:ring-offset-2 focus-visible:border-black">
          <span className="block font-bold truncate">
            {value?.name ?? placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.name}
                className={({ active }) =>
                  `${active ? "bg-gray-200" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute text-black inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
