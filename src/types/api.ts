/*
Piped API response types.
 */

export type Suggestions = string[]

export type Trending = {
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
}[]

export type Channel = {
  id: string,
  name: string,
  avatarUrl: string,
  bannerUrl: string,
  description: string,
  nextpage: string,
  subscriberCount: number,
  verified: boolean,
  relatedStreams: {
    url: string,
    title: string,
    thumbnail: string,
    uploaderName: string,
    uploaderUrl: string,
    uploaderAvatar: null,
    uploadedDate: string,
    duration: number,
    views: number,
    uploaderVerified: boolean
  }[]
}
