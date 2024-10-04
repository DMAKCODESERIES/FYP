

import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now=new Date();
  const time= now.toLocaleTimeString('en-us',{hour:'2-digit',minute:'2-digit'})
  const date=(new Intl.DateTimeFormat('en-us',{dateStyle:'full'})).format(now)
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-fill rounded-[20px] bg-hero bg-cover'>
    <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
<h2 className='glassmorphism max-w-[300px] rounded text-center py-2 text-base'>Upcoming Meeting at: 12:30pm</h2>
<div className='flex flex-col gap-2'>
  <h1 className='text-4xl font-extrabold lg:text-4xl' >{time}</h1>
 <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
</div>
    </div>
      </div>
      <MeetingTypeList />
    </section>

  )
}

export default Home