import { proxy, subscribe } from "valtio"

const getInitialState = () => {
  try {
    const state = JSON.parse(<string>localStorage.getItem("pipedState"))
    if (state) return state
  } catch (e) {}

  return {
    version: "0.1.0",
    apiUrl: "https://api.piped.silkky.cloud",
    authenticated: false,
    theme: "light",
    settings: {
      sponsorBlock: true,
      skipSponsor: true,
      skipIntro: false,
      skipOutro: false,
      skipPreview: false,
      skipInteraction: true,
      skipSelfPromo: true,
      skipMusicOffTopic: true,
      autoPlayVideo: true,
      listen: false,
      resolutions: [144, 240, 360, 480, 720, 1080, 1440, 2160, 4320],
      defaultQuality: 0,
      bufferingGoal: 10,
      showComments: true,
      minimizeDescription: false,
      watchHistory: false,
      enabledCodecs: ["av1", "vp9", "avc"],
      disableLBRY: false,
      proxyLBRY: false,
    },
  }
}

export const state = proxy(getInitialState())

subscribe(state, () => {
  localStorage.setItem("pipedState", JSON.stringify(state))
})

export default state
