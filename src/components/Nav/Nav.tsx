import React from 'react'
import { Fragment, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSnapshot } from 'valtio'
import state from '../../state'

import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import NavLink from './NavLink'
import Search from '../Search/Search'
import { AiFillFire, AiFillHeart, AiFillGithub, AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { FaRss } from 'react-icons/fa'
import { HiOutlineX, HiMenuAlt2 } from 'react-icons/hi'
import { IoIosSettings } from 'react-icons/io'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export type NavProps = {
  children?: React.ReactNode
}

const Nav = ({children}: NavProps): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const snap = useSnapshot(state)

  const {forcedTheme} = useTheme()

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
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-black dark:bg-opacity-75" />
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-neutral-800">
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
                    <a className="cursor-pointer group flex items-center">
                      <Image
                        className="mr-3 flex-shrink-0"
                        src="/logo.svg"
                        alt="Piped"
                        height={50}
                        width={50}
                        onClick={() => setSidebarOpen(false)}
                      />
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        v{snap.version}
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="mt-5 flex-grow h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {snap.authenticated ? <NavLink
                      name="Home"
                      href="/"
                      Icon={AiFillHome}
                      onClick={() => setSidebarOpen(false)}
                    /> : null}
                    <NavLink
                      name="Trending"
                      href="/trending"
                      Icon={AiFillFire}
                      onClick={() => setSidebarOpen(false)}
                    />
                    {snap.authenticated ? <NavLink
                      name="Feed"
                      href="/feed"
                      Icon={FaRss}
                      onClick={() => setSidebarOpen(false)}
                    /> : null}
                    {snap.authenticated ? <NavLink
                      name="Subscriptions"
                      href="/subscriptions"
                      Icon={AiFillHeart}
                      onClick={() => setSidebarOpen(false)}
                    /> : null}
                    <NavLink
                      name="Settings"
                      href="/settings"
                      Icon={IoIosSettings}
                      onClick={() => setSidebarOpen(false)}
                    />
                  </nav>
                </div>
                <div className="mt-5 flex flex-col">
                  <nav className="px-2 space-y-1">
                    <NavLink
                      name="GitHub"
                      href="https://github.com/silkkycloud/piped-robot"
                      Icon={AiFillGithub}
                      external={true}
                    />
                    <NavLink
                      name="Donate"
                      href="https://github.com/silkkycloud/piped-robot"
                      Icon={AiFillHeart}
                      external={true}
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
          <div className="flex flex-col h-screen flex-grow border-r border-gray-200 dark:border-neutral-900 pt-5 bg-white dark:bg-neutral-800 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/" passHref>
                <a className="cursor-pointer group flex items-center">
                  <Image
                    className="mr-3 flex-shrink-0"
                    src="/logo.svg"
                    alt="Piped"
                    height={50}
                    width={50}
                  />
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    v{snap.version}
                  </span>
                </a>
              </Link>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {snap.authenticated ? <NavLink
                  name="Home"
                  href="/"
                  Icon={AiFillHome}
                /> : null}
                <NavLink
                  name="Trending"
                  href="/trending"
                  Icon={AiFillFire}
                />
                {snap.authenticated ? <NavLink
                  name="Feed"
                  href="/feed"
                  Icon={FaRss}
                /> : null}
                {snap.authenticated ? <NavLink
                  name="Subscriptions"
                  href="/subscriptions"
                  Icon={AiFillHeart}
                /> : null}
                <NavLink
                  name="Settings"
                  href="/settings"
                  Icon={IoIosSettings}
                />
              </nav>
            </div>
            <div className="mt-5 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <NavLink
                  name="GitHub"
                  href="https://github.com/silkkycloud/piped-robot"
                  Icon={AiFillGithub}
                  external={true}
                />
                <NavLink
                  name="Donate"
                  href="https://github.com/silkkycloud/piped-robot"
                  Icon={AiFillHeart}
                  external={true}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar menu opener and search bar */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-neutral-800 shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 dark:border-neutral-900 text-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenuAlt2 className="h-8 w-8" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                {/* Search Icon */}
                <div className="w-full flex md:ml-0">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <button
                        type="button"
                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white"
                        onClick={() => setSearchOpen(true)}
                      >
                        <span className="sr-only">Open search</span>
                        <AiOutlineSearch className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white" aria-hidden="true" />
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex md:ml-0">
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="button"
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white"
                      onClick={() => state.settings.selectedTheme = state.settings.selectedTheme == 'dark' ? 'light' : 'dark'}
                    >
                      <span className="sr-only">Switch theme</span>
                      {forcedTheme == 'dark' ? (
                        <MdLightMode className="mr-3 flex-shrink-0 h-6 w-6 text-neutral-400 group-hover:text-white" aria-hidden="true" />
                      ) : (
                        <MdDarkMode className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      )}
                      Theme
                    </button>
                  </div>
                </div>
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

        {/* Search */}
        <Search open={searchOpen} setOpen={setSearchOpen} />

      </section>
    </>
  )
}

export default Nav
