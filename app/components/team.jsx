import React from 'react'

export default function Team() {
  return (
//  ttps://tailspark.co/components?component=Team
// // <!-- Section Team -->
<section className="bg-[#f2f2f7]">
  {/* <!-- Container --> */}
  <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
    {/* <!-- Title --> */}
    <h2 className="text-center text-3xl font-bold md:text-5xl">Our Team Members</h2>
    <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-[#636262] md:mb-16">Lorem ipsum dolor sit amet elit ut aliquam</p>
    {/* <!-- Team List --> */}
    <ul className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 md:grid-cols-3">
      <li className="mx-auto flex max-w-xs flex-col items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start lg:text-left">
        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a0f4871ea332919af9f8d_Rectangle%2035.png" alt="" className="mb-4 h-56 lg:h-72" />
        <p className="font-bold">John</p>
        <p className="text-sm text-[#636262]">Webflow Developer</p>
      </li>
      <li className="mx-auto flex max-w-xs flex-col items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start lg:text-left">
        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635b47d5a5453de17e4e9bd8_Rectangle%2035-4.png" alt="" className="mb-4 h-56 lg:h-72" />
        <p className="font-bold">Annisyah</p>
        <p className="text-sm text-[#636262]">Webflow Developer</p>
      </li>
      <li className="mx-auto flex max-w-xs flex-col items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start lg:text-left">
        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a0f4adfb4938a1a06002c_Rectangle%2035-2.png" alt="" className="mb-4 h-56 lg:h-72" />
        <p className="font-bold">Tamara</p>
        <p className="text-sm text-[#636262]">Webflow Developer</p>
      </li>
    </ul>
  </div>
</section>
  )
}
