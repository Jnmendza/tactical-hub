"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const GoogleSigninButton: React.FC = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const url = await signInWithGoogle();
      if (typeof url === "string") {
        router.push(url);
      } else {
        console.error("URL is not a string:", url);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <Button type='button' variant='outline' onClick={handleSignIn}>
      <Image
        src='https://authjs.dev/img/providers/google.svg'
        alt='Google-logo'
        width={20}
        height={20}
        className='mr-2'
      />{" "}
      Sign in with Google
    </Button>
  );
};
