
"use client"
import ReduxProvider from "./components/redux-provider"
import { useState,useEffect } from "react"
import {signIn,signOut,useSession,getProviders} from "next-auth/react"
export default function Home() {
  const {data:session}=useSession()
  const [providers,setProviders]=useState(null)
  useEffect(
    ()=>{
      const callProviders=async()=>{
        const response =await getProviders()
        setProviders(response)
      }
      callProviders()
    },[]
  )

  return (
    <ReduxProvider>
    <div>
      <h1>Sign up please work or fuck me</h1>
      {session && session.user ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.id}
            onClick={() => signIn(provider.id)}
          >
            Sign up with {provider.name}
          </button>
        ))
      )}
    </div>
     </ReduxProvider>

  );
}
