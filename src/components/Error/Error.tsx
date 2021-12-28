import React, { Fragment, useState } from 'react'

import { Transition } from '@headlessui/react'
import { AiFillWarning } from 'react-icons/ai'
import { HiX } from 'react-icons/hi'

export interface ErrorProps {
  code?: string
  message: string
}

const Error = (props: ErrorProps) => {
  const [show, setShow] = useState(true)

  return (
    <>
      <div
        aria-live="assertive"
        className="fixed z-20 inset-x-0 bottom-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AiFillWarning
                      className="h-8 w-8 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    {props.code ? (
                      <h3 className="text-xl font-medium text-red-600">
                        {props.code}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-medium text-black dark:text-white">
                        Error
                      </h3>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {props.message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white dark:bg-neutral-800 rounded-md text-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <HiX className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

export default Error
