// import HeadS from '@/app/settings/_components/HeadS'
// import { Field } from '@/components/ui/field'
// import { Label } from '@/components/ui/label'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Textarea } from '@/components/ui/textarea'
// import Image from 'next/image'
// import React from 'react'

// function page() {
//   return (
//       <div className="container flex flex-col  px-20 my-10 mx-auto  max-w-screen-xl gap-8 sm:px-6 lg:px-8">
// <h1 className='text-3xl font-semibold mb-10'>Rate a broker</h1>
// {/* <div className="window p-8 mt-10  rounded-lg border border-gray-200  ">
//     <h1 className='text-2xl font-bold'>Thank you for using our brokering service!</h1>
//     <p className='mt-4 text-gray-600'>We would greatly appreciate it if you could take a moment to provide us with your feedback and rate your experience with our brokering service. Your input is invaluable in helping us improve our services and better serve you in the future.</p>
//     </div> */}

// <div className="BrokerBox items-center flex gap-4 p-5 border border-gray-200 rounded-lg w-full mt-5 bg-white">
// <Image src={"/brokers.jpg"} alt='broker' width={120} height={120} className='rounded-2xl w-15 h-15 object-cover' />
// <div className="box ">
//     <h1 className='font-semibold'>Sefoo333</h1>
//   <h2>Cairo, egypt</h2>
// </div>
// </div>

// <form action="" className=' mt-5'>
//   <Field>
//     <Label>Rate</Label>
//     <Select >
//       <SelectTrigger className='bg-white'>
//                 <SelectValue placeholder={"Rate"} />
//       </SelectTrigger>
//      <SelectGroup>
//      <SelectContent>
//         <SelectItem value="1">1</SelectItem>
//       <SelectItem value="2">2</SelectItem>
//       <SelectItem value="3">3</SelectItem>
//       <SelectItem value="4">4</SelectItem>
//       <SelectItem value="5">5</SelectItem>
//      </SelectContent>
//      </SelectGroup>
//     </Select>
//   </Field>
//   <Field className='mt-5'>
//     <Label>Review</Label>
//     <Textarea placeholder='Write a review...' className='bg-white h-35' ></Textarea>
//   </Field>
// </form>

//       </div>
//   )
// }

// export default page