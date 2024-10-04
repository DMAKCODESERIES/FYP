'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"


const MeetingTypeList = () => {
  const router=useRouter()
  const [meetingState , setMeetingState]=useState<'isSheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'| undefined>()

  const {user}=useUser();
  const client=useStreamVideoClient();

  const [values, setvalues] = useState({
    dateTime:new Date(),
    description:'',
    link:'',

  })
  const [callDetails, setcallDetails] =useState<Call> ()

  const {toast}=useToast()
  const createMeeting=async()=>{
   if(!user || !client) return

   try {
    if(!values.dateTime){
      toast({ title: "Please Select a Date and Time"}); return;
    }
    const id=crypto.randomUUID();

    const call=client.call('default',id);
    if(!call) throw new Error('failed to create call')
      const startsAt=values.dateTime.toISOString()|| new Date(Date.now()).toISOString();
    const description=values.description||'Instant Meeting'
    await call.getOrCreate({
      data:{
        starts_at:startsAt,
        custom:{
          description
        }
      }
    })
    setcallDetails(call)
    if(!values.description){
      router.push(`/meeting/${call.id}`)
    }
    toast({ title: "Meeting Created",})
   } catch (error) {
    console.log(error);
    toast({ title: "Failed to Create Meeting", })
   }
  }
  return (
<section className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4   gap-5' >
<HomeCard
  img='/icons/add-meeting.svg'
  title="New Meeting"
  description="Start an instant Meeting"
  handleClick={()=>setMeetingState('isInstantMeeting')}
  className='bg-orange-1'
/>
<HomeCard
  img='/icons/schedule.svg'
  title="Shedule Meeting"
  description="Plan Your Meeting Meeting"
  handleClick={()=>setMeetingState('isSheduleMeeting')}
  className='bg-blue-1'
/>
<HomeCard
  img='/icons/recordings.svg'
  title="View Recordings"
  description="Check Your Recordings"
  handleClick={()=>router.push('/recordings')}
  className='bg-purple-1'
/>
<HomeCard
  img='/icons/join-meeting.svg'
  title="Join Meeting"
  description="Via invitation link"
  handleClick={()=>setMeetingState('isJoiningMeeting')}
  className='bg-yellow-500'
/>
<MeetingModal
isOpen={meetingState==='isInstantMeeting'}
 onClose={()=>setMeetingState(undefined)}
 className='text-center'
 title='Start an instan Meeting'
 buttonText='Start Meeting'
 handleClick={createMeeting}
 />
</section>
  )
}

export default MeetingTypeList