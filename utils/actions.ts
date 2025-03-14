"use server";
import { createClientForServer } from "@/utils/supabase/server";
import { Player } from "@prisma/client";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const signInWithGoogle = async (): Promise<string> => {
  const supabase = await createClientForServer();
  const auth_callback_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  if (error) {
    throw error;
  }

  // Return the URL instead of redirecting
  return data.url;
};

const signOut = async () => {
  const supabase = await createClientForServer();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export { signInWithGoogle, signOut };

export const saveFormationToDb = async (
  players: Player[],
  formationName: string
) => {
  const supabase = await createClientForServer();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  // Add formationId to players if required
  const playersWithFormationId = players.map((player) => ({
    ...player,
    formationId: 1, // Replace with the actual formation ID if needed
  }));

  const { data, error } = await supabase.from("formations").insert([
    {
      user_id: user.id,
      formation: playersWithFormationId,
      name: formationName,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
};
