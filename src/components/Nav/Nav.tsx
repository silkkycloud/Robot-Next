import React from 'react'
import { Fragment, useState } from 'react'

import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'

import { AiFillFire, AiFillHeart, AiFillGithub } from 'react-icons/ai'
import { FaRss } from 'react-icons/fa'
import { HiOutlineX, HiMenuAlt2 } from 'react-icons/hi'
import { IoIosSettings } from 'react-icons/io'

import { navigationType } from './NavLinks'

import NavLinks from './NavLinks'
import SearchBox from '../SearchBox/SearchBox'

export type NavProps = {
  children?: React.ReactNode
}

const navigation:navigationType = [
  {
    name: 'Trending',
    href: '/trending',
    icon: AiFillFire
  },
  {
    name: 'Feed',
    href: '/feed',
    icon: FaRss
  },
  {
    name: 'Subscriptions',
    href: '/subscriptions',
    icon: AiFillHeart
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: IoIosSettings
  }
]

const secondaryNavigation:navigationType = [
  {
    name: 'GitHub',
    href: 'https://github.com/silkkycloud',
    icon: AiFillGithub,
    external: true
  },
  {
    name: 'Donate',
    href: 'https://www.silkky.cloud/contribute',
    icon: AiFillHeart,
    external: true
  }
]

const Nav = ({children}: NavProps) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <section>
        {/* Dynamic sidebar for mobile */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <HiOutlineX className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link href="/" passHref>
                    <img
                      className="h-10 w-auto cursor-pointer"
                      src="/logo.svg"
                      alt="Piped"
                      onClick={() => setSidebarOpen(false)}
                    />
                  </Link>
                </div>
                <div className="mt-5 flex-grow h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    <NavLinks
                      navigation={navigation}
                      onClick={() => setSidebarOpen(false)}
                    />
                  </nav>
                </div>
                <div className="mt-5 flex flex-col">
                  <nav className="px-2 space-y-1">
                    <NavLinks
                      navigation={secondaryNavigation}
                      onClick={() => setSidebarOpen(false)}
                    />
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col h-screen flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/" passHref>
                <img
                  className="h-10 w-auto cursor-pointer"
                  src="/logo.svg"
                  alt="Piped"
                />
              </Link>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <NavLinks navigation={navigation} />
              </nav>
            </div>
            <div className="mt-5 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <NavLinks
                  navigation={secondaryNavigation}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar menu opener and search bar */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenuAlt2 className="h-8 w-8" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <SearchBox />
              </div>
            </div>
          </div>

          {/* Primary page content */}
          {children ? (
            <main className="flex-1">
              <div className="py-6">
                {children}
              </div>
            </main>
          ) : null}
        </div>
      </section>
    </>
  )
}

export default Nav
