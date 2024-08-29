import { Smile } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='absolute bottom-0 z-10 flex w-full justify-center'>
        Made by <Link className='flex gap-4 pb-3 pl-3 underline underline-offset-4' href={"https://www.szymongrzesiak.dev/"}>Szymon Grzesiak <Smile/></Link>
    </div>
  )
}

export default Footer