import mqtt from 'mqtt'
import { useEffect, useState } from 'react'

// Application level state of the connection to the broker.
export type Status = 'offline' | 'online' | 'connecting' | 'error'

// Explicitly declare the types of the returned elements.
type UseConnectResult = [Status, mqtt.Client, (() => void)]

/*
  Hook that you can use to get the current connection to the broker,
  the current state of the connection and also a method to request a
  connection.
*/
export default function useMqtt(broker = 'ws://broker.hivemq.com:8000/mqtt'): UseConnectResult {
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

    setClient(client)
  }

  return [
    status,
    client,
    connect,
  ]
}

/*
  Utility hook that automatically connects to the broker.
*/
export function useMqttAutoConnect(): [Status, mqtt.Client] {
  const [
    status,
    broker,
    connect,
  ] = useMqtt()

  useEffect(() => {
    if (broker === null) {
      connect()
    }
  }, [])

  return [
    status,
    broker,
  ]
}
