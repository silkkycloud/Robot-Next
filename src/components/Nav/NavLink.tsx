import React from "react"
import { useRouter } from "next/router"

import classNames from "@/functions/classNames"

import Link from "next/link"
import type { IconType } from "react-icons"

export type ExternalLinkProps = {
  name: string
  href: string
  Icon?: IconType
}

export type InternalLinkProps = {
  name: string
  href: string
  Icon?: IconType
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const ExternalLink = ({
  name,
  href,
  Icon,
}: ExternalLinkProps): JSX.Element => (
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

export const InternalLink = ({
  name,
  href,
  Icon,
  onClick,
}: InternalLinkProps): JSX.Element => {
  const router = useRouter()

  return (
    <Link href={href} key={name} passHref>
      <a
        className={classNames(
          router.pathname === href
            ? "bg-gray-100 dark:bg-neutral-900 text-red-600 dark:text-white"
            : "text-gray-600 dark:text-neutral-400 hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-900 dark:hover:text-white",
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        )}
        onClick={onClick}
      >
        {/* @ts-ignore */}
        <Icon
          className={classNames(
            router.pathname === href
              ? "text-red-600 dark:bg-neutral-900"
              : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white",
            "mr-3 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
        {name}
      </a>
    </Link>
  )
}
