import React from 'react'

import { timeFormat, numberFormat } from '@/functions/format'

import Image from 'next/image'
import Link from 'next/link'
import { HiCheckCircle } from 'react-icons/hi'

export interface VideoProps {
  url: string
  title: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploaderAvatar: string
  uploadedDate: string
  duration: number
  views: number
  uploaderVerified: boolean
}

export const LoadingVideo = (): JSX.Element => (
  <div>
    <div className="space-y-4">
      {/* Thumbnail */}
      <div className="aspect-w-3 aspect-h-2">
        <Image
          className="object-cover bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
          src="/images/thumbnail.svg"
          loading="lazy"
          alt=""
          width={210}
          height={118}
          layout="responsive"
        />
      </div>

      {/* Details */}
      <div className="flex flex-row relative">
        <div className="block mr-2 rounded-full">
          <div
            className="rounded-full bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
            style={{
              width: '36px',
              height: '36px',
            }}
          />
        </div>
        <div className="leading-6 space-y-1 pr-2">
          <div className="w-40 h-6 rounded-sm bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
          <div className="w-28 h-6 rounded-sm bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
        </div>
      </div>
    </div>
  </div>
)

const Video = (props: VideoProps): JSX.Element => {
  return (
    <div className="block">
      <div className="space-y-4 cursor-pointer">
        {/* Thumbnail */}
        <Link href={props.url} passHref>
          <a>
            <div className="aspect-w-3 aspect-h-2">
              <Image
                className="object-cover bg-gray-300 dark:bg-neutral-800"
                src={props.thumbnail}
                loading="lazy"
                alt={props.title}
                width={210}
                height={118}
                layout="responsive"
              />
              <div className="relative">
                <div className="absolute bottom-0 right-0 pb-1 pr-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-semibold bg-black opacity-80 text-white">
                    {timeFormat(props.duration)}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Link>

        {/* Details */}
        <div className="flex flex-row relative">
          <Link href={props.uploaderUrl} passHref>
            <a>
              <div className="block mr-2 rounded-full">
                <Image
                  className="rounded-full bg-gray-200 dark:bg-neutral-800"
                  src={props.uploaderAvatar}
                  loading="lazy"
                  alt={props.uploaderName}
                  width={36}
                  height={36}
                  layout="fixed"
                />
              </div>
            </a>
          </Link>
          <div className="leading-6 space-y-1 pr-2">
            <Link href={props.url} passHref>
              <a>
                <h3 className="line-clamp-2 text-black dark:text-white text-sm font-semibold">
                  {props.title}
                </h3>
              </a>
            </Link>
            <Link href={props.uploaderUrl} passHref>
              <a>
                <div className="flex flex-row items-center text-gray-600 dark:text-neutral-400">
                  <p className="text-sm hover:text-gray-900 dark:hover:text-white">
                    {props.uploaderName}
                  </p>
                  {props.uploaderVerified && (
                    <HiCheckCircle className="ml-1 h-4 w-4" />
                  )}
                </div>
              </a>
            </Link>
            <Link href={props.url} passHref>
              <a>
                <div className="flex flex-row items-center text-gray-600 dark:text-neutral-400">
                  <p className="text-sm">
                    {numberFormat(props.views)} views &#8226;{' '}
                    {props.uploadedDate}
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
