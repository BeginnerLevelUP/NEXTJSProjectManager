//https://karthickragavendran.medium.com/setup-guide-for-nextauth-with-google-and-credentials-providers-in-next-js-13-8f5f13414c1e
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { establishConnection } from "@/utils/database";
import User from "@/models/user";
const handler = NextAuth({
  providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmithvvc" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
    LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET
  })
  ],
  callbacks:{
session: async ({ session }) => {
  try {
    await establishConnection()
    const currentUser = await User.findOne({ email: session.user.email })
      .populate({
        path: 'projects',
        populate: {
          path: 'tasks',
          populate: {
            path: 'assignedTo' 
          }
        }
      });
    
    if (currentUser) {
      session.user.id = currentUser._id.toString();
      const updatedProjects = [];
      currentUser.projects.forEach((project) => {
        const { tasks, comments, ...projectWithoutTasksAndComments } = project.toObject();
        session.tasks = tasks; // Assigning tasks to session.tasks
        session.comments = comments; // Assigning comments to session.comments
        updatedProjects.push(projectWithoutTasksAndComments); // Adding project without tasks and comments to updatedProjects array
      });
      session.projects = updatedProjects; // Assigning updatedProjects array back to session.projects
    }

 
  } catch (error) {
    console.error("Error fetching user projects:", error);
  }
  return session;
}

,
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
        })
       }
    }catch(e){
        console.log('Error Signing in user with oAuth',e)
    }
    return true; 
  }
  }

});

export { handler as GET, handler as POST };