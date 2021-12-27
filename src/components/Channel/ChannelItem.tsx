import React from 'react'

import Image from 'next/image'
import { Link } from 'react-router-dom'
import { HiCheckCircle } from 'react-icons/hi'

import { numberFormat } from '@/functions/format'

export interface ChannelItemProps {
  name: string
  thumbnail: string
  url: string
  description: string
  subscribers: number
  videos: number
  verified: boolean
}

const ChannelItem = (props: ChannelItemProps) => (
  <Link to={props.url}>
    <div className="block space-y-4">
      {/* Channel profile */}
      <div className="flex justify-center">
        <Image
          className="object-cover rounded-full bg-gray-300 dark:bg-neutral-800"
          src={props.thumbnail}
          loading="lazy"
          alt={props.name}
          width={190}
          height={190}
        />
      </div>

      {/* Details */}
      <div className="flex justify-center">
        <div className="leading-6 space-y-1 pr-2">
          <div className="flex flex-row items-center justify-center">
            <h3 className="line-clamp-2 text-black dark:text-white text-xl font-semibold">
              {props.name}
            </h3>
            {props.verified && (
              <HiCheckCircle className="text-gray-600 dark:text-neutral-400 ml-1 h-4 w-4" />
            )}
          </div>
          <div>
            <div className="text-center text-gray-600 dark:text-neutral-400">
              <p className="line-clamp-1 text-sm">{props.description}</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center justify-center text-gray-600 dark:text-neutral-400">
              <p className="text-sm">
                {numberFormat(props.subscribers)} subscribers &#8226;{' '}
                {numberFormat(props.videos)} videos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
)

export default ChannelItem
