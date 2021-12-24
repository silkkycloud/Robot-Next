import React from 'react'
import { useLocation } from 'react-router-dom'

import classNames from '@/functions/classNames'

import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'

export interface ExternalLinkProps {
  name: string
  href: string
  Icon?: IconType
}

export interface InternalLinkProps {
  name: string
  href: string
  Icon?: IconType
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const ExternalLink = (props: ExternalLinkProps): JSX.Element => (
  <a
    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white"
    href={props.href}
    key={props.name}
    rel="noreferrer"
    target="_blank"
  >
    {/* @ts-ignore */}
    <props.Icon
      className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
      aria-hidden="true"
    />
    {props.name}
  </a>
)

export const InternalLink = (props: InternalLinkProps): JSX.Element => {
  const { pathname } = useLocation()

  return (
    <Link
      to={props.href}
      key={props.name}
      className={classNames(
        pathname === props.href
          ? 'bg-gray-100 dark:bg-neutral-900 text-red-600 dark:text-white'
          : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white',
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
      )}
      onClick={props.onClick}
    >
      {/* @ts-ignore */}
      <props.Icon
        className={classNames(
          pathname === props.href
            ? 'text-red-600 dark:bg-neutral-900'
            : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white',
          'mr-3 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      />
      {props.name}
    </Link>
  )
}
