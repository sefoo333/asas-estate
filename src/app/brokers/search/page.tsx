import React, { Suspense } from 'react'
import { SearchContent } from './components/SearchContent'



// ✅ الصفحة الرئيسية بتلف الكومبوننت بـ Suspense
export default function Page() {
  return (
    <div className="parent flex justify-center bg-background text-foreground dark:bg-background dark:text-foreground min-h-screen">
      <Suspense fallback={<div className='w-full h-full bg-white font-semibold text-center text-lg flex justify-center items-center'>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}