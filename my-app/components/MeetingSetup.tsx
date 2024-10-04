'use client'
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
   
  const [isMicCamToggleOn , setIsMicCamToggleOn]=useState(false)   
  const call=useCall();
  if(!call){throw new Error('usecall must be used within stream call component')}
  useEffect(() => {
   if(isMicCamToggleOn){
    call?.camera.disable()
    call?.microphone.disable()
   }else{
    call?.camera.enable()
    call?.microphone.enable()
   }
  }, [isMicCamToggleOn,call?.camera,call?.microphone])
  return(
  <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
    <h1 className='text-3xl font-bold'>SetUp</h1>
    <VideoPreview/>
    <div className='flex gap-3 h-16 justify-center items-center font-medium '>
      <label className='flex gap-2 justify-center items-center'>
         <input
           type='checkbox'         
           checked={isMicCamToggleOn}
           onChange={(e)=>setIsMicCamToggleOn(e.target.checked)}
         />
         Join with mic and camera off
      </label>
      <DeviceSettings/>
    </div>
    <Button className='flex bg-green-500 rounded-md px-4 py-2.5' onClick={()=>{call.join()
      setIsSetupComplete(true);
    }}>
    Join Meeting

    </Button>
  </div>
  )
}

export default MeetingSetup