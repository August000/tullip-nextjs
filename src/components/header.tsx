"use client";

import { authClient } from "~/lib/auth-client";

export default function Header() {
  
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const handleSignInSocial = async (_provider: "google") => {
    await authClient.signIn.social({
      provider: "google", // or any other provider id
    })
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Authentication Example</h2>
      
      {session ? (
        <div className="space-y-2">
          <p>Welcome, {session.user.name}!</p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p>You are not signed in.</p>
          <div className="space-x-2">
            <button
              onClick={() => handleSignInSocial("google")}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded flex items-center justify-center space-x-2"
            >
              <span>Sign In with Google</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}