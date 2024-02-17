
"use client"
import { useState,useEffect } from "react"
import {signIn,signOut,useSession,getProviders} from "next-auth/react"
import { useDispatch,useSelector } from "react-redux"
import { setUser,clearUser} from "@/redux/features/user-slice"
import { addProject} from "@/redux/features/project-slice"
import { addTask } from "@/redux/features/task-slice"
import { addComment,addReply } from "@/redux/features/comment-slice"
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

useEffect(() => {
  if (session) {
    console.log(session)
    const user = session.user;
    const projects = session.projects||[];
    const tasks=session.tasks||[]
    const comments=session.comments||[]
    dispatch(setUser(user))

    projects.forEach(project => {
        dispatch(addProject(project));  
    });
    tasks.forEach(task => {
        dispatch(addTask(task));  
    });
    comments.forEach(comment => {
        dispatch(addComment(comment));  
    });

  }
}, [session]);



  return (

    <div>
      <h1>Sign up </h1>
      {session && session.user ? (
        <button 
        onClick={() =>
           {
            dispatch(clearUser())
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
            onClick={() => 
               signIn(provider.id) 
              }
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
      <li key={comment.id}>
        {comment.text}
        <p><strong>User:</strong> {comment.user ? comment.user : 'Unknown'}</p>
        <ul>
          {comment.replies.map((reply) => (
            <li key={reply.reply_id}>
              <p><strong>Text:</strong> {reply.text}</p>
              <p><strong>User:</strong> {reply.user ? reply.user : 'Unknown'}</p>
            </li>
          ))}
        </ul>
      </li>
  ))}
</ul>

          <h3>Tasks</h3>
<ul>
  {tasks
    .filter((task) => task.project_id === project._id)
    .map((task) => (
      <li key={task.task_id}>
        <div>
          <p><strong>Task ID:</strong> {task.task_id}</p>
          <p><strong>Project ID:</strong> {task.project_id}</p>
          <p><strong>Name:</strong> {task.name}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Assigned To:</strong> {task.assignedTo.length > 0 ? task.assignedTo.join(', ') : 'None'}</p>
          <p><strong>Ranking:</strong> {task.ranking}</p>
        </div>
      </li>
  ))}
</ul>

        </div>
      ))}
    </div>
    </div>
  );
}
