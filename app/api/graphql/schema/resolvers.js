import User from "@/models/user";
import Project from "@/models/project";
import Comment from "@/models/comment";
import Task from "@/models/task";
const resolvers = {
  Query: {
    //Query Users
    users: async () => {
  try {
return await User.find({}).populate({
  path: 'projects',
  populate: {
    path: 'tasks',
    populate: {
      path: 'assignedTo' 
    }
  }
});

  } catch (error) {
    throw new Error("Failed to fetch users");
  }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
    //Query Projects
   projects: async () => {
      try {
        return await Project.find({});
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    },
    project: async (_, { id }) => {
      try {
        return await Project.findById(id);
      } catch (error) {
        throw new Error("Failed to fetch project");
      }
    },
    //Query Comment
    comments: async () => {
      try {
        return await Comment.find({});
      } catch (error) {
        throw new Error("Failed to fetch comments");
      }
    },
    comment: async (_, { id }) => {
      try {
        return await Comment.findById(id);
      } catch (error) {
        throw new Error("Failed to fetch comment");
      }
    },
    //Query Tasks
    tasks: async () => {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    },
    task: async (_, { id }) => {
      try {
        const task = await Task.findById(id);
        return task;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    //User Mutations
    createUser: async (_, { username, email, password }) => {
      try {
        const newUser = await User.create({
          username,
          email,
          password
        });
        return newUser;
      } catch (error) {
        throw new Error("Could not create user");
      }
    },
    updateUser: async (_, { id, username, email, password }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { username, email, password },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error("Could not update user");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
      } catch (error) {
        throw new Error("Could not delete user");
      }
    },
    //Project Mutations
    createProject: async (_, { userId, name, description, completed, gitRepoUrl, deployedSite }) => {
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Create the new project
    const newProject = await Project.create({
      name,
      description,
      completed,
      gitRepoUrl,
      deployedSite
    });

    // Update the user's projects array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { projects: newProject._id } },
      { new: true }
    ).populate('projects');

    return newProject;
  } catch (error) {
    throw new Error("Could not create project");
  }
    }    
,
    updateProject: async (_, { id, name, description, completed, gitRepoUrl, deployedSite }) => {
      try {
        const updatedProject = await Project.findByIdAndUpdate(
          id,
          { name, description, completed, gitRepoUrl, deployedSite },
          { new: true }
        );
        return updatedProject;
      } catch (error) {
        throw new Error("Could not update project");
      }
    },
    deleteProject: async (_, { id }) => {
      try {
        const deletedProject = await Project.findByIdAndDelete(id);
        return deletedProject;
      } catch (error) {
        throw new Error("Could not delete project");
      }
    },
    addProjectMember: async (_, { projectId, userId }) => {
    try {
      // Check if the project and user exist
      const project = await Project.findById(projectId);
      const user = await User.findById(userId);
      if (!project || !user) {
        throw new Error("Project or user not found");
      }

      // Add user to project members
      project.members.push(userId);
      await project.save();

      return project;
    } catch (error) {
      throw new Error("Could not add member to project");
    }
  },
   removeProjectMember: async (_, { projectId, userId }) => {
    try {
      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      // Remove user from project members
      project.members.pull(userId);
      await project.save();

      return project;
    } catch (error) {
      throw new Error("Could not remove member from project");
    }
  },
    //Comment Mutations and Reply
     createComment: async (_, { text, user,projectId }) => {
      try {
        const newComment = await Comment.create({
          text,
          user
        });
        const currentProject=await Project.findByIdAndUpdate(
          projectId,
          {$set:{comments:newComment._id}},
          {new:true}
          )
        return newComment;
      } catch (error) {
        throw new Error("Could not create comment");
      }
    },
    updateComment: async (_, { id, text }) => {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          id,
          { text },
          { new: true }
        );
        return updatedComment;
      } catch (error) {
        throw new Error("Could not update comment");
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        return deletedComment;
      } catch (error) {
        throw new Error("Could not delete comment");
      }
    },
    createReply: async (_, { commentId, text, user }) => {
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }
        comment.replies.push({ text, user });
        await comment.save();
        return comment;
      } catch (error) {
        throw new Error("Could not create reply");
      }
    },
    updateReply: async (_, { commentId, replyId, text }) => {
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }
        const reply = comment.replies.id(replyId);
        if (!reply) {
          throw new Error("Reply not found");
        }
        reply.text = text;
        await comment.save();
        return comment;
      } catch (error) {
        throw new Error("Could not update reply");
      }
    },
    deleteReply: async (_, { commentId, replyId }) => {
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
          throw new Error("Comment not found");
        }
        comment.replies.id(replyId).remove();
        await comment.save();
        return comment;
      } catch (error) {
        throw new Error("Could not delete reply");
      }
    },
    //Task Mutations
createTask: async (_, { name, description, dueDate, assignedTo, ranking, status, projectId }) => {
  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Create the task
    const task = await Task.create({ name, description, dueDate, assignedTo, ranking, status });

    // Associate the task with the project
    await Project.findByIdAndUpdate(
      project._id,
      { $addToSet: { tasks: task._id } },
      { new: true }
    );

    return task;
  } catch (err) {
    throw new Error(err);
  }
},
  updateTask: async (_, {taskId, name, description, status, dueDate, assignedTo, ranking }) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { name, description, status, dueDate, assignedTo, ranking }, { new: true });
        return updatedTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteTask: async (_, { id }) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
      } catch (err) {
        throw new Error(err);
      }
    }
    
  }
  }

export default resolvers;
