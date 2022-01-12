import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import { SpotifySDKContextProvider } from "../contexts/SpotifySDKContext";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <SpotifySDKContextProvider>
          <Component {...pageProps} />
        </SpotifySDKContextProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
