import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../state'

import Image from 'next/image'

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
    <div className="space-y-4">
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
      <div className="space-y-2">
        <div className="text-sm font-medium leading-5 space-y-1">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default Video
