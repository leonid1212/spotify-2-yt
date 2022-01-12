import React, { createContext, useMemo,useEffect, useContext} from 'react';
import useSpotifySDK from "../hooks/useSpotifySDK";
import { useRouter } from 'next/router'
export const SpotifySDKContext = createContext();

export const SpotifySDKContextProvider = ({ children }) => {
  const { deviceid, loading } = useSpotifySDK(); 
  const  router  =  useRouter();
  let provider = false;  

  const check = router.pathname !== "/login" && deviceid;
   if(check){
    provider = {"loading" :  loading , "deviceid" : deviceid };
   }


  return (
    <SpotifySDKContext.Provider value={provider}>
      {children}
    </SpotifySDKContext.Provider> 
  );
};

export const useSpotifySDKContext = () => {
  return useContext(SpotifySDKContext);
}