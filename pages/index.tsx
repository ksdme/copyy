import React from 'react'
import {
  ArrowCircleDownIcon,
  ClipboardIcon,
  SortAscendingIcon,
  StatusOnlineIcon,
} from '@heroicons/react/outline'
import Button from '../components/Button/Button'
import Head from '../components/Head/Head'
import Nav from '../components/Nav/Nav'

export default function Home() {
  return (
    <React.Fragment>
      <Head />

      <div className="h-screen flex flex-col gap-y-8 font-orienta bg-gray-100">
        <Nav>
          <div className="grid grid-cols-3">
            <div className="flex">
              <div className="py-6 border-b-4 border-gray-600">
                <a href="/" className="font-bold tracking-wide text-gray-800 hover:text-blue-600" target="_blank">
                  text-copy
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center text-gray-600 cursor-pointer hover:text-black tracking-wide font-medium gap-x-2">
              battle bank bike system
            </div>

            <div className="flex items-center justify-end tracking-wide font-medium gap-x-4">
              <span className="font-medium text-gray-600">
                Pair
              </span>
            </div>
          </div>
        </Nav>

        <div className="grid grid-cols-3 px-8">
          <div className="col-start-3 flex justify-end items-center gap-x-10">
            <Button text="Online" icon={StatusOnlineIcon} />
            <Button text="Copy" icon={ClipboardIcon} />
            <Button text="Paste" icon={ArrowCircleDownIcon} />
            <Button text="Force Send" icon={SortAscendingIcon} />
          </div>
        </div>

        <div className="h-full flex-grow px-8 pb-8">
          <div
            className="p-8 bg-white h-full rounded-lg resize-none border-2 border-gray-200 outline-none selection-black-white"
            contentEditable={true}
            suppressContentEditableWarning={true}>
            hello world link hey
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
