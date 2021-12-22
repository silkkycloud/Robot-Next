import React from 'react'

export type VideoGridProps = {
  children?: React.ReactNode
}

export const VideoGrid = ({children}: VideoGridProps) => (
  <div className="bg-white dark:bg-neutral-900">
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <ul
          role="list"
          className="mx-auto space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 sm:space-y-0 lg:grid-cols-3 lg:gap-x-4 xl:grid-cols-4 2xl:grid-cols-6"
        >
          {children}
        </ul>
      </div>
    </div>
  </div>
)
