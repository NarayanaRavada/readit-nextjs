import { User } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Icons } from "./icons";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
  className?: string
  user: Pick<User, 'name' | 'image'>
}

function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      )
        : <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user />
        </AvatarFallback>}
    </Avatar>
  )
}

export default UserAvatar;
