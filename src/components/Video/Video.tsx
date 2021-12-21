import React from 'react'

import { timeFormat, numberFormat } from '../../functions/format'

import Image from 'next/image'
import Link from 'next/link'
import { HiCheckCircle } from 'react-icons/hi'

export type VideoProps = {
  url: string,
  title: string,
  thumbnail: string,
  uploaderName: string,
  uploaderUrl: string,
  uploaderAvatar: string,
  uploadedDate: string,
  duration: number,
  views: number,
  uploaderVerified: boolean
}

const Video = ({url, title, thumbnail, uploaderName, uploaderUrl, uploaderAvatar, uploadedDate, duration, views, uploaderVerified}: VideoProps) => {
  return (
    <div>
      <div className="space-y-4 cursor-pointer">
        {/* Thumbnail */}
        <Link href={url} passHref>
          <a>
            <div className="aspect-w-3 aspect-h-2">
              <Image
                className="object-cover bg-gray-300 dark:bg-neutral-800"
                src={thumbnail}
                loading="lazy"
                alt={title}
                width={210}
                height={118}
                layout="responsive"
              />
              <div className="relative">
                <div className="absolute bottom-0 right-0 pb-1 pr-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-semibold bg-black opacity-80 text-white">
                    {timeFormat(duration)}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Link>

        {/* Details */}
        <div className="flex flex-row relative">
          <Link href={uploaderUrl} passHref>
            <a>
              <div className="block mr-2 rounded-full">
                <Image
                  className="rounded-full bg-gray-200 dark:bg-neutral-800"
                  src={uploaderAvatar}
                  loading="lazy"
                  alt={uploaderName}
                  width={36}
                  height={36}
                  layout="fixed"
                />
              </div>
            </a>
          </Link>
          <div className="leading-6 space-y-1 pr-2">
            <Link href={url} passHref>
              <a>
                <h3 className="line-clamp-2 text-black dark:text-white text-sm font-semibold">
                  {title}
                </h3>
              </a>
            </Link>
            <Link href={uploaderUrl} passHref>
              <a>
                <div className="flex flex-row items-center text-gray-600 dark:text-neutral-400">
                  <p className="text-sm hover:text-gray-900 dark:hover:text-white">
                    {uploaderName}
                  </p>
                  {uploaderVerified ? <HiCheckCircle className="ml-1 h-4 w-4" /> : null}
                </div>
              </a>
            </Link>
            <Link href={url} passHref>
              <a>
                <div className="flex flex-row items-center text-gray-600 dark:text-neutral-400">
                  <p className="text-sm">
                    {numberFormat(views)} views &#8226; {uploadedDate}
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
