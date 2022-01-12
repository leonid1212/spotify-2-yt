import { useContext} from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { useSpotifySDKContext } from "../contexts/SpotifySDKContext";
import Loader from "./Loader";
import Song from "./Song";


export default function Songs() {
  const playList = useRecoilValue(playlistState);
  const { deviceid, loading } = useSpotifySDKContext();
 
  return (
    (!deviceid) ? <Loader/> :
      <div className="px-8 flex-col space-y-1 pb-28 text-white ">
        {
          playList?.tracks.items.map((track, i) => (
            <Song key={track.track.id} deviceid={deviceid} track={track} order={i} />
          ))
        }
      </div>
  )
}
