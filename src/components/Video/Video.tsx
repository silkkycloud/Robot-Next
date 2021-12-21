import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../state'

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
  const snap = useSnapshot(state)

  return (
    <div>
      <div className="space-y-4 cursor-pointer">
        {/* Thumbnail */}
        <Link href={url} passHref>
          <a>
            <div className="aspect-w-3 aspect-h-2">
              <Image
                className="object-cover"
                src={thumbnail}
                loading="lazy"
                alt={title}
                height={118}
                width={210}
                layout="responsive"
              />
            </div>
          </a>
        </Link>

        {/* Details */}
        <div className="flex flex-row relative">
          <Link href={uploaderUrl} passHref>
            <a>
              <div className="block mr-2">
                <Image
                  className="rounded-full"
                  src={uploaderAvatar}
                  loading="lazy"
                  alt={uploaderName}
                  height={36}
                  width={36}
                  layout="fixed"
                />
              </div>
            </a>
          </Link>
          <div className="leading-6 space-y-1 pr-2">
            <Link href={url} passHref>
              <a>
                <h3 className="text-sm font-semibold">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
