import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
  "from-inidigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];


function Center() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const [loginMenu, setLoginMenu] = useState(false);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);


  const toggleLoginMenu = () => {
    setLoginMenu(!loginMenu);
  }

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId])


  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log("Something went wrong!!", err));
    }

  }, [spotifyApi, playlistId])


  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div onClick={toggleLoginMenu} className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full
         p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        {
          loginMenu &&
          <ul className="flex flex-wrap items-center  bg-black text-white  opacity-90 hover:opacity-80 cursor-pointer p-2 pr-2 m-1 rounded-lg">
            <li className="basis-full items-center text-center hover:text-white rounded">
              <button  onClick={() => signOut()}>
                <p>Log out</p>
              </button >
            </li>
            <hr className='border-t-[0.1px] border-white ' /> 
          </ul>
        }
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b
        to-black ${color} h-80  text-white p-8`}>
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>

    </div>
  );
}

export default Center
