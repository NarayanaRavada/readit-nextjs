import { z } from 'zod'

export const SubRedditValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubRedditSubscriptionValidator = z.object({
  subredditId: z.string()
})

export type CreateSubreditPayload = z.infer<typeof SubRedditValidator>
export type CreateSubreditSubscriptionPayload = z.infer<typeof SubRedditSubscriptionValidator>
