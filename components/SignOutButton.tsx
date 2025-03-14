import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/actions";
import Image from "next/image";

export const SignOutButton: React.FC = () => {
  return (
    <Button type='button' variant='outline' onClick={signOut}>
      Sign out
    </Button>
  );
};
