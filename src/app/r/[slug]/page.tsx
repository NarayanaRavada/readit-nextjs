import MiniCreatePost from "@/components/miniCreatePost"
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    slug: string
  }
}

async function page({ params }: PageProps) {
  const { slug } = params
  const session = await getAuthSession()

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          Subreddit: true,
        }
      }
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS
  })

  if (!subreddit) return notFound()

  return <>
    <h1 className="font-bold text-2xl md:text-3xl h-14">
      r/{subreddit.name}
    </h1>
    <MiniCreatePost session={session} />
  </>

}

export default page
