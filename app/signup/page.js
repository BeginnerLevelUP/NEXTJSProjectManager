
"use client"
import React, { useState,useEffect,useLayoutEffect,useRef } from 'react';
import Project from '../components/project';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function LoginForm() {
  const introDiv=useRef(null)
  const demo=useRef(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  useEffect(() => {
    const init = async () => {
      const {  Input,Ripple,initTE, Sidenav, } = await import("tw-elements");
      initTE({ Input,Ripple,Sidenav});
    };
    init();
  }, []);

    useEffect( () => { (
      async () => {

          const LocomotiveScroll = (await import('locomotive-scroll')).default

          const locomotiveScroll = new LocomotiveScroll();
      }
    )()

  }, [])

useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: document.documentElement,
            scrub: true,
            start: "top",
            end: "700px",
        }
    });

    timeline
        .from(demo.current, {clipPath: `inset(50%)`, filter: "hue-rotate(180deg)", })
        .to(demo.current, { clipPath: `inset(0%)`, filter: "hue-rotate(0deg)", })
      

});


  return (
<>
<body className='overflow-hidden'>


<header class=" bg-black overflow-hidden" >   
  <div  ref={introDiv}  data-scroll  data-scroll-speed=".5" class="px-6 py-12 text-center md:px-12 lg:py-24 lg:text-left">
    <div class="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div   class="mt-12 lg:mt-0" >
          <h1
            class="mt-0 mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,81%,95%)]">
            Manage Your <br /><span class="text-[hsl(218,81%,75%)]">Projects</span>
          </h1>
          <p class="opacity-70 text-[hsl(218,81%,85%)]">

          </p>
        </div>

        <div class="relative mb-12 lg:mb-0">
          <div id="radius-shape-1" class="absolute rounded-full shadow-lg"></div>
          <div id="radius-shape-2" class="absolute shadow-lg"></div>
          <div
            class="relative bg-[hsla(0,0%,100%,0.9)] backdrop-blur-[25px] backdrop-saturate-[200%] block rounded-lg px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,15%,0.9)] dark:shadow-black/20 md:px-12">
            <form>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative mb-6" data-te-input-wrapper-init>
                  <input type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1" placeholder="First name" />
                  <label for="exampleFormControlInput1"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">First
                    name
                  </label>
                </div>
                <div class="relative mb-6" data-te-input-wrapper-init>
                  <input type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2" placeholder="Last name" />
                  <label for="exampleFormControlInput2"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Last
                    name
                  </label>
                </div>
              </div>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <input type="email"
                  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput3" placeholder="Email address" />
                <label for="exampleFormControlInput3"
                  class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Email
                  address
                </label>
              </div>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <input type="password"
                  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput4" placeholder="Password" />
                <label for="exampleFormControlInput4"
                  class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Password
                </label>
              </div>

              <button type="button" data-te-ripple-init data-te-ripple-color="light"
                class="mb-6 inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                Sign up
              </button>

              <div class="text-center">
                <p class="mb-6 dark:text-neutral-50">
                  or sign up with:
                </p>
              </div>
              <div class="flex justify-center">
                <a href="#!" role="button"
                  class="action:text-primary-700 dark:action:text-primary-600 text-primary transition duration-200 ease-in-out hover:text-primary-600 focus:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500">
                   {/* <!---- Google --> */}
                  <span class="[&>svg]:mx-4 [&>svg]:h-4 [&>svg]:w-4">
<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>GitHub dark icon</title>
  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
</svg>
                  </span>
                </a>
                <a href="#!" role="button"
                  class="action:text-primary-700 dark:action:text-primary-600 text-primary transition duration-200 ease-in-out hover:text-primary-600 focus:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500">
                   {/* <!---- Github --> */}
                  <span class="[&>svg]:mx-4 [&>svg]:h-4 [&>svg]:w-4">
<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>Google icon</title>
  <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
  <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
  <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
  <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
</svg>
                  </span>
                </a>
                <a href="#!" role="button"
                  class="action:text-primary-700 dark:action:text-primary-600 text-primary transition duration-200 ease-in-out hover:text-primary-600 focus:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500">
                   {/* <!---- Github --> */}
                  <span class="[&>svg]:mx-4 [&>svg]:h-4 [&>svg]:w-4">
<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <g fill="none">
    <path d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z" fill="#069"/>
    <path d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z" fill="#fff"/>
  </g>
</svg>
                  </span>
                </a>
              </div>

                <div class="text-center">
                <p class="mt-10 ml-80 dark:text-neutral-50" href='#'>
                  Already A Member <span><a href="#" class='text-blue-900 '>Login In</a></span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<main class="flex flex-col transform rotate-0  bg-black p-2 text-center h-max">



  <h2 class=' text-5xl text-white font-black relative top-100'>WHY?</h2>

<div
  class=" rounded-lg bg-neutral-800 px-6 py-5 text-base text-neutral-50 dark:bg-neutral-900 absolute top-96 z-10"
  role="alert"
   data-scroll  data-scroll-speed=".5">
  Track The Progress Of Your Website
</div>


<div
  class="rounded-lg bg-neutral-800 px-6 py-5 text-base text-neutral-50 dark:bg-neutral-900 absolute bottom-1/2 z-10 left-1/3 "
  role="alert"
   data-scroll  data-scroll-speed=".5">
  Hands On Role In Features 
</div>


<div
  class=" rounded-lg bg-neutral-800 px-6 py-5 text-base text-neutral-50 dark:bg-neutral-900 absolute bottom-96 left-3/4 z-10  "
  role="alert"
   data-scroll  data-scroll-speed=".5">
  No Cookie Cutter Templates
</div>

<section class='scale-85' ref={demo} >
<Project></Project>
</section>

</main>
{/* <!---- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */} 
{/* <!---- Footer container --> */}
<footer
  class="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
  <div
    class="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
    <div class="mr-12 hidden lg:block">
      <span>Feel Free To Contact:</span>
    </div>
    {/* <!---- Social network icons container --> */}
    <div class="flex justify-center">
      <a href="#!" class="mr-6 text-neutral-600 dark:text-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </a>
      <a href="#!" class="mr-6 text-neutral-600 dark:text-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </a>
      <a href="#!" class="mr-6 text-neutral-600 dark:text-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
            fill-rule="evenodd"
            clip-rule="evenodd" />
        </svg>
      </a>
      <a href="#!" class="mr-6 text-neutral-600 dark:text-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a href="#!" class="mr-6 text-neutral-600 dark:text-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      </a>
      <a href="#!" class="text-neutral-600 dark:text-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  </div>

  {/* <!---- Main container div: holds the entire content of the footer, including four sections (TW elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
  <div class="mx-6 py-10 text-center md:text-left">
    <div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {/* <!---- TW elements section --> */}
      <div class="">
        <h6
          class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-3 h-4 w-4">
            <path
              d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
          </svg>
          TW elements
        </h6>
        <p>
          Here you can use rows and columns to organize your footer
          content. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit.
        </p>
      </div>
      {/* <!---- Products section --> */}
      <div class="">
        <h6
          class="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Products
        </h6>
        <p class="mb-4">
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Angular</a
          >
        </p>
        <p class="mb-4">
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >React</a
          >
        </p>
        <p class="mb-4">
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Vue</a
          >
        </p>
        <p>
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Laravel</a
          >
        </p>
      </div>
      {/* <!---- Useful links section --> */}
      <div class="">
        <h6
          class="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Useful links
        </h6>
        <p class="mb-4">
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Pricing</a
          >
        </p>
        <p class="mb-4">
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Settings</a
          >
        </p>
        <p class="mb-4">
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Orders</a
          >
        </p>
        <p>
          <a href="#!" class="text-neutral-600 dark:text-neutral-200"
            >Help</a
          >
        </p>
      </div>
      {/* <!---- Contact section --> */}
      <div>
        <h6
          class="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Contact
        </h6>
        <p class="mb-4 flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-3 h-5 w-5">
            <path
              d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path
              d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          New York, NY 10012, US
        </p>
        <p class="mb-4 flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-3 h-5 w-5">
            <path
              d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path
              d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          info@example.com
        </p>
        <p class="mb-4 flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-3 h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clip-rule="evenodd" />
          </svg>
          + 01 234 567 88
        </p>
        <p class="flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mr-3 h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
              clip-rule="evenodd" />
          </svg>
          + 01 234 567 89
        </p>
      </div>
    </div>
  </div>

  {/* <!----Copyright section-->  --> */}
  <div class="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
    <span>© 2023 Copyright:</span>
    <a
      class="font-semibold text-neutral-600 dark:text-neutral-400"
      href="https://tw-elements.com/"
      >TW elements</a
    >
  </div>
</footer>
</body>
</>

  );
}

export default LoginForm;
