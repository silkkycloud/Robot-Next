import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { HiSelector, HiCheck } from 'react-icons/hi'

import classNames from '@/functions/classNames'

export type listItemsType = {
  id: number
  name: string
}[]

export interface MenuProps {
  selected: { id: number; name: string }
  setSelected: Dispatch<SetStateAction<{ id: number; name: string }>>
  className?: string
  listName: string
  listItems: listItemsType
}

const Menu = (props: MenuProps) => (
  <Listbox value={props.selected} onChange={props.setSelected}>
    {({ open }) => (
      <>
        <Listbox.Label className="block text-sm font-medium text-gray-600 dark:text-neutral-400">
          {props.listName}
        </Listbox.Label>
        <div className="mt-1 relative">
          <Listbox.Button className="bg-white dark:bg-neutral-800 relative w-full border border-gray-300 dark:border-black rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 sm:text-sm">
            <span className="block truncate">
              {props.selected.name.replace('_', ' ')}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {props.listItems.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    classNames(
                      active
                        ? 'text-white bg-red-600'
                        : 'text-black dark:text-white',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {item.name.replace('_', ' ')}
                      </span>

                      {selected ?? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-red-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
)

export default Menu
