"use client"
import { useState,useEffect } from "react"
import DotLoader from "react-spinners/DotLoader"
const page = ({params}) => {
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
      const res = await fetch("http://localhost:3000/api/graphql", {
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
        setUserData(data);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    userData?(
    <div>
        <p>Hello {userData?.user?.username} </p>
    </div>
    ):(
        <DotLoader size={100}></DotLoader>
    )

  )
}

export default page