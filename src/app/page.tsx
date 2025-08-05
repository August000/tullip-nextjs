import { HydrateClient } from "~/trpc/server";
import Header from "~/components/header";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-items-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <header>
          <Header />
        </header>
      </main>
    </HydrateClient>
  );
}
