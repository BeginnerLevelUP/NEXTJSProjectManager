"use client"
import Nav from "./components/nav";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import SucessMessage from "./components/sucessMessage";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
export default function Home() {
  const [noti,setNoti]=useState()
  const {data:session}=useSession()
  const userId = session?.user?.email;
  const [user,setUserData]=useState()
    const [open, setOpen] = useState(true);
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
    const fetchUser = async () => {
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
      const res = await fetch("http://localhost:3000/api/graphql", {
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
      });

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
  };
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
  }, [userId]);

  return (
<>
  <Nav />
  {renderNoti()}

  <div className="m-5 grid">
    <div className="space-x-5 flex">
      <h3 className="text-2xl font-bold mb-4 my-auto" onClick={toggleOpen}>Active Tasks</h3>
      {
        open?(
          <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

          </>
        ):(
          <>
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
      {user?.projects.map(project => (
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
      ))}
      </div>
          </CardBody>
        </Card>
      </Collapse>
 

    <div className="space-x-5 flex-col">
  <h2 className="text-2xl font-bold mb-4 my-auto">Current Projects</h2>
 </div> 

 <div className="space-x-5 flex-col">
  <h2 className="text-2xl font-bold mb-4 my-auto">Added Asscoiates</h2>
 </div>

  </div>
</>
  );
}
