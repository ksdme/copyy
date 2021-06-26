import React from 'react'
import {
  ArrowCircleDownIcon,
  ClipboardIcon,
  SortAscendingIcon,
} from '@heroicons/react/outline'
import { When } from 'react-if'
import { rword } from 'rword'
import { useMqttAutoConnect } from '../hooks/useMqtt'
import Button from '../components/Button/Button'
import Head from '../components/Head/Head'
import Nav from '../components/Nav/Nav'
import Status from '../components/Status/Status'

interface Props {
  defaultCode: string
}

function HomeComponent(props: Props) {
  const {
    defaultCode,
  } = props

  const [
    status,
    broker,
  ] = useMqttAutoConnect()

  const online = (
    status === 'online'
  )

  return (
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
            {defaultCode}
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
          <When condition={online}>
            <Status status={status} />
          </When>

          <Button text="Copy" icon={ClipboardIcon} />
          <Button text="Paste" icon={ArrowCircleDownIcon} />
          <Button text="Force Send" icon={SortAscendingIcon} />
        </div>
      </div>

      <div className="relative h-full flex-grow mx-8 mb-8">
        <When condition={!online}>
          <div className="w-full h-full flex items-center justify-center absolute rounded-lg bg-gray-200">
            <Status status={status} color="text-gray-500" />
          </div>
        </When>

        <div
          className="p-8 bg-white h-full resize-none rounded-lg border-2 border-gray-200 outline-none selection-black-white"
          contentEditable={true}
          suppressContentEditableWarning={true}>
          hello world link hey
        </div>
      </div>
    </div>
  )
}

export default function Home(props: Props) {
  return (
    <React.Fragment>
      <Head />
      <HomeComponent {...props} />
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  // Generate the default code if one wasn't found.
  const words = rword.generate(4) as string[]

  // Props for render.
  const props: Props = {
    defaultCode: words.join(' '),
  }

  return {
    props,
  }
}
