"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Crubchumb from '../_components/crubchumb'
import HeadS from '../_components/HeadS'
import UserName from './_components/UserName'
import SecurityAccount from './_components/SecurityAccount'
import ChangeImage from './_components/ChangeImage'
import { Save } from 'lucide-react'
import { FaSave } from 'react-icons/fa'
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/store/store'
import DeleteButton from './_components/DeleteButton'
import { toast } from 'sonner'


function Account() {
  const user = useUserStore((state) => state.user);
  const ChangeAccount = async (data:any) => {
    
    const test = await fetch(`/api/users/${user?.id}` , {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })

    
  
    
    return test.json()
  }

 
    

  
  const [data,setData] = useState({})

      const [select,setSelect] = useState({});


  const changeAccount = useMutation({
    mutationFn:  ChangeAccount,
    onSuccess:(e) => toast.success("Account has been updated !"),
    onError:(e) => toast.error("Failed to update account !")
  })



  return (

    

     <div className="page  px-7 max-md:px-5 py-7 basis-[100%]">
          <Crubchumb />
            <HeadS title="Account Settings" />
            <div className="window p-8 mt-10 rounded-lg border border-gray-200    dark:!border-gray-600  w-full  max-md:w-full">
             
              <ChangeImage setData={setData} data={data} broker={false} />
              <UserName setData={setData} data={user}  />
              <SecurityAccount setData={setData} select={select} setSelect={setSelect} />

           <div className="delete flex justify-between items-center mt-10 max-md:flex-col max-md:items-start">
          <div className="text">
              <h1 className='text-red-700 text-lg font-semibold'>
              Delete Account
            </h1>
            <h2 className='text-[13px] text-gray-600 font-medium'>Danger ! , after you click the button , the data will be deleted</h2>
          </div>
         <DeleteButton />
           </div>
        <div className="save flex justify-end mt-6">
           <Button onClick={() => changeAccount.mutate({...data,...select})} className='w-30 h-11' size={"lg"}>
            <FaSave />
        Save 
                          </Button>
        </div>
            </div>
        </div>
  )
}

export default Account