import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { establishConnection } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    // Uncomment and configure CredentialsProvider if needed
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const user = { username: credentials?.username, password: credentials?.password };
    //     if (user) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   }
    // }),
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
  callbacks: {
    async session({ session }) {
      try {
        await establishConnection();
        const currentUser = await User.findOne({ email: session.user.email }).populate({
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
            session.tasks = tasks;
            session.comments = comments;
            updatedProjects.push(projectWithoutTasksAndComments);
          });
          session.projects = updatedProjects;
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await establishConnection();
        const currentUser = await User.findOne({ email: profile.email });
        if (!currentUser) {
          await User.create({
            username: profile.username,
            email: profile.email.replace(" ", "").toLowerCase(),
          });
        }
      } catch (error) {
        console.log('Error Signing in user with oAuth', error);
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST };
