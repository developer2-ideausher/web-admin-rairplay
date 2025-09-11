"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
  const router=useRouter()
  return (
    <button onClick={()=>router.push("/dashBoard")} className='flex justify-center items-center w-full h-screen bg-black text-white'>Go to dashboard</button>
  )
}

export default Page