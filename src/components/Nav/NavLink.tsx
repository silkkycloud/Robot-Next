import React from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

export type NavLinksProps = {
  name: string,
  href: string,
  Icon?: React.ReactNode,
  external?: boolean,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NavLink = ({name, href, Icon, external, onClick}: NavLinksProps) => {

  const router = useRouter()

  return (
    <>
      {external ? (
        <a
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          href={href}
          key={name}
          rel="noreferrer"
          target="_blank"
        >
          {/* @ts-ignore */}
          <Icon
            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          {name}
        </a>
        )
        : (
          <Link href={href} key={name} passHref>
            <a
              className={classNames(
                router.pathname === href ? 'bg-gray-100 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
              onClick={onClick}
            >
              {/* @ts-ignore */}
              <Icon
                className={classNames(
                  router.pathname === href ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {name}
            </a>
          </Link>
        )
      }
    </>
  )
}

export default NavLink
