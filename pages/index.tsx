import React from 'react'
import Head from '../components/Head/Head'
import Nav from '../components/Nav/Nav'

export default function Home() {
  return (
    <React.Fragment>
      <Head />

      <div className="h-screen flex flex-col gap-y-8 font-orienta bg-gray-100">
        <Nav>
          <div className="py-6 border-b-4 border-gray-600">
            <a href="/" className="font-bold tracking-wide text-gray-800 hover:text-blue-600" target="_blank">
              text-copy
            </a>
          </div>

          <div>
            <a href="https://github.com/ksdme" className="text-gray-800 hover:text-blue-600" target="_blank">
              ksdme
            </a>
          </div>
        </Nav>

        <div className="px-8 text-center">
          water warm blood
        </div>

        <div className="h-full flex-grow px-8 pb-8">
          <div className="p-8 bg-white h-full rounded-lg resize-none border-2 border-gray-200 outline-none" contentEditable>
            hello world link
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
