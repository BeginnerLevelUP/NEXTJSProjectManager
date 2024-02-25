
 "use client"
 
import React, { useState,useEffect } from 'react';
import Home from './homeProject';
import Projects from './projectProject';
import Devops from './devops';
import Builder from './builder';
import AddMember from './addMember';
import AddProjects from './addProjects';
import Team from './team';
 export default function Project(){
  const [isActiveHome, setIsActiveHome] = useState(true);
  const [isActiveProject, setIsActiveProject] = useState(false);
  const [isActiveAddMember, setIsActiveAddMember] = useState(false);
  const [isActiveAddProjects, setIsActiveAddProjects] = useState(false);
  const [isActiveBuilder, setIsActiveBuilder] = useState(false);
  const [isActiveDevOps, setIsActiveDevOps] = useState(false);
  const [isActiveTeam, setIsActiveTeam] = useState(false);
       useEffect(() => {
    const init = async () => {
      const {  Input,Ripple,initTE, Sidenav, Offcanvas } = await import("tw-elements");
      initTE({ Input,Ripple,Sidenav,Offcanvas});
    };
    init();
  }, []);

const renderBody = () => {
  switch(true) {
    case isActiveHome:
      return <Home/>;
    case isActiveProject:
      return <Projects/>;
    case isActiveAddMember:
      return <AddMember/>;
    case isActiveAddProjects:
      return <AddProjects/>;
    case isActiveBuilder:
      return <Builder/>;
    case isActiveDevOps:
      return <Devops/>;
    case isActiveTeam:
      return <Team/>
    default:
      return null;
  }
};

const renderNav = () => {
  if (isActiveHome) {
    return (
      <>
        <div>
          <div
            className="invisible fixed bottom-0 left-0 top-0 z-[1045] flex w-96 max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
            data-te-offcanvas-init
          >

            <a
              className="mb-3 flex items-center justify-center border-b-2 border-solid border-gray-100 py-6 outline-none"
              href="#!"
              data-te-ripple-init
              data-te-ripple-color="primary"
            >
              {/* insert an icon */}
              <span>Project Manager</span>
            </a>
            <ul
              className="relative m-0 list-none px-[0.2rem] pb-12"
              data-te-sidenav-menu-ref
            >
              <li
                className="relative"
                onClick={() => {
                  setIsActiveHome(!isActiveHome);
                  setIsActiveProject(false);
                  setIsActiveAddMember(false);
                  setIsActiveAddProjects(false);
                  setIsActiveBuilder(false);
                  setIsActiveDevOps(false);
                  setIsActiveTeam(false);
                }}
              >
                <a
                  className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </span>
                  <span>Homeadfdf</span>
                </a>
              </li>
              <li
                onClick={() => {
                  setIsActiveAddProjects(!isActiveAddProjects);
                  setIsActiveHome(false);
                  setIsActiveProject(false);
                  setIsActiveAddMember(false);
                  setIsActiveBuilder(false);
                  setIsActiveDevOps(false);
                  setIsActiveTeam(false);
                }}
                className="relative pt-4"
              >
                <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">Create</span>
                <a
                  className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                  <span>Project</span>
                </a>
              </li>
              <li
                onClick={() => {
                  setIsActiveAddMember(!isActiveAddMember);
                  setIsActiveHome(false);
                  setIsActiveProject(false);
                  setIsActiveAddProjects(false);
                  setIsActiveBuilder(false);
                  setIsActiveDevOps(false);
                  setIsActiveTeam(false);
                }}
                className="relative"
              >
                <a
                  className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                  <span>Add Member</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
 else {
    return (
<>
<div>
  <div
    className="invisible fixed bottom-0 left-0 top-0 z-[1045] flex w-96 max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
    tabIndex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
    data-te-offcanvas-init
  >
    <a
      className="mb-3 flex items-center justify-center border-b-2 border-solid border-gray-100 py-6 outline-none"
      href="#!"
      data-te-ripple-init
      data-te-ripple-color="primary"
    >
      {/* insert an icon */}
      <span>Project Manager</span>
    </a>
    <ul
      className="relative m-0 list-none px-[0.2rem] pb-12"
      data-te-sidenav-menu-ref
    >
      <li
        className="relative"
        onClick={() => {
          setIsActiveHome(!isActiveHome);
          setIsActiveProject(false);
          setIsActiveAddMember(false);
          setIsActiveAddProjects(false);
          setIsActiveBuilder(false);
          setIsActiveDevOps(false);
          setIsActiveTeam(false);
        }}
      >
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </span>
          <span>Home</span>
        </a>
      </li>
      <li
        className="relative pt-4"
        onClick={() => {
          setIsActiveAddProjects(!isActiveAddProjects);
          setIsActiveHome(false);
          setIsActiveProject(false);
          setIsActiveAddMember(false);
          setIsActiveBuilder(false);
          setIsActiveDevOps(false);
          setIsActiveTeam(false);
        }}
      >
        <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">
          Create
        </span>
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
          <span>Project</span>
        </a>
      </li>
      <li
        className="relative"
        onClick={() => {
          setIsActiveAddMember(!isActiveAddMember);
          setIsActiveHome(false);
          setIsActiveProject(false);
          setIsActiveAddProjects(false);
          setIsActiveBuilder(false);
          setIsActiveDevOps(false);
          setIsActiveTeam(false);
        }}
      >
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
          <span>Add Member</span>
        </a>
      </li>
      <li
        className="relative pt-4"
        onClick={() => {
          setIsActiveProject(!isActiveBuilder);
          setIsActiveHome(false);
          setIsActiveAddMember(false);
          setIsActiveAddProjects(false);
          setIsActiveBuilder(false);
          setIsActiveDevOps(false);
          setIsActiveTeam(false);
        }}
      >
        <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">
          Manage
        </span>
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
            </svg>
          </span>
          <span>Projects</span>
        </a>
      </li>
      <li
        className="relative"
        onClick={() => {
          setIsActiveTeam(!isActiveTeam);
          setIsActiveHome(false);
          setIsActiveProject(false);
          setIsActiveAddMember(false);
          setIsActiveAddProjects(false);
          setIsActiveBuilder(false);
          setIsActiveDevOps(false);
        }}
      >
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                clipRule="evenodd"
              />
              <path
                d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"
              />
            </svg>
          </span>
          <span>Team</span>
        </a>
      </li>
      <li
        className="relative pt-4"
        onClick={() => {
          setIsActiveBuilder(!isActiveBuilder);
          setIsActiveHome(false);
          setIsActiveProject(false);
          setIsActiveAddMember(false);
          setIsActiveAddProjects(false);
          setIsActiveDevOps(false);
          setIsActiveTeam(false);
        }}
      >
        <span className="px-6 py-4 text-[0.6rem] font-bold uppercase text-gray-600 dark:text-gray-400">
          Tools (Coming Soon)
        </span>
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span>Drag & drop builder</span>
        </a>
      </li>
      <li
        className="relative"
        onClick={() => {
          setIsActiveDevOps(!isActiveDevOps);
          setIsActiveHome(false);
          setIsActiveProject(false);
          setIsActiveAddMember(false);
          setIsActiveAddProjects(false);
          setIsActiveBuilder(false);
          setIsActiveTeam(false);
        }}
      >
        <a
          className="flex cursor-pointer items-center truncate rounded-[5px] px-6 py-[0.45rem] text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          data-te-sidenav-link-ref
        >
          <span>Dev Ops</span>
        </a>
      </li>
    </ul>
  </div>
</div>;
</>
    );
  }
};

return (
  <>
    <div className="flex space-x-2">
      {renderNav()}
    </div>

    <div className='bg-black m-auto h-full w-full text-center'>

      <div className='flex justify-center '>
        <button
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          type="button"
          data-te-offcanvas-toggle
          data-te-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <nav
          className="relative flex w-full flex-wrap items-center justify-between bg-gray-800 py-3 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start"
          data-te-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <nav className="bg-grey-light w-full rounded-md" aria-label="breadcrumb">
              <ol className="list-reset flex">
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <span className="mx-2 text-neutral-500 dark:text-neutral-200">/</span>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-200"
                  >
                    Library
                  </a>
                </li>
                <li>
                  <span className="mx-2 text-neutral-500 dark:text-neutral-200">/</span>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-neutral-500 hover:text-neutral-600 dark:text-neutral-200"
                  >
                    Data
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </nav>
      </div>

      {renderBody()}
    </div>
  </>
)}
