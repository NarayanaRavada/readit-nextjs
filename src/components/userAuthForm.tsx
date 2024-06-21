"use client"

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { Icons } from "./icons";
import { useToast } from "@/hooks/use-toast";

type UserAuthFormProps = React.HtmlHTMLAttributes<HTMLDivElement>

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      // toast notify
      toast({
        title: 'There was a problem',
        description: 'hexa hexa',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={cn('flex justify-center', className)}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size='sm'
        className="w-full"
      >
        <Icons.google className="w-4 h-4 mr-2" />
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
