import { customPuzzleInputState, queuedPuzzlePartsState } from "@/lib/atoms";
import { PuzzleContext } from "@/lib/context";
import { Transition, Dialog } from "@headlessui/react";
import {
  PencilSquareIcon,  
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAtomValue, useSetAtom } from "jotai";

type FormData = {
  input: string;
};

const EditInputButton = () => {
  const { day, input } = useContext(PuzzleContext);
  const customInput = useAtomValue(customPuzzleInputState(day));
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      input: customInput || input,
    },
  });

  const setCustomPuzzleInput = useSetAtom(customPuzzleInputState(day));
  const updateCustomizedInput = (day: string, input: string | null) => {
    setCustomPuzzleInput(input);
  };

  const setQueuedPuzzleParts = useSetAtom(queuedPuzzlePartsState);
  const queueDay = (day: string) => {
    setQueuedPuzzleParts((old) => [...old, `${day}-1`, `${day}-2`]);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const onSubmit = handleSubmit(async (data) => {
    console.log("submit", data);
    const cleanedInput = data.input.trim();
    setValue("input", cleanedInput);
    if (cleanedInput === input) {
      updateCustomizedInput(day, null);      
      await new Promise((resolve) => setTimeout(resolve, 25));
      queueDay(day);
    } else {
      updateCustomizedInput(day, cleanedInput);
      // same as above
      await new Promise((resolve) => setTimeout(resolve, 25));
      queueDay(day);
    }
    closeModal();
  });
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="relative inline-flex items-center px-4 py-2 text-sm group rounded-l-md btn-defaults"
      >
        Edit Puzzle Input
        <PencilSquareIcon
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1 text-accent-purple group-hover:text-white group-focus:text-white"
        />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="glass-panel relative w-full max-w-lg px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl sm:max-w-sm sm:my-8 sm:p-6">
                  <form
                    onSubmit={onSubmit}
                    onReset={() => {
                      setValue("input", input || "");
                    }}
                  >
                    <div className="sm:flex sm:items-start">
                      <div className="flex flex-col w-full mt-0 text-center sm:text-left">
                        <div className="flex justify-between">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-accent-gold"
                          >
                            Edit Puzzle Input
                          </Dialog.Title>
                          <button
                            type="button"
                            className="rounded-md text-white/60 hover:text-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold ring-offset-transparent focus:ring-offset-2"
                            onClick={closeModal}
                          >
                            <span className="sr-only">Close</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-4">
                          <textarea
                            {...register("input")}
                            rows={10}
                            defaultValue={input}
                            className="block w-full rounded-md shadow-sm resize-none selection:bg-accent-gold selection:text-white bg-glass-bg-light text-white border-glass-border focus:border-accent-gold focus:ring-accent-gold sm:text-sm backdrop-blur-md"
                            placeholder="Paste your puzzle input here"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-accent-purple border border-transparent rounded-md shadow-sm text-white hover:bg-white hover:text-accent-purple focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ring-offset-transparent transition-all duration-200 backdrop-blur-md glow-purple"
                      >
                        Save and Run
                        <PlayIcon
                          aria-hidden="true"
                          className="w-4 h-4 ml-1.5 -mr-1"
                        />
                      </button>
                      <button
                        type="reset"
                        disabled={input === watch("input")}
                        className="relative inline-flex items-center rounded-md px-4 py-1.5 btn-defaults group"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default EditInputButton;
