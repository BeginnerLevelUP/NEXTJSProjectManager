
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const graphqlEndpoint = "http://localhost:3000/api/graphql";

  const query = `
    query User($userId: ID!) {
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
        }
      }
    }
  `;

  const variables = { userId };

  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.data.user;
    } else {
      throw new Error(data.errors[0].message);
    }
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: {},
  isLoggedIn: false,
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.
    addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(fetchUser.rejected, (state, action) => {

    })
    .addCase(fetchUser.pending,(state,action) => {
      })
  },
});


export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
