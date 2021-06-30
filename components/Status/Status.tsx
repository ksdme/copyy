import {
  ExclamationCircleIcon,
  StatusOfflineIcon,
  StatusOnlineIcon,
  SwitchVerticalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { Status as MqttStatus } from '../../hooks/useMqtt'
import Button from '../Button/Button'

interface Props {
  status: MqttStatus
  publishing: boolean
  color?: string
}

/*
  Indicates the state of the application.
*/
export default function Status(props: Props) {
  const {
    status,
    publishing,
    color,
  } = props

  let message = 'Unknown'
  let pulsate = false
  let icon = null

  switch (status) {
    case 'online': {
      message = 'online'
      icon = StatusOnlineIcon
      break
    }

    case 'offline': {
      message = 'offline'
      icon = StatusOfflineIcon
      break
    }

    case 'connecting': {
      message = 'connecting'
      icon = SwitchVerticalIcon
      pulsate = true
      break
    }

    case 'error': {
      message = 'connection failed'
      icon = ExclamationCircleIcon
      break
    }

    default: {
      message = 'unknown'
      icon = null
    }
  }

  if (status === 'online' && publishing) {
    message = 'publishing'
    icon = UploadIcon
  }

  return (
    <Button
      icon={icon}
      text={message}
      className={pulsate ? 'animate-pulse' : null}
      color={color ?? 'text-gray-400'}
      title="Connection Status" />
  )
}
