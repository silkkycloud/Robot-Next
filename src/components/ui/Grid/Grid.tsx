import React from 'react'

export interface VideoGridProps {
  className?: string
  children?: React.ReactNode
}

export const VideoGrid = (props: VideoGridProps): JSX.Element => (
  <div className={props.className}>
    <div className="bg-white dark:bg-neutral-900">
      <div className="space-y-12">
        <ul
          role="list"
          className="mx-auto space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 sm:space-y-0 md:grid-cols-3 md:gap-x-3 xl:grid-cols-4 2xl:grid-cols-6"
        >
          {props.children}
        </ul>
      </div>
    </div>
  </div>
)
