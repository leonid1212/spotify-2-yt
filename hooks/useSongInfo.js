import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { refreshTokenErr } from "../lib/spotify";
import SpotifyWebApi from 'spotify-web-api-node';
import useSpotify from "./useSpotify";
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from "../atoms/songAtom";

function useSongInfo(props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);
  

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          }
        }
        ).then(res => res.json());

        setSongInfo(trackInfo);
      }
    }
    fetchSongInfo();

  }, [currentTrackId, spotifyApi]);

  return songInfo;
}
export default useSongInfo;

