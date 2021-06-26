import {
  ExclamationCircleIcon,
  StatusOfflineIcon,
  StatusOnlineIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline'
import { Status as MqttStatus } from '../../hooks/useMqtt'
import Button from '../Button/Button'

interface Props {
  status: MqttStatus
}

/*
  Indicates the state of the application.
*/
export default function Status(props: Props) {
  const {
    status,
  } = props

  let message = 'Unknown'
  let pulsate = false
  let icon = null

  switch (status) {
    case 'online': {
      message = 'Online'
      icon = StatusOnlineIcon
      break
    }

    case 'offline': {
      message = 'Offline'
      icon = StatusOfflineIcon
      break
    }

    case 'connecting': {
      message = 'Connecting'
      icon = SwitchVerticalIcon
      pulsate = true
      break
    }

    case 'error': {
      message = 'Connection Failed'
      icon = ExclamationCircleIcon
      break
    }

    default: {
      message = 'Unknown'
      icon = null
    }
  }

  return (
    <Button
      icon={icon}
      text={message}
      className={pulsate ? 'animate-pulse' : null}
      color="text-gray-400"
      title="Connection Status" />
  )
}
