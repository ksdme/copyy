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
import { useCookie } from 'next-cookie'
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
    if (code) {
      // normalize the case of the code.
      code = code.toLowerCase()

      // Generate the url code and redirect the page.
      window.location.replace(`/${toUrlCode(code)}`)
    }
  }

  return (
    <React.Fragment>
      <Modal
        open={modal}
        setOpen={setModal}
        onSubmit={onChangeCode} />

      <div className="h-screen flex flex-col gap-y-6 sm:gap-y-8 font-orienta bg-gray-100">
        <Nav>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 py-6 sm:py-0">
            <div className="flex">
              <div className="sm:py-6">
                <Link href="/" shallow>
                  <a className="font-bold tracking-wide text-gray-400 hover:text-blue-600 sm:text-gray-800">
                    Copyy
                  </a>
                </Link>
              </div>
            </div>

            <a href="/?force=1" className="flex items-center justify-center text-gray-600 cursor-pointer hover:text-black tracking-wide font-medium">
              {code}
            </a>

            <div className="flex items-center justify-end tracking-wide font-medium gap-x-4">
              <Button
                text="Pair"
                icon={LinkIcon}
                onClick={() => setModal(!modal)}
                color="text-gray-600" />
            </div>
          </div>
        </Nav>

        <div className="grid grid-cols-1 sm:grid-cols-3 px-4 sm:px-8 overflow-none">
          <div className="sm:col-start-3 flex justify-center sm:justify-end items-center gap-x-10 overflow-none">
            <When condition={online}>
              <div className="hidden sm:block">
                <Status status={status} publishing={publishing} />
              </div>
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

        <div className="relative h-full flex-grow mx-4 sm:mx-8 mb-4 sm:mb-8">
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
            placeholder="Paste your content here to sync it with the other copyy instance">
          </div>
        </div>
      </div>

      <footer className="flex justify-between px-4 sm:px-8 py-12 font-orienta text-gray-400 bg-gray-100">
        <p><a href="https://github.com/ksdme/copyy" target="_blank">github</a></p>
        <p>a <a className="text-blue-500" href="https://twitter.com/ksdme" target="_blank">@ksdme</a> production</p>
      </footer>
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

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Props }> {
  let {
    code,
  } = context.params

  // Get the cookies from the context.
  const cookie = useCookie(context)

  // Save the code in the cookie.
  cookie.set('pairing-code', code, {
    maxAge: 2592000,
  })

  return {
    props: {
      code: toDisplayCode(code as string),
    },
  }
}
