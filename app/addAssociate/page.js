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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="associateName">Associate Name</label>
          <textarea
            id="associateName"
            value={associateName}
            onChange={handleAssociateChange}
            required
          />
        </div>
        <button type="submit">Add Associate</button>
      </form>
    </>
  );
}
