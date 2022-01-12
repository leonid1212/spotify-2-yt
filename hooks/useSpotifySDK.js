import { useEffect, useState, useCallback } from "react";
import useSpotify from "./useSpotify";



function useSpotifySDK(props) {

  const spotifyApi = useSpotify();
  const [deviceid, setDeviceid] = useState(null);
  const [loading, setLoading] = useState(true);

  const setDeviceIdCallback = useCallback((device_id) => {
    setDeviceid(device_id);
  }, []);

  const setPlayerDeviceCallback = useCallback(()=>{
    if (spotifyApi.getAccessToken()) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(spotifyApi.getAccessToken()); },
        });

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceIdCallback(device_id);

        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
          setDeviceIdCallback(null);
        });

        player.connect();
      }
    };
    
  },[])

  useEffect(() => {
    setPlayerDeviceCallback();
  }, []);


  useEffect(() => {
    deviceid ? setLoading(false) : setLoading(true);
  }, [deviceid])


  return { deviceid, loading };
}

export default useSpotifySDK;

