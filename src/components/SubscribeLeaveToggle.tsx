"use client"

import { useMutation } from "@tanstack/react-query"
import { Button } from "./ui/Button"
import { CreateSubreditSubscriptionPayload } from "@/lib/validators/subreddit"
import axios, { AxiosError } from "axios"
import { useCustomToasts } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"
import { startTransition } from "react"
import { useRouter } from "next/navigation"

interface SubscribeLeaveToggleProps {
  subredditId: string
  subredditName: string
  isSubscribed: boolean
}

function SubscribeLeaveToggle({ subredditId, subredditName, isSubscribed }: SubscribeLeaveToggleProps) {
  const { loginToast } = useCustomToasts()
  const router = useRouter()

  const { mutate: subscribe, isPending: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubreditSubscriptionPayload = {
        subredditId,
      }

      const { data } = await axios.post('/api/subreddit/subscribe', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'There was problem',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      toast({
        title: 'Subscribed',
        description: `You are subscribed to r/${subredditName}`
      })
    }
  })

  const { mutate: unsubscribe, isPending: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubreditSubscriptionPayload = {
        subredditId,
      }

      const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'There was problem',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      toast({
        title: 'Unsubscribed',
        description: `You are unsubscribed from r/${subredditName}`
      })
    }
  })

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}>
      Leave Community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubLoading}
      onClick={() => subscribe()}>
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle
