"use client"

import { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import UserAvatar from './userAvatar'
import { Input } from './ui/input'
import { Button } from './ui/Button'
import { ImageIcon, Link2 } from 'lucide-react'

interface MiniCreatePostProps {
  session: Session | null
}

function MiniCreatePost({ session }: MiniCreatePostProps) {
  const router = useRouter()
  const pathname = usePathname()

  return <li className='overflow-hidden rounded-md bg-white shadow'>
    <div className='h-full px-6 py-4 flex justify-between gap-6'>
      <div className='relative'>
        <UserAvatar
          user={{
            name: session?.user.name || null,
            image: session?.user.image || null,
          }}
        />

        <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-whitel' />
      </div>

      <Input
        onClick={() => router.push(pathname + '/submit')}
        readOnly
        placeholder='Create post'
      />

      <Button
        onClick={() => router.push(pathname + '/submit')}
        variant='ghost'
      >
        <ImageIcon className='text-zinc-600' />
      </Button>

      <Button
        onClick={() => router.push(pathname + '/submit')}
        variant='ghost'
      >
        <Link2 className='text-zinc-600' />
      </Button>

    </div>
  </li>
}

export default MiniCreatePost

