import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";
import { getSession, useSession } from "next-auth/react";
import { useSpotifySDKContext } from "../contexts/SpotifySDKContext";
import Loader from "../components/Loader";
export default function Home() {


  const { deviceid } = useSpotifySDKContext();

  return (
    
    (!deviceid) ? <Loader /> :
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}