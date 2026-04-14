import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/store';
import { signOut } from 'next-auth/react';

function DeleteButton() {
      const user = useUserStore((state) => state.user);
      const logout = useUserStore((state) => state.logout);
    
        const Delete = async () => {
    
    const test = await fetch(`/api/users/${user?.id}` , {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
    })  
    
    return test.json()
  }

    const logOut = async () => {
      if (user?.provider === "google"){
        await signOut()
      };
      logout()
    }
  return (
     <AlertDialog>
  <AlertDialogTrigger asChild>
 <Button variant={"secondary"} className='mt-8 cursor-pointer' size={"lg"}>
Delete Your Account
            </Button>
              </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => {
        Delete();
        logOut();
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteButton