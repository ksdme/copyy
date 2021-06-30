import {
  ArrowCircleDownIcon,
  CheckCircleIcon,
  ClipboardIcon,
  SortAscendingIcon,
} from '@heroicons/react/outline'
import {
  LinkIcon,
} from '@heroicons/react/solid'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React, { useRef } from 'react'
import { useState } from 'react'
import { When } from 'react-if'
import Button from '../components/Button/Button'
import LabelStateButton from '../components/Button/LabelStateButton'
import Head from '../components/Head/Head'
import Modal from '../components/Modal/Modal'
import Nav from '../components/Nav/Nav'
import Status from '../components/Status/Status'
import { toDisplayCode, toUrlCode } from '../hooks/useCode'
import useContentEditable from '../hooks/useContentEditable'
import {
  useMqttAutoConnect,
  useTopic,
  useTopicPublish,
  useWithLatestMessage,
} from '../hooks/useMqtt'

export interface Props {
  code?: string
}

function HomeComponent(props: Props) {
  const {
    code,
  } = props

  // Pair modal.
  const [
    modal,
    setModal,
  ] = useState(false)

  // Establish a connection to the broker on
  // application bootup.
  const {
    client,
    status,
  } = useMqttAutoConnect()

  const topic = useTopic(
    'hello world harry potter',
  )

  // Reference to the editor
  const ref = useRef<HTMLDivElement>(
    null,
  )

  // Publishers for the topic.
  const {
    publisher,
    publishing,
  } = useTopicPublish(client, topic)

  // Publish the content on the board.
  const publish = () => {
    if (ref?.current) {
      publisher(ref?.current.innerText)
    }
  }

  // Hook up the transformer for the editor and callback when
  // the input is processed if available.
  const {
    onInput,
    updateEditableContent,
  } = useContentEditable(ref, publish)

  // Update the content when you receieve a message.
  useWithLatestMessage(client, topic, (message) => {
    if (message) {
      updateEditableContent(message.text)
    }
  })

  // Is online.
  const online = (
    status === 'online'
  )

  // Copy current board to Clipboard
  const copy = () => {
    if (ref?.current) {
      return navigator?.clipboard?.writeText(
        ref.current.innerText,
      )
    }
  }

  // Paste value from Clipboard to board
  const paste = async () => {
    // Get value on the Clipboard.
    const text = await navigator
      ?.clipboard
      ?.readText()

    if (text === null) {
      return
    }

    if (ref?.current) {
      updateEditableContent(text)
      publisher(text)
    }
  }

  // Change the page to the new code.
  const onChangeCode = (code: string) => {
    window.location.replace(`/${toUrlCode(code)}`)
  }

  return (
    <React.Fragment>
      <Modal
        open={modal}
        setOpen={setModal}
        onSubmit={onChangeCode} />

      <div className="h-screen flex flex-col gap-y-8 font-orienta bg-gray-100">
        <Nav>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 py-6">
            <div className="flex">
              <div className="sm:py-6">
                <Link href="/" shallow>
                  <a className="font-bold tracking-wide text-gray-400 hover:text-blue-600 sm:text-gray-800">
                    copyy
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center text-gray-600 cursor-pointer hover:text-black tracking-wide font-medium gap-x-2">
              {code}
            </div>

            <div className="flex items-center justify-end tracking-wide font-medium gap-x-4">
              <Button
                text="Pair"
                icon={LinkIcon}
                onClick={() => setModal(!modal)} />
            </div>
          </div>
        </Nav>

        <div className="grid grid-cols-1 sm:grid-cols-3 px-8 overflow-x-scroll">
          <div className="col-start-3 flex justify-end items-center gap-x-10">
            <When condition={online}>
              <Status status={status} publishing={publishing} />
            </When>

            <LabelStateButton
              idle={{
                label: 'Copy',
                icon: ClipboardIcon,
              }}
              complete={{
                label: 'Copied',
                icon: CheckCircleIcon,
                color: 'text-black',
              }}
              onClick={copy}
              title="Copy" />

            <LabelStateButton
              idle={{
                label: 'Paste',
                icon: ArrowCircleDownIcon,
              }}
              complete={{
                label: 'Pasted',
                icon: CheckCircleIcon,
                color: 'text-black',
              }}
              onClick={paste}
              title="Paste" />

            <LabelStateButton
              idle={{
                label: 'Force Send',
                icon: SortAscendingIcon,
              }}
              complete={{
                label: 'Sent',
                icon: CheckCircleIcon,
                color: 'text-black',
              }}
              onClick={publish}
              title="Force Send" />
          </div>
        </div>

        <div className="relative h-full flex-grow mx-8 mb-8">
          <When condition={!online}>
            <div className="w-full h-full flex items-center justify-center absolute rounded-lg bg-gray-100">
              <Status status={status} publishing={publishing} color="text-gray-500" />
            </div>
          </When>

          <div
            className="p-8 bg-white h-full resize-none rounded-lg border-2 border-gray-200 outline-none selection-black-white"
            ref={ref}
            onInput={onInput}
            contentEditable={true}
            suppressContentEditableWarning={true}
            placeholder="Your Paste">
          </div>
        </div>
      </div>
    </React.Fragment>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let {
    code,
  } = context.params

  const props: Props = {
    code: toDisplayCode(code as string),
  }

  return {
    props,
  }
}