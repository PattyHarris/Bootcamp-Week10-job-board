import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

/*
  Home Component - this funky page fixes an issue with mailtrap.io on Chrome
  where the sign in process adds "home" as part of the sign in url.
*/
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  router.push("/setup");
  return null;
}
