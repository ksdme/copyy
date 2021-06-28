import mqtt from 'mqtt'
import random from 'random'
import { useEffect, useState } from 'react'

// Application level state of the connection to the broker.
export type Status = 'offline' | 'online' | 'connecting' | 'error'

/*
  Represents a message on the broker.
*/
interface Message {
  id?: number
  text: string
  receivedAt: Date
}

const _identifier = random.int(
  Math.pow(10, 8),
  Math.pow(10, 16),
)

/*
  Return the Client ID for the MQTT.
*/
export const useClientID = () => [
  _identifier,
]

/*
  Hook that you can use to get the current connection to the broker,
  the current state of the connection and also a method to request a
  connection.
*/
export default function useMqtt(broker = 'ws://broker.hivemq.com:8000/mqtt') {
  const [
    client,
    setClient,
  ] = useState<mqtt.Client>(null)

  const [
    status,
    setStatus,
  ] = useState<Status>('connecting')

  /*
    Connect to the broker and hook into the lifecycle to update the
    application state.
  */
  const connect = () => {
    const client = mqtt.connect(broker)

    // Record the error if any occours.
    client.on('error', (error) => {
      console.error(error)
      setStatus('error')
    })

    // Hook events and update the application state accordingly.
    client.on('close', () => setStatus('offline'))
    client.on('connect', () => setStatus('online'))
    client.on('disconnect', () => setStatus('offline'))
    client.on('offline', () => setStatus('offline'))
    client.on('reconnect', () => setStatus('connecting'))

    // Save the client.
    setClient(client)
  }

  return {
    status,
    client,
    connect,
  }
}

/*
  Generate topic for the code with a fallback.
*/
export function useTopic(code: string) {
  return `text-copy/Ve5Z96/hello-world-harry-potter`
  code = code?.replaceAll(' ', '') ?? 'global'
  return `text-copy/Ve5Z96/${code}`  
}

/*
  Runs a callback when the latest message was changed while also
  returning the latest message.
*/
export function useWithLatestMessage(client: mqtt.Client, topic: string, callback?: ((message: Message) => void)) {
  const [
    latestMessage,
    setLatestMessage,
  ] = useState<Message>(null)

  const [
    identifier,
  ] = useClientID()

  // Subscribe to the topic.
  useEffect(() => {
    if (client === null) {
      return
    }

    // TODO: This could run multiple times.
    // Subscribe to the topic.
    client.subscribe(topic, {
      qos: 2,
      nl: true,
    })

    // Keep track of the latest message on the topic.
    client.on('message', (incomingTopic, payload, packet) => {
      if (incomingTopic !== topic) {
        return
      }

      if (packet.dup ?? false) {
        return
      }

      // Parse the incoming message on the broker.
      const {
        message,
        identifier: sender,
      } = JSON.parse(payload.toString())

      // If the sender of the message isn't the current user, don't
      // process the message.
      if (sender !== identifier) {
        setLatestMessage({
          id: packet.messageId,
          text: message,
          receivedAt: new Date(),
        })
      }
    })
  }, [client])

  // Invoke callback when the latest message is changed.
  useEffect(() => {
    if (callback) {
      callback(latestMessage)
    }
  }, [latestMessage])

  return {
    message: latestMessage,
  }
}

/*
  Utility hook that automatically connects to the broker.
*/
export function useMqttAutoConnect() {
  const {
    status,
    client,
    connect,
   } = useMqtt()

  useEffect(() => {
    if (client === null) {
      connect()
    }
  }, [])

  return {
    status,
    client,
  }
}

/*
  Hook that returns a publisher method that can be used to publish
  to a topic and also returns the current publishing status.
*/
export function useTopicPublish(client: mqtt.Client, topic: string) {
  const [
    publishing,
    setPublishing,
  ] = useState<boolean>(false)

  const [
    identifier,
  ] = useClientID()

  // Method that publishes to a topic.
  const publisher = (message: string) => {
    if (client === null) {
      return
    }

    if (!message) {
      return
    }

    // Set the publishing flag.
    setPublishing(true)

    // Generate the payload for the wire.
    const payload = JSON.stringify({
      identifier,
      message,
    })

    // Publish the message and update flag.
    client.publish(topic, payload, () => {
      setPublishing(false)
    })
  }

  return {
    publisher,
    publishing,
  }
}
