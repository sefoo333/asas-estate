import Image from 'next/image'
import React from 'react'

function CTA() {
  return (
  <section
  className="mt-30 overflow-hidden bg-[url(/Heroo.webp)] bg-cover bg-center bg-no-repeat" 
>
  <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24 flex justify-center">
     <div className="container text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Get Started Now</h2>

      <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore officia corporis quasi
        doloribus iure architecto quae voluptatum beatae excepturi dolores.
      </p>

      <div className="mt-4 sm:mt-8">
        <a
          href="#"
          className="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
        >
          Explore Real Estats
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default CTA