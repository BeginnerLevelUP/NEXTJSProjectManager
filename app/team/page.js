"use client"
import Nav from '../components/nav';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
const Page = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserAssociates();
      if (data) {
        setUserData(data.user.associates);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <>
      <Nav />
      <section>
        <div className="mx-auto w-full max-w-5xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <h2 className="text-center text-3xl font-bold md:text-5xl">My Team</h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-[#636262] md:mb-16">Lorem ipsum dolor sit amet elit ut aliquam</p>
          <ul className="mx-auto grid lg:gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-lg md:max-w-5xl">
            {userData ? (
              userData.map((data) => (
                <li key={data._id} className="mx-auto flex max-w-xs flex-col items-center gap-4 py-6 md:py-4 text-center">
                  <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a0f4871ea332919af9f8d_Rectangle%2035.png" alt="" className="mb-4 inline-block h-40 w-40 rounded-full object-cover" />
                  <p className="font-bold">{data?.username}</p>
                  <p className="text-sm text-[#636262]">Webflow Developer</p>
                  <div className="mt-4 flex flex-wrap">
                    <a href="#" className="mr-2 inline-block h-8 w-8 max-w-full">
                      <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635b4971014d2b4c0744a079_FacebookLogo.svg" alt="" className="inline-block" />
                    </a>
                    <a href="#" className="inline-block h-8 w-8 max-w-full">
                      <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635b4977ee8effeeefc05b5d_InstagramLogo.svg" alt="" className="inline-block" />
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
