# Danceable?!

![image](https://user-images.githubusercontent.com/33430669/109641712-521b7d00-7b52-11eb-8d33-a11b4943df2f.png)

Welcome to the Danceable?! webapp. This webapp will score the danceability of your spotify playlist!

## Spotify API

This app makes use of the spotify api through the use of the "(implicit grant flow)[https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow]". To make use of this flow you will need an api key (client id) from spotify. With the spotify api you can get user data once they have given permission to do so. You can also use the api to look for songs, playlists, artists and a lot more. Another cool feature of the api is that you can analyse song data. The spotify API uses oAuth2.0. The flow of using oAuth is best explained through a diagram they have on their website. 

![Spotify api oAuth2.0 flow (image belongs to Spotify and is found on this link: https://developer.spotify.com/documentation/general/guides/authorization-guide/)](https://user-images.githubusercontent.com/33430669/117664552-31028880-b1a2-11eb-8e41-b590200c8250.jpg)


### How it works

First all your playlists and it's data will get fetched from the spotify api.

![image](https://user-images.githubusercontent.com/33430669/109640429-c2c19a00-7b50-11eb-9187-2acb91a2d15a.png)

Then all the songs' audio features data of the playlist gets fetched.

![image](https://user-images.githubusercontent.com/33430669/109640497-da991e00-7b50-11eb-8f97-f883c83e5a07.png)

Afterwards the score will be generated based on the data fetched from the songs' audio-features data.

## Features

### Progressive web-app (You can install this web-application on your phone)

![image](https://user-images.githubusercontent.com/33430669/117666708-6f994280-b1a4-11eb-9c4f-7ccd41a56d29.png)
 
### Display playlists of your spotify profile

![image](https://user-images.githubusercontent.com/33430669/117667061-ca329e80-b1a4-11eb-94fb-08090dcd2ab0.png)


### Measure a danceability score from your favorite playlist

![image](https://user-images.githubusercontent.com/33430669/117667093-d7e82400-b1a4-11eb-8f0a-26a0e28cc7c9.png)

### You can save a playlist and it's score offline

![image](https://user-images.githubusercontent.com/33430669/117667141-e46c7c80-b1a4-11eb-9b52-c4b77f91db65.png)

For saving a playlist offline I used the CacheStorage API together with a serviceworker. Because my data is user data and can be updated quite frequently by the users themselves, I've chosen to make my app **Network first** and fallback to cache. This way the data when there is an internet connection will be up to date, and if not, the data will remain the same as the last time you tried to save it. 

## Optimizations

To view the score of my website I lighthouse in Google developer tools. At first I saw that my site didn't score well on performance so I added [GulpJS](https://gulpjs.com/) to minify my JavaScript and CSS which decreases the size of my client-side javascript files. A teacher of mine also recommended you add the npm package : [compression](https://www.npmjs.com/package/compression) to the express server. After adding this My website scored high on performance. I also decided to tackle the accessibility issues found by lighthouse. The styleguide of Spotify apparently has accessibility issues where the contrast between the button text color and the button is not high enough. So I picked a darker shade of green for my buttons. 

![image](https://user-images.githubusercontent.com/33430669/117670620-5eeacb80-b1a8-11eb-937c-ae9602048be8.png)

## Resources

- [Caching files offline with service worker and Cache API](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#serving_files_from_the_cache)
- [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
