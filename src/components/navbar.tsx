import Link from "next/link";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./userAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 bg-zinc-100 border-b border-zinc-100 z-[10] py-2">
      <div className="container h-full max-w-7xl mx-auto flex items-center justify-between gap-2">
        <Link href='/' className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">Readit</p>
        </Link>

        {
          session?.user ? (

            <UserAccountNav user={session.user} />
          ) : (

            <Link href='/sign-in' className={buttonVariants()}>Sign In</Link>
          )
        }


      </div>
    </div>
  );
}

export default Navbar;
