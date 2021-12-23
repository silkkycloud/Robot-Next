import React from 'react'

import Image from 'next/image'
import { VideoGrid } from '@/components/ui/Grid/Grid'

import ThumbnailPlaceholder from '../../../public/images/thumbnail.svg'

export const PlaceholderVideo = () => (
  <div>
    <div className="space-y-4">
      {/* Thumbnail */}
      <div className="aspect-w-3 aspect-h-2">
        <Image
          className="object-cover bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
          src={ThumbnailPlaceholder}
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

const PlaceholderVideos = () => (
  <VideoGrid>
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
    <PlaceholderVideo />
  </VideoGrid>
)

export default PlaceholderVideos
