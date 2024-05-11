"use client"
import Nav from '../components/nav';
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddMember() {
  const { data: session } = useSession();
  const user = session?.user;
  const [associateName, setAssociateName] = useState('');

  const addMember = async (associateName) => {
    const addMemberMutation = `
      mutation AddAssociate($email: String!, $associateName: String!) {
        addAssociate(email: $email, associateName: $associateName) {
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
      const res = await fetch(`http://localhost:3000/api/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: addMemberMutation,
          variables: {
            email: user?.email,
            associateName
          }
        })
      });

      const { data, errors } = await res.json();
      
      if (errors) {
        console.error('Error Adding Associate:', errors);
      }
    } catch (error) {
      console.error('Unknown Error:', error.message);
    }
  };

  

  const handleAssociateChange = (e) => {
    setAssociateName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMember(associateName);
    setAssociateName('');
  };

  return (
    <>
      <Nav />
      <form className='my-4 mx-auto py-24 w-1/2'onSubmit={handleSubmit}>
            <div className="relative mb-6" data-te-input-wrapper-init>
                <input type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3"
            value={associateName}
            onChange={handleAssociateChange}/>
                <label htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Associate Name or Email
                </label>
              </div>


              <button type="submit" data-te-ripple-init data-te-ripple-color="light"
                className="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                Add Associate
              </button>
      </form>
    </>
  );
}
