'use client'
import SucessMessage from "../components/sucessMessage";
import Nav from "../components/nav";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { Textarea } from "@material-tailwind/react";
export default function  AddProjects() {
  const [noti,setNoti]=useState()
  const {data:session}=useSession()
  const user = session?.user;
  const [projectName,setProjectName]=useState()
  const [projectDescription,setProjectDescription]=useState()
  const renderNoti = () => {
    if (noti) {
      return (
        <div className="fixed bottom-4 left-4">
          <SucessMessage message={noti} onClose={() => setNoti(null)} />
        </div>
      );
    }
  };
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
				`${process.env.NEXTAUTH_URL||'http://localhost:3000'}/api/graphql`,{
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
			);    
      const { data, errors } = await res.json();

    if (errors) {
      setNoti('Error Adding Project')
      console.error('Error Creating Project:', errors);
		}
    if(data){
        setNoti("Project Added")       
      }
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
  useEffect(() => {
    const init = async () => {
      const {  Input,Ripple,initTE, Sidenav, } = await import("tw-elements");
      initTE({ Input,Ripple,Sidenav});
    };
    init();
  }, []);
	return (
<>
<Nav></Nav>
   <form className="my-4 mx-auto py-24 w-1/2 " onSubmit={handleSubmit}>

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3"
          
                        value={projectName}
            onChange={handleProjectNameChange}/>
                <label htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Project Name
                </label>
              </div>


                    <div className="relative mb-6">
                 <Textarea label="Project Description"
                  value={projectDescription}
            onChange={handleProjectDescriptionChange} />
                   </div>


              <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                className="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                Create Project
              </button>
      </form>
          {
        renderNoti()
      }
</>

  

	);
}

