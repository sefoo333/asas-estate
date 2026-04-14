import React from 'react'
import { MdClear } from 'react-icons/md'

function FeaturedBanner({setCancel}:any) {
  return (
      <section className="relative w-full h-full overflow-hidden  rounded-2xl bg-gradient-to-r ">
    <MdClear size={24} onClick={() => setCancel(false)} className='absolute right-5 cursor-pointer z-99 top-5 text-gray-600' /> 
      {/* Background glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
{/* <h1>test</h1> */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-8 md:p-12">

        {/* Text Section */}
        <div className="">
          {/* <p className="text-sm text-zinc-300 mb-2">🔥 Limited Offer</p> */}
          <h1 className="text-2xl xl:text-4xl  font-bold leading-tight">
            Start now and explore <br /> properties
          </h1>

          <p className="mt-4 max-xl:text-sm text-zinc-500">
          Explore properties and take the first step toward your new home today
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium max-xl:text-sm hover:scale-105 transition">
              Get Started
            </button>

            <button className="px-6 py-3 rounded-xl border border-white/20  max-xl:text-sm hover:bg-white/10 transition">
              Learn More
            </button>
          </div>

        </div>

        {/* Image / Illustration */}
        <div className="w-full  md:w-[260px]">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            className="rounded-xl "
            alt="dashboard preview"
          />
        </div>
      </div>
    </section>  )
}

export default FeaturedBanner