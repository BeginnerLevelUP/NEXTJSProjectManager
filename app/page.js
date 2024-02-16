
"use client"
import { useState,useEffect } from "react"
import {signIn,signOut,useSession,getProviders} from "next-auth/react"
import { useDispatch,useSelector } from "react-redux"
import { fetchUser} from "./redux/features/user-slice"
export default function Home() {

const dispatch=useDispatch()
 const projects = useSelector(({projects}) => projects.projects);
  const comments= useSelector(({projects}) => projects.comments)
  const tasks= useSelector(({projects}) => projects.tasks)
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


    if (session) {
      const user=dispatch(fetchUser(session?.user?.id));
    }



  return (

    <div>
      <h1>Sign up </h1>
      {session && session.user ? (
        <button 
        onClick={() =>
           {
            signOut()
          }}
        >
          Sign out
          </button>
      ) : (
        providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.id}
            onClick={() =>  signIn(provider.id) }
          >
            Sign up with {provider.name}
          </button>
        ))
      )}

       <div>
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Completed:</strong> {project.completed ? 'Yes' : 'No'}</p>
          <p><strong>Git Repository:</strong> {project.gitrepo}</p>
          <p><strong>Deployed Site:</strong> {project.deployedSite}</p>
          <h3>Comments</h3>
          <ul>
            {comments
              .filter((comment) => comment.project_id === project._id)
              .map((comment) => (
                <>
                <li key={comment.id}>
                  {comment.text}
                  <p><strong>User:</strong> {comment.user ? comment.user : 'Unknown'}</p>
                  </li>

                  <ul>
            {comment.replies.map((reply) => (
              <li key={reply.reply_id}>
                <p><strong>Text:</strong> {reply.text}</p>
                <p><strong>User:</strong> {reply.user ? reply.user : 'Unknown'}</p>
              </li>
            ))}
          </ul>

                </>
                
              ))}
          </ul>
          <h3>Tasks</h3>
          <ul>
            {tasks
              .filter((task) => task.project_id === project._id)
              .map((task) => (
        <div key={task.task_id}>
          <p><strong>Task ID:</strong> {task.task_id}</p>
          <p><strong>Project ID:</strong> {task.project_id}</p>
          {/* <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p> */}
          <p><strong>Name:</strong> {task.name}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
          {/* <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'Not specified'}</p> */}
          <p><strong>Assigned To:</strong> {task.assignedTo.length > 0 ? task.assignedTo.join(', ') : 'None'}</p>
          <p><strong>Ranking:</strong> {task.ranking}</p>
        </div>
              ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
}
