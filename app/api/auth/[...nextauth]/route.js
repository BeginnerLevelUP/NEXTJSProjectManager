import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { establishConnection } from "@/utils/database";
import User from "@/models/user";
import Project from "@/models/project";
import Task from "@/models/task";
const handler = NextAuth({
  providers: [
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

    await session.save(); // Save session changes if necessary
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