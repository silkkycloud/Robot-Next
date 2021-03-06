import React from 'react'

import { timeFormat, numberFormat } from '@/functions/format'

import Image from 'next/image'
import { Link } from 'react-router-dom'
import { VideoGrid } from '@/components/ui/Grid/Grid'
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

export interface LoadingVideoGridProps {
  className?: string
}

export const LoadingVideoGrid = (props: LoadingVideoGridProps) => (
  <VideoGrid className={props.className}>
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
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
    <LoadingVideo />
  </VideoGrid>
)

export const LoadingVideo = (): JSX.Element => (
  <div>
    <div className="space-y-4">
      {/* Thumbnail */}
      <div className="aspect-w-3 aspect-h-2">
        <Image
          className="object-cover animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
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
            className="rounded-full animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700"
            style={{
              width: '36px',
              height: '36px',
            }}
          />
        </div>
        <div className="leading-6 space-y-1 pr-2">
          <div className="w-40 h-6 rounded-sm animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
          <div className="w-28 h-6 rounded-sm animate-pulse bg-gradient-to-r from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-700" />
        </div>
      </div>
    </div>
  </div>
)

const Video = (props: VideoProps): JSX.Element => (
  <div className="block">
    <div className="space-y-4 cursor-pointer">
      {/* Thumbnail */}
      <Link to={props.url}>
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
      </Link>

      {/* Details */}
      <div className="flex flex-row relative">
        <Link to={props.uploaderUrl}>
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
        </Link>
        <div className="leading-6 space-y-1 pr-2">
          <Link to={props.url}>
            <h3 className="line-clamp-2 text-black dark:text-white text-sm font-semibold">
              {props.title}
            </h3>
          </Link>
          <div>
            <Link to={props.uploaderUrl}>
              <div className="flex flex-row items-center text-gray-600 dark:text-neutral-400">
                <p className="text-xs 2xl:text-sm hover:text-gray-900 dark:hover:text-white">
                  {props.uploaderName}
                </p>
                {props.uploaderVerified && (
                  <HiCheckCircle className="ml-1 h-3 w-3 2xl:h-4 2xl:w-4" />
                )}
              </div>
            </Link>
            <Link to={props.url}>
              <div className="flex flex-row items-center text-gray-600 dark:text-neutral-400">
                <p className="text-xs 2xl:text-sm">
                  {numberFormat(props.views)} views &#8226; {props.uploadedDate}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Video
