"use client"
import Nav from "./components/nav";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import SucessMessage from "./components/sucessMessage";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  Collapse,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { DotLoader } from "react-spinners";
export default function Home() {
  const router=useRouter()
  const [noti,setNoti]=useState()
  const {data:session}=useSession()
  const userId = session?.user?.email;
  const [user,setUserData]=useState()
  const [open, setOpen] = useState(true);
  const [expand,setExpand]=useState(null)
 const handleExpand = (index) => {
    setExpand((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleOpen = () => setOpen((cur) => !cur);
  const renderNoti = () => {
    if (noti) {
      return (
        <div className="fixed bottom-4 left-4">
          <SucessMessage message={noti} onClose={() => setNoti(null)} />
        </div>
      );
    }
  };
 const fetchUser = useCallback(async () => {
  const userQuery = `
    query Query($userId: ID!) {
      user(id: $userId) {
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
    }
  `;

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          variables: {
            userId,
          },
        }),
      }
    );

    const { data, errors } = await res.json();

    if (errors) {
      console.error("Error Fetch Associate Data:", errors);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error Fetch Associate Data:", error.message);
    return null;
  }
}, [userId]);
    const labelOptions = [
    { label: 'Regular', property: 'regular', color: 'bg-green-500',svg:'green' },
    { label: 'Important', property: 'important', color: 'bg-blue-500' ,svg:'blue' },
    { label: 'Detrimental', property: 'detrimental', color: 'bg-red-500', svg:'red' }
  ];
useEffect(() => {
  const fetchData = async () => {
    const data = await fetchUser();
    if (data) {
      setUserData(data.user);
    }
  };

  fetchData();
}, [fetchUser]);

  return (
<>
  <Nav />
  {renderNoti()}

  <div className="m-5 grid">
    <div className="space-x-5 flex">
      
      {
        open?(
          <>
          <h1>Welcome Back {user?.username||user?.email} </h1>
          <h3 className="text-2xl font-bold mb-4 my-auto hover:underline" onClick={toggleOpen}>Active Tasks</h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

          </>
        ):(
          <>
           <p className="font-bold mb-4 my-auto text-gray-600 " onClick={toggleOpen}>Active Tasks</p>
         
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
          </>
        )
      }


       </div>
      <Collapse open={open}>
        <Card className="my-4 mx-auto w-8/12">
          <CardBody>

      <div className="space-y-4">
{user && user.projects ? (
  user.projects.map(project => (
    project.tasks.map((task, index) => (
      <div key={task._id} className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
        <div className="flex justify-between">
          <div className="text-gray-400 text-xs">Task {index+1}</div>
          <div className="text-gray-400 text-xs">{task.status}</div>
        </div>
        <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">{task.name}</a>
        <div className="text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill={`${labelOptions.find((label) => label.label === task.ranking)?.svg}`} className={`text-gray-800 inline align-middle mr-1`} viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>{task.ranking}
        </div>
        <div className="text-sm">
          <div className={new Date() > new Date(task.dueDate) ? "text-red-600" : "text-gray-600"}>
            <p>
              Due : {new Date(task.dueDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
              {new Date() > new Date(task.dueDate) && " - Overdue"}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>{task.description}</p>
        </div>
      </div>
    ))
  ))
) : (
  <>
    <DotLoader size={100}></DotLoader>
  </>
)}

      </div>
          </CardBody>
        </Card>
      </Collapse>
 



  </div>

<div className="grid grid-cols-5 gap-4 text-center px-auto ">
<div className="space-x-5 col-span-4 ">
    <h2 className="text-2xl font-bold mb-4 my-auto ">Current Projects</h2>
<div className="grid grid-cols-6 ">
  {user ? (
    user.projects.map((project, index) => (
      <Card key={project._id} className={`col-span-${expand === index ? '4' : '2'} m-8`}>
        <CardBody>
          <div className="flex justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {project.name}
            </Typography>
            <svg
              onClick={() => handleExpand(index)}
              className={`transform ${expand === index ? 'rotate-0' : '-rotate-90'} w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
              />
            </svg>
          </div>
          <Typography>
            {expand === index && project.description}
          </Typography>
          {expand === index && (
            <div className="flex space-x-2">
              {project.members.length > 0 ? (
                project.members.map((mem, i) => (
                  <Image
                    key={i}
                    className="object-cover w-8 h-8 rounded-full"
                    src={
                      mem.avatarUrl
                        ? mem.avatarUrl
                        : 'https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844'
                    }
                    alt={`avatar${i + 1}`}
                    width={32}
                    height={32}
                  />
                ))
              ) : (
                <p>No Members</p>
              )}
            </div>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-black" onClick={() => router.push(`/project/${project._id}`)}>
            View Project
          </Button>
        </CardFooter>
      </Card>
    ))
  ) : (
    <DotLoader size={100} />
  )}
</div>

  </div> 

  <div className="space-x-5">
    <h2 className="text-2xl font-bold mb-4 my-auto">Added Associates</h2>
       <div>
      {user?.associates?.map(( associate , index) => (
        <>
      
    <Image onClick={()=>{router.push(`/profile/${associate?.email}`)}} src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844" alt={associate.username} className="mb-4 inline-block h-40 w-40 rounded-full object-cover" />
       
      
        </>
      ))}
    </div>
  </div>
</div>

  
</>
  );
}
