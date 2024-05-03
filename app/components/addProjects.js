'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function  AddProjects() {
   const {data:session}=useSession()
   const user = session.user;
   console.log(user)
  const [projectName,setProjectName]=useState('')
  const [projectDescription,setProjectDescription]=useState('')

  const createProject=async(userId,name,description)=>{
    const createProjectMutation=`mutation CreateProject($name: String!, $description: String!, $userId: ID!) {
  createProject(name: $name, description: $description, userId: $userId) {
    _id
    dateCreated
    dateUpdated
    name
    description
    completed
    gitRepoUrl
    deployedSite
  }
}`
    try {
			const res = await fetch(
				`http://localhost:3000/api/graphql`,{
          method:"POST",
            headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    query:createProjectMutation,
     variables:{
      userId,
      name,
      description,
    }
  })
        }
			);    const { data, errors } = await res.json();

    if (errors) {
      console.error('Error Creating Project:', errors);
		} 
    console.log(data)
  }catch (err) {
		console.log(err instanceof Error ? err.message : 'unknow error')
		}
	};
  

  const handleProjectNameChange=(e)=>{
    setProjectName(e.target.value)
  }

  const handleProjectDescriptionChange=(e)=>{
    setProjectDescription(e.target.value)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
   await createProject(user.email,projectName,projectDescription)
    setProjectName('');
    setProjectDescription('');
  }

	return (
<>
   <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={handleProjectNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription">Project Description:</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Project</button>
      </form>
</>
	);
}

