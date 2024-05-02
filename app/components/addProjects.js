
export default function  AddProjects() {
	const callAPI = async () => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/graphql`,{
          method:"POST",
            headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    query:` query Users {
  users {
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
}`
  })
        }
			);
			const data = await res.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<main>
				<button onClick={callAPI}>Make API Call</button>
			</main>
		</div>
	);
}

