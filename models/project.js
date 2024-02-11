import { Schema, model,models } from "mongoose";
/*
What should a project schema have?
dateCreated
dateUpdated
name
description
completed 
git repo url
delpoyed site

ref
comments 
task
*/
const projectSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: null
    },
    name: {
        type: String,
        default: "Untitled Project"
    },
    description: {
        type: String,
        default: "No Description"
    },
    completed: {
        type: Boolean,
        default: false
    },
    gitRepoUrl: {
        type: String,
        default:"No Repositroy Link"
    },
    deployedSite: {
        type: String,
        default:"Not Yet Deployed"
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    tasks:{
        type:Schema.Types.ObjectId,
        ref:"Task"
    }
});

const Project = models.Project|| model('Project', projectSchema);

export default Project;
