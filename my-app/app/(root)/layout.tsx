
import StreamVedioProvider from '@/providers/StreamClientProvider'
import React, { Children, ReactNode } from 'react'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVedioProvider>
      {children}
      </StreamVedioProvider>
     
     
    </main>
  )
}

export default RootLayout