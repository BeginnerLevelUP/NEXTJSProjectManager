"use client"
import Nav from "@/app/components/nav"
import { useState,useEffect } from "react"
import DotLoader from "react-spinners/DotLoader"
import { useRouter } from "next/navigation"
const page = ({params}) => {
const router=useRouter()
const [userData, setUserData] = useState();
const fetchUser=async()=>{
    const userQuery=`query User($userId: ID!) {
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
}`
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL||'http://localhost:3000'}/api/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          variables: {
            userId:decodeURIComponent(params?.id)
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("Error Fetching User", errors);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error Fetching User ", error.message);
      return null;
    }
}
 useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser();
      if (data) {
        setUserData(data?.user);
      }
    };

    fetchData();
  }, [params.id]);
console.log(userData)
return (
    userData?(
    <>
    <Nav></Nav>
        <section>
      {/* Container */}
      <div className="flex justify-center p-10">
        {/* Component */}
        <div className="">
          {/* Content */}
          <div className="flex flex-col gap-8 ">
            <img src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844"
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
            <h2 className="mb-8 text-3xl font-bold md:text-5xl">     {userData?.username} </h2>
            <p className="text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin
              fermentum leo vel orci. Dui faucibus in ornare quam viverra orci
              sagittis eu. Viverra nam libero justo laoreet sit amet. Vulputate
              odio ut enim blandit volutpat maecenas volutpat blandit. A lacus
              vestibulum sed arcu non odio euismod. Feugiat pretium nibh ipsum
              consequat. Cum sociis natoque penatibus et. Leo in vitae turpis
              massa sed. Neque aliquam vestibulum morbi blandit cursus.
              Facilisis sed odio morbi quis. A pellentesque sit amet porttitor
              eget.
            </p>
            {/* Divider */} <div className="my-8 h-px w-full bg-black"></div>
{
  userData.projects && userData.projects.length > 0 ? (
    userData.projects.map((project) => (
      <div key={project._id} className="grid gap-4 md:grid-cols-1 md:gap-4 w-64" onClick={()=>{router.push(`/project/${project._id}`)}}>
        <div className=" rounded-md border border-solid bg-gray-100 p-6 md:p-6">
            <div className="flex items-center gap-x-2">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844"
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="text-sm font-semibold sm:text-base">{project.name}</p>
            </div>
        </div>
      </div>
    ))
  ) : (
    <h1>No Projects</h1>
  )
}
          </div>

        </div>
      </div>
    </section>

    </>

    ):(
        <DotLoader size={100}></DotLoader>
    )

  )
}

export default page