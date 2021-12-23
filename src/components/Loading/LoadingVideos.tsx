import React from 'react'

import Image from 'next/image'
import { VideoGrid } from '@/lib/Grid/Grid'

export const LoadingVideo = () => (
  <div>
    <div className="space-y-4">
      {/* Thumbnail */}
      <div className="aspect-w-3 aspect-h-2">
        <Image
          className="object-cover bg-gray-300 dark:bg-neutral-800"
          src="/placeholders/thumbnail.svg"
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
            className="rounded-full bg-gray-200 dark:bg-neutral-800"
            style={{
              width: '36px',
              height: '36px',
            }}
          />
        </div>
        <div className="leading-6 space-y-1 pr-2">
          <div className="w-40 h-6 rounded-sm bg-gray-200 dark:bg-neutral-800" />
          <div className="w-28 h-6 rounded-sm bg-gray-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  </div>
)

const LoadingVideos = () => (
  <VideoGrid>
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
  </VideoGrid>
)

export default LoadingVideos
