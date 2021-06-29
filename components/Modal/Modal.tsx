import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { Fragment, useRef } from 'react'

interface Props {
  open?: boolean
  onSubmit?: ((value: string) => void)
  setOpen: (value: boolean) => void
}

/*
  Modal component that can display an overlay modal.
*/
export default function Modal(props: Props) {
  const {
    setOpen,
    onSubmit,
    open = false,
  } = props

  // Ref for cancel button.
  const cancel = useRef(
    null,
  )

  // Ref for the input field.
  const input = useRef(
    null,
  )

  const handler = () => {
    // Invoke the callback if necessary.
    if (input?.current && input?.current?.value && onSubmit) {
      onSubmit(input?.current?.value)
    }

    // Close the dialog.
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="font-orienta fixed z-10 inset-0 overflow-y-auto"
        initialFocus={input}
        open={open}
        onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Pair
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        You probably have text-copy open on another browser. To pair this
                        board with the other instance, enter the Pairing Code you see on
                        the other page. You can find it on the top center of the other
                        page.
                      </p>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        <input
                          className="w-full border border-gray-200 bg-gray-100 rounded-md overflow-hidden px-5 py-4 text-center text-black outline-none"
                          placeholder="Enter Pairing Code Here"
                          ref={input} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handler}>
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancel}>
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
