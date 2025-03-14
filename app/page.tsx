import FormationDesigner from "@/components/FormationDesigner";
import { GoogleSigninButton } from "@/components/GoogleSigninButton";
import { SignOutButton } from "@/components/SignOutButton";

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-green-600 to-green-900 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-white text-center mb-8'>
          Football Formation Designer
        </h1>
        <GoogleSigninButton />
        <SignOutButton />
        <FormationDesigner />
      </div>
    </main>
  );
}
