'use client';
import { tokenProvider } from '@/actions/stream.action';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import { StreamVideo,StreamVideoClient,} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

  

  
  const StreamVedioProvider = ({children}:{children: ReactNode}) => {
    const [vedioClient, setvedioClient] = useState<StreamVideoClient>()
    const {user , isLoaded}=useUser();
    useEffect(() => {
     if(!isLoaded||!user)return;
    if(!apiKey) throw new Error('Stream API key missing')
      
        const client=new StreamVideoClient({
            apiKey,
            user:{
                id:user?.id,
                name:user?.username||user?.id,
                image: user?.imageUrl,
            },
            tokenProvider,
        })
        setvedioClient(client)
    }, [user,isLoaded])
    if(!vedioClient) return  <Loader/>
    return (

      <StreamVideo client={vedioClient}>
        {children}
      </StreamVideo>
    );
  };
  export default StreamVedioProvider;