'use client'
import { useState,useEffect } from "react"
import { Fragment } from "react";
import { Combobox, Transition,Dialog,Tab,Menu} from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import DotLoader from "react-spinners/DotLoader";

const projectPage = ({ params }) => {
  const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
        
  const fetchProject=async()=>{
const projectQuery=`query Project($projectId: ID!) {
  project(id: $projectId) {
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
      projects {
        _id
        dateCreated
        dateUpdated
        name
        description
        completed
        gitRepoUrl
        deployedSite
      }
    }
  }
}`
try{
const res=await fetch(
  				`http://localhost:3000/api/graphql`,{
          method:"POST",
            headers: {
    "Content-Type": "application/json"
  },

  body: JSON.stringify({
    query:projectQuery,
     variables:{
      projectId:params.id
    }
  })
})

const {data,errors}=await res.json()
if(errors){
console.log('Error Creating Project:', errors);
}
return data

}catch(e){
  console.log(e instanceof Error ? e.message : "Uknown Error")
}
  }
  useEffect(() => {
    const fetchAndSetProject = async () => {
      const projectData = await fetchProject();
      setCurrentProject(projectData?.project);
    };

    fetchAndSetProject();
  }, [params.id]);
  const [currentProject,setCurrentProject]=useState()
    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(!isOpen)
  }

  function openModal() {
    setIsOpen(!isOpen)
  }
  return (
  currentProject?(
<>
                <div className="text-center">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Create New Task
                  </Dialog.Title>
                  <div className="grid md:grid-cols-2 md:gap-6 my-6">

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input type="email"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3" placeholder="Email address" />
                <label htmlFor="exampleFormControlInput3"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                  Name
                </label>
              </div>

              <div className="relative mb-6" data-te-input-wrapper-init>
                <input type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput4" placeholder="Password" />
                <label htmlFor="exampleFormControlInput4"
                  className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Description
                </label>
              </div>

              <div className="relative mb-6" data-te-input-wrapper-init>
                due date
              </div>


              <div className="relative mb-6" data-te-input-wrapper-init>
 <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
              </div>

              <div className="" data-te-input-wrapper-init>
        <div className="items-center justify-center p-12">
      <div className="w-72 object-fill top-16">
        <Combobox value={people} onChange={setSelected}>
          <Combobox.Label>Assign To:</Combobox.Label>
          <div className="relative mt-1">
            <div className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
              <Combobox.Input
                className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                displayValue={(person) => person.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((person) => (
                    <Combobox.Option
                      key={person.id}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active ? "text-white bg-teal-600" : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
              </div>
              <button type="button" data-te-ripple-init data-te-ripple-color="light"
                className=" mx-24 mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] ">
                Create
              </button>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
              </div>

            <div className="bg-white rounded-3xl p-8 mb-5">
              <h1 className="text-3xl font-bold mb-10">{currentProject.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-stretch">
                  <div className="text-gray-400 text-xs">Members<br />connected</div>
                  <div className="h-100 border-l mx-4"></div>
                  <div className="flex flex-nowrap -space-x-3">
                    <div className="h-9 w-9">
                      <img className="object-cover w-full h-full rounded-full" src="https://ui-avatars.com/api/?background=random" alt="avatar1" />
                    </div>
                    <div className="h-9 w-9">
                      <img className="object-cover w-full h-full rounded-full" src="https://ui-avatars.com/api/?background=random" alt="avatar2" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <button type="button" className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                      <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                    </svg>
                  </button>
                  <button type="button" className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                    Open
                  </button>
                </div>
              </div>

              <hr className="my-10" />

              <div className="grid grid-cols-2 gap-x-20">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Stats</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="p-4 bg-green-100 rounded-xl">
                        <div className="font-bold text-xl text-gray-800 leading-none">Good day, <br />Kristin</div>
                        <div className="mt-5">
                          <button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                            Start tracking
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">20</div>
                      <div className="mt-2">Tasks finished</div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">5,5</div>
                      <div className="mt-2">Tracked hours</div>
                    </div>
                    <div className="col-span-2">
                      <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                        <div className="font-bold text-xl leading-none">Your daily plan</div>
                        <div className="mt-2">5 of 8 completed</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-x-5">
                    <h2 className="text-2xl font-bold mb-4 my-auto">Your tasks today</h2>
                    <span    onClick={openModal} className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="currentColor"stroke-width="2" stroke-linecap="round"stroke-linejoin="round">
                   <circle cx="12" cy="12" r="10" />
                   <line x1="12" y1="8" x2="12" y2="16" />
                   <line x1="8" y1="12" x2="16" y2="12" /></svg>
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Number 10</div>
                        <div className="text-gray-400 text-xs">4h</div>
                      </div>
                      <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Blog and social posts</a>
                      <div className="text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>Deadline is today
                      </div>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Grace Aroma</div>
                        <div className="text-gray-400 text-xs">7d</div>
                      </div>
                      <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">New campaign review</a>
                      <div className="text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                        </svg>New feedback
                      </div>
                    </div>
                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">Petz App</div>
                        <div className="text-gray-400 text-xs">2h</div>
                      </div>
                      <a href="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Cross-platform and browser QA</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


</>
  ):(
    <>
  <DotLoader color="black" size={100}/>
    </>

  )
  )

}

export default projectPage


