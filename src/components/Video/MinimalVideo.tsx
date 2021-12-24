import React from 'react'

import { timeFormat, numberFormat } from '@/functions/format'

import Image from 'next/image'
import Link from 'next/link'

export interface VideoProps {
  url: string
  title: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploadedDate: string
  duration: number
  views: number
}

const MinimalVideo = (props: VideoProps): JSX.Element => {
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
          <div className="leading-6 space-y-1 pr-2">
            <Link href={props.url} passHref>
              <a>
                <h3 className="line-clamp-2 text-black dark:text-white text-sm font-semibold">
                  {props.title}
                </h3>
              </a>
            </Link>
            <Link href={props.url} passHref>
              <a>
                <div className="pt-1 text-gray-600 dark:text-neutral-400">
                  <p className="text-xs">
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

export default MinimalVideo
