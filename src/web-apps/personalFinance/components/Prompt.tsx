import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { personalFinancePrompt } from "../../../app/actions/personalFinance/prompt";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild, DialogTitle } from "@headlessui/react";
import { IoCloseSharp } from "react-icons/io5";

export default function Prompt() {
  const dispatch = useAppDispatch();
  const loadingComponents = useAppSelector(s => s.loading.components);

  const [value, setValue] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [open, setOpen] = useState(false)

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const [err, response] = await dispatch(personalFinancePrompt({
      question: value,
    }));
    if (err) return;
    setPromptResponse(response);
  }

  const isThinking = !!loadingComponents['PROMPTING']?.requests;

  return (
    <div className="flex flex-col gap-2 relative">
      <button className="fixed top-4 right-4 flex gap-2">
        <span className="text-sm text-gray-700 self-center">Ask FreedomAI</span>
        <LuBrainCircuit className="text-gray-100 bg-secondary p-2 rounded-full scale-light cursor-pointer" size={50} onClick={() => setOpen(!open)} />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <IoCloseSharp />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">Analyse your budget with AI insights</DialogTitle>
                  </div>
                  <div className="relative mt-6 flex flex-col gap-2 px-4 sm:px-6">
                    <form onSubmit={onFormSubmit} className="relative">
                      <LuBrainCircuit className="absolute top-2 left-2 text-sky-600" size={28} />
                      <textarea
                        // type="text"
                        className="outline-gray-300 outline-2 px-12 py-3 text-sm text-gray-700 rounded-lg w-full appearance-none"
                        placeholder="Ask anything related to your budget"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-100 bg-gray-700 p-2 rounded-full cursor-pointer scale-light"
                        onClick={onFormSubmit}
                      >
                        <FaArrowRight />
                      </button>
                    </form>
                    {(isThinking || promptResponse) && <p
                      className="text-gray-700 text-sm border-gray-300 border-1 rounded-lg p-4"
                      dangerouslySetInnerHTML={{
                        __html: isThinking ? 'Thinking...' : promptResponse.replace(/\n/g, '<br />').replace(/#/g, '').replace(/\*\*(.+?)\*\*/g, "<span class='font-bold'>$1</span>")
                      }}
                    ></p>}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
