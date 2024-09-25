import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const InfoCardsHome = () => {
  return (
    <div className='flex flex-row justify-between gap-10 mx-[10vw]  '>

      <div className='h-[12vh] w-[50rem] ' >
        <div>
            <span className=' flex gap-3'>
                <Avatar>
                    <AvatarImage src="https://img.icons8.com/?size=100&id=112468&format=png&color=7950F2" alt="search" className=''/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-bold text-lg my-1'>
                    Easy Job Search
                </span>
            </span>
        </div>
        <div className='text-[#73737A] font-semibold'>
            Search & find your dream jobs with ease. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque minima itaque illum 
        </div>
      </div>
 
      <div className=' h-[12vh] w-[50rem] ' >
        <div>
            <span className=' flex gap-4'>
                <Avatar>
                    <AvatarImage src="https://img.icons8.com/?size=100&id=53426&format=png&color=7950F2" alt="notimp" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-bold text-lg my-1'>
                    Companies Collaboration
                </span>
            </span>
        </div>
        <span className='text-[#73737A] font-semibold'>
            Search & find your dream jobs with ease. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque minima itaque illum 
        </span>
      </div>

      <div className=' h-[12vh] w-[50rem] ' >
        <div>
            <span className=' flex gap-4'>
                <Avatar>
                    <AvatarImage src="https://img.icons8.com/?size=100&id=o8REW0inhzbM&format=png&color=7950F2" alt="notimp" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-bold text-lg my-1'>
                    Learn Industry Leading Concepts
                </span>
            </span>
        </div>
        <span className='text-[#73737A] font-semibold'>
            We provide you with hand-picked concepts to help you maximise your knowledge and actually get a job. Learn with Us!
        </span>
      </div>

      <div className=' h-[12vh] w-[50rem] '>
        <div>
            <div className=' flex gap-4'>
                <Avatar>
                    <AvatarImage src="https://img.icons8.com/?size=100&id=122812&format=png&color=7950F2" alt="notimp" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-bold text-lg my-1'>
                    Communities
                </span>
            </div>
        </div>
        <div className='text-[#73737A] font-semibold'>
            Connect with like minded people through blogs, share your main interests & experiences. Grow your network!
        </div>
      </div>

    </div>
  )
}

export default InfoCardsHome
