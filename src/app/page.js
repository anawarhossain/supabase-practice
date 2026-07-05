import SignupCard from "@/components/SignupCard";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("todos").select("title");
  console.log(data);
  return (
    <SignupCard/>
  );
}
