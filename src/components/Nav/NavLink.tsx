import React from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { IconType } from 'react-icons'

export type NavLinksProps = {
  name: string,
  href: string,
  Icon?: IconType,
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
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white"
          href={href}
          key={name}
          rel="noreferrer"
          target="_blank"
        >
          {/* @ts-ignore */}
          <Icon
            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
            aria-hidden="true"
          />
          {name}
        </a>
        )
        : (
          <Link href={href} key={name} passHref>
            <a
              className={classNames(
                router.pathname === href ? 'bg-gray-100 dark:bg-neutral-900 text-red-600 dark:text-white' : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
              onClick={onClick}
            >
              {/* @ts-ignore */}
              <Icon
                className={classNames(
                  router.pathname === href ? 'text-red-600 dark:bg-neutral-900' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white',
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
