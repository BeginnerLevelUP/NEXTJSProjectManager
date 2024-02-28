
"use client"
import Project from "./components/project";
import { useDispatch,useSelector } from "react-redux"
export default function Home() {
  const user=useSelector(({user}) => user)
  console.log(user)
  const projects = useSelector(({projects}) => projects.projects);
  const comments= useSelector(({projects}) => projects.comments)
  const tasks= useSelector(({projects}) => projects.tasks)
  return (
<>
<Project></Project>
</>
  );
}
