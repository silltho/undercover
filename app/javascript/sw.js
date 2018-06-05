/* eslint-disable no-undef,no-underscore-dangle */
workbox.skipWaiting()
workbox.clientsClaim()

const preCache = [
  '/',
  '/app',
  ...self.__precacheManifest
]

workbox.precaching.precacheAndRoute(preCache)
