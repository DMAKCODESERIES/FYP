
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'



const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:py-5'>
     <Link href={"/"}
     className='flex item-center gap-1 ' >
     <Image 
     src={"/icons/logo.jpg"}
     width={32}
     height={32}
     alt='logo'
     className='max-sm:size-10'
     />
    <p className='text-[26px] text-white font-extrabold max-sm:hidden'>Vision Connect</p>
     </Link>


     <div className='flex-between gap-5'>
     
     <SignedOut>
          <SignInButton/>
        </SignedOut>
     
        <SignedIn>
          <UserButton />
        </SignedIn>
     <MobileNav/>
     </div>
    </nav>
  )
}

export default Navbar