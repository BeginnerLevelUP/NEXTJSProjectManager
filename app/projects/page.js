"use client"
import Nav from "../components/nav";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from 'next/navigation'
import DotLoader from "react-spinners/DotLoader";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { Fragment } from "react";
import { Combobox, Transition,Dialog,Listbox} from "@headlessui/react";
import { Textarea } from "@material-tailwind/react";
const page = () => {

  const router = useRouter()
  const { data: session } = useSession();
  const user = session?.user;
  const [userData, setUserData] = useState();
  let [isOpen, setIsOpen] = useState(false)
  const [projectName,setProjectName]=useState('')
  const [projectDescription,setProjectDescription]=useState('')
  const [currentProjectId,setProjectId]=useState()
  
    function closeModal() {
    setIsOpen(!isOpen)

  }
  function openModal(projectId) {
    setIsOpen(!isOpen)
    setProjectId(projectId)
  }

  const fetchUserProjects = async () => {
    const userQuery = `query User($userId: ID!) {
      user(id: $userId) {
        _id
        username
        email
        password
        projects {
          _id
          dateCreated
          dateUpdated
          name
          description
          completed
          gitRepoUrl
          deployedSite
          comments {
            _id
            text
            user {
              _id
              username
              email
              password
            }
            createdAt
            replies {
              _id
              text
              createdAt
            }
          }
          tasks {
            _id
            name
            description
            status
            dueDate
            assignedTo {
              _id
              username
              email
              password
            }
            ranking
            createdAt
          }
          members {
            _id
            username
            email
            password
          }
        }
      }
    }`;

    try {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          variables: {
            userId: user?.email,
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("Error Fetching User Projects:", errors);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error Fetching User Projects:", error.message);
      return null;
    }
  };

  const delteUserProject=async(deleteProjectId)=>{
    const deleteQuery=`mutation DeleteProject($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId) {
    _id
    dateCreated
    dateUpdated
    name
    description
    completed
    gitRepoUrl
    deployedSite
    comments {
      _id
      text
      user {
        _id
        username
        email
        password
      }
      createdAt
      replies {
        _id
        text
        createdAt
      }
    }
    tasks {
      _id
      name
      description
      status
      dueDate
      assignedTo {
        _id
        username
        email
        password
      }
      ranking
      createdAt
    }
    members {
      _id
      username
      email
      password
      associates {
        _id
        username
        email
        password
      }
      projects {
        _id
        dateCreated
        dateUpdated
        name
        description
        completed
        gitRepoUrl
        deployedSite
      }
    }
  }
}`
    try{
const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: deleteQuery,
          variables: {
           deleteProjectId
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("Error Fetching User Projects:", errors);
        return null;
      }
    }catch{
      console.log('Eror Deleteing Project',e instanceof Error ? e.message : "unknown Error")
    }
  }
  const editUserProject=async(updateProjectId,name,description)=>{
  const  editMutation=`mutation UpdateProject($updateProjectId: ID!, $name: String, $description: String) {
  updateProject(id: $updateProjectId, name: $name, description: $description) {
    _id
    dateCreated
    dateUpdated
    name
    description
    completed
    gitRepoUrl
    deployedSite
    comments {
      _id
      text
      user {
        _id
        username
        email
        password
      }
      createdAt
      replies {
        _id
        text
        createdAt
      }
    }
    tasks {
      _id
      name
      description
      status
      dueDate
      assignedTo {
        _id
        username
        email
        password
      }
      ranking
      createdAt
    }
    members {
      _id
      username
      email
      password
      associates {
        _id
        username
        email
        password
      }
      projects {
        _id
        dateCreated
        dateUpdated
        name
        description
        completed
        gitRepoUrl
        deployedSite
      }
    }
  }
}`
       try {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: editMutation,
          variables: {
            updateProjectId,
            name,
            description,
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("Error Editing Projects:", errors);
        return null;
      }

    } catch (error) {
      console.error("Error Editing Projects:", error.message);
      return null;
    }
  }

    const handleProjectNameChange=(e)=>{
    setProjectName(e.target.value)
  }

  const handleProjectDescriptionChange=(e)=>{
    setProjectDescription(e.target.value)
  }
    const handleSubmit=async(e)=>{
    e.preventDefault()
   await editUserProject(currentProjectId,projectName,projectDescription)
    setProjectName('');
    setProjectDescription('');
     setProjectId('')
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserProjects();
      if (data) {
        setUserData(data);
      }
    };

    fetchData();
  }, [user?.email]);


  return (
    <>
    <Nav></Nav>
     <div className="text-center">
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Edit Project
            </Dialog.Title>
               <form className=" " onSubmit={handleSubmit}>

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
                Edit
              </button>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
               </form>

          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
  </div>  
  <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Component */}
        <div className="flex flex-col items-stretch">
          {/* Title */}
          <h2 className="mb-5 text-center text-3xl font-bold md:text-5xl">Manage Your Projects </h2>
          {/* Content */}
          <div className="gap-x-8 [column-count:1] md:grid-cols-2 md:gap-x-4 md:[column-count:1] ">
            {/* Render projects if userData exists, otherwise render loading or message */}
            {userData ? (
              userData.user.projects.map((project) => (

                <>
      
        {/* <!--  Item --> */}
        <div className="mb-12 border border-solid border-[#cdcdcd] md:mb-8 lg:mb-10 " key={project._id}>
          <img src="https://assets.website-files.com/624380709031623bfe4aee60/6243807090316262904aee69_Placeholder%20Image%20-%20Landscape.svg" alt="" className="inline-block" />
          <div className="px-5 py-8 sm:px-6">
            <h5 className="mb-3 text-xl font-bold">{project.name||'No Name'}</h5>
            <p className="flex-col text-[#808080]">{project.description||'No Description'}</p>
            <div className="mb-5 mt-6 flex flex-wrap gap-2 md:mb-6 lg:mb-8">
<div className={`rounded-sm p-2 text-sm font-semibold uppercase text-white ${project?.completed ? 'bg-green-500 ' : 'bg-red-500'}`}>
  <p>{project?.completed ? 'Completed' : 'Not Completed'}</p>
</div>
            </div>

    <div className="flex flex-wrap items-center justify-between gap-4 py-8">
        <ButtonGroup variant="gradient">
      <Button  onClick={()=>{openModal(project._id)}} >Edit</Button>
      <Button onClick={()=>{delteUserProject(project._id)}}>Delete</Button>
    </ButtonGroup>
    </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <a className="inline-block rounded-md bg-black px-6 py-3 text-center font-semibold text-white" onClick={()=>{router.push(`project/${project._id}`)}}>View Project</a>
            </div>
          </div>
        </div>
                </>
              ))
            ) : (
     <DotLoader 
     color="black"
     size={100} />
            )}
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default page