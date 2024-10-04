'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
  

const MobileNav = () => {
    const pathname= usePathname();
  return (
   <section className='w-full max-w-[264px]'>
    <Sheet>
  <SheetTrigger asChild>
    <Image
    src={"/icons/hamburger.svg"}
    height={36}
    width={36}
    alt='hamburger'
    className='cursor-pointer sm:hidden'
    />
  </SheetTrigger>
  <SheetContent side={'left'} className='border-none bg-dark-1'>

     <Link href={"/"}
     className='flex item-center gap-1 ' >
     <Image 
     src={"/icons/logo.jpg"}
     width={32}
     height={32}
     alt='logo'
     className='max-sm:size-10'
     />
    <p className='text-[26px] text-white font-extrabold '>Vision Connect</p>
     </Link>
    <div className='flex h-[calc(100vh-65px)] flex-col justify-between overflow-y-hidden '>
        <SheetClose asChild>
            <section className='flex flex-col text-white gap-6 pt-16 h-full'>
            {sidebarLinks.map((link)=>{
      const isActive= pathname===link.route;
      return (
        <SheetClose asChild key={link.route}>
        <Link
           href={link.route}
           key={link.label}
           className={cn('flex gap-4 items-center p-4 rounde-lg w-full max-w-60 mb-4',{'bg-blue-1':isActive})}
        >
         <Image 
         src={link.imagUrl}
         alt={link.label}
         width={18}
         height={18}
         />
         <p className=' font-semibold '>{link.label}</p>
        </Link>
        </SheetClose>
      )
     })}
            </section>
        </SheetClose>
   
    </div>
  </SheetContent>
</Sheet>

   </section>
  )
}

export default MobileNav