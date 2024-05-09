"use client"
import Nav from "../components/nav";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from 'next/navigation'
import DotLoader from "react-spinners/DotLoader";
import { ButtonGroup, Button } from "@material-tailwind/react";
const page = () => {

  const router = useRouter()
  const { data: session } = useSession();
  const user = session?.user;
  const [userData, setUserData] = useState();

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
  <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Component */}
        <div className="flex flex-col items-stretch">
          {/* Title */}
          <h2 className="mb-5 text-center text-3xl font-bold md:text-5xl">Manage Your Projects </h2>
          {/* Content */}
          <div className="gap-x-8 [column-count:1] md:grid-cols-2 md:gap-x-4 md:[column-count:2] ">
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
      <Button>Edit</Button>
      <Button>Delete</Button>
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