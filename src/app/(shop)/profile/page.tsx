import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import UpdateUser from "./ui/updateUser";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className=' flex flex-col justify-center items-center w-full p-4 h-5/6'>
      <Title title='Perfil' />
      <UpdateUser session={session} />
    </div>
  );
}
