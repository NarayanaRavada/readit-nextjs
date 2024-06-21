import Link from "next/link";
import { Icons } from "./icons";
import UserAuthForm from "./userAuthForm";

function SignIn() {
  return (
    <div className="container mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-7 w-7" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-xs max-w-xs mx-auto">
          Distance separate lands, not souls
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to Readit?{' '}
          <Link href='/sign-up' className="hover:text-zinc-800 text-sm underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn;
