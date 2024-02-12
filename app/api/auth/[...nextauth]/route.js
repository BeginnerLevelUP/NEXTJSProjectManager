import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { establishConnection } from "@/utils/database";
import User from "@/models/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: async ({ session }) => {
    const currentUser=await User.findOne({email:session.user.email})
    session.user.id=currentUser._id
    return session
  },
  signIn: async ({ profile }) => {
    try{
        //checking connection
       await  establishConnection()
       //see if user exsists
       const currentUser=await User.findOne({email:profile.email})
       if(!currentUser){
        await User.create({
            username:profile.username,
            email:profile.email.replace(" ","").toLowerCase(),
            image:profile.picture
            // password:profile.password
        })
       }

    }catch(e){
        console.log('Error Signing in user with google',e)
    }
    return true; 
  }
});

export { handler as GET, handler as POST };