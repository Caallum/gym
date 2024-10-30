'use server';

import MainPage from "@/components/MainPage";
import LoginPage from "@/components/LoginPage"
import { verifySession } from "@/lib/session";
import { getAccounts } from "@/lib/accounts";

export default async function Home() {
  const session = await verifySession();
  let data = session?.session;

  if(data) {
    return <MainPage />
  } else {
    return <LoginPage accounts={await getAccounts()} />
  }
}
