"use client"
import Nav from '../components/nav';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { useRouter } from 'next/navigation';
const Page = () => {
  const router=useRouter()
  const { data: session } = useSession();
  const user = session?.user;
  const [userData, setUserData] = useState();

  const fetchUserAssociates = async () => {
    const userQuery = `
      query User($userId: ID!) {
        user(id: $userId) {
          _id
          associates {
            _id
            username
            email
            password
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

  const removeUserAssociate=async(associateId)=>{
   const removeQuery=`mutation RemoveAssociate($id: ID!, $associateId: ID!) {
  removeAssociate(_id: $id, associateId: $associateId) {
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
          query: removeQuery,
          variables: {
            id: user?.email,
            associateId
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error("Error Fetching User Projects:", errors);
        return null;
      }
    if (data && data.removeAssociate) {
      // Update state with the removed associate in user's associates array
      setUserData((prevUserData) => ({
        ...prevUserData,
        associates: prevUserData.associates?.filter(
          (associate) => associate._id !== associateId
        ),
      }));
    }

      return data;
    } catch (error) {
      console.error("Error Fetching User Projects:", error.message);
      return null;
    }
  }
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserAssociates();
      if (data) {
        setUserData(data.user.associates||[]);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <>
      <Nav />
      <section>
        <div className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <h2 className="text-center text-3xl font-bold md:text-5xl">View and Manage Team</h2>
          <ul className="mx-auto grid lg:gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-lg md:max-w-5xl">
            {userData?.length>0 ? (
              userData?.map((data) => (
                <li key={data._id} className="mx-auto flex max-w-xs flex-col items-center gap-4 py-6 md:py-4 text-center">
                  <img src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844" alt="" className="mb-4 inline-block h-40 w-40 rounded-full object-cover" />
                  <p className="font-bold">{data?.username}</p>
                  <p className="text-sm text-[#636262]">{data?.email}</p>
                  <div className="mt-4 flex flex-wrap">
                    <a onClick={()=>{router.push(`/profile/${data?.email}`)}} className="mr-2 inline-block h-8 w-8 max-w-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>


                    </a>
                    <a onClick={()=>{removeUserAssociate(data._id)}} className="inline-block h-8 w-8 max-w-full">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
                    </a>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <DotLoader color="#636262" loading={true} size={50} />
              </div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Page;
