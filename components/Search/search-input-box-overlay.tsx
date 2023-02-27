import { Fragment, useState } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { EscIcon, SearchIcon } from "../icons";
import { useRouter } from "next/router";

const Projects = [
  {
    id: 1,
    title: "title one",
  },
  {
    id: 2,
    title: "title two",
  },
  {
    id: 3,
    title: "title three",
  },
  {
    id: 4,
    title: "title four",
  },
];

export default function SearchBoxOverlay({ isSearchOpen, setIsSearchOpen }) {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const filteredProjects = query
    ? Projects.filter((project) =>
        project.title.toLowerCase().includes(query.toLocaleLowerCase())
      )
    : [];

  return (
    <Transition.Root
      show={isSearchOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={setIsSearchOpen}
        className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/70" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(project) => {
              setIsSearchOpen(false);
              window.location.href = `/project/${project.id}`;
              router.push(`/project/${project.id}`);
            }}
            as="div"
            className="relative mx-auto max-w-xl divide-y divide-gray-100 rounded-xl bg-white shadow-2xl  ring-1 ring-black/5"
          >
            <div className="flex items-center px-4 ">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                className="h-12  w-full overflow-hidden border-0 bg-transparent pl-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                placeholder="Search"
              />
            </div>

            {filteredProjects.length > 0 && (
              <Combobox.Options static>
                {filteredProjects.map((project) => (
                  <Combobox.Option
                    key={project.id}
                    value={project}
                    className="max-h-96 overflow-y-auto  py-2 text-sm"
                  >
                    {({ active }) => (
                      <div
                        className={`space-x-1   p-4 ${
                          active ? "bg-indigo-600" : "bg-white"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {project.title}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredProjects.length === 0 && (
              <p className="p-4 text-sm text-gray-500">no result found </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
