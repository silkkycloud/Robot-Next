import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export type navigationType = {
  name: string,
  href: string,
  icon?: React.ReactNode,
  external?: boolean
}[]

export type NavLinksProps = {
  navigation: navigationType
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NavLinks = ({navigation}:NavLinksProps) => {

  const router = useRouter()

  return (
    <>
      {navigation.map((item) => (
        item.external ? (
          <a
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            href={item.href}
            key={item.name}
            rel="noreferrer"
            target="_blank"
          >
            {/* @ts-ignore */}
            <item.icon
              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {item.name}
          </a>
        )
        : (
          <Link href={item.href} key={item.name} passHref>
            <a
              className={classNames(
                router.pathname === item.href ? 'bg-gray-100 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              {/* @ts-ignore */}
              <item.icon
                className={classNames(
                  router.pathname === item.href ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          </Link>
        )
      ))}
    </>
  )
}

export default NavLinks
