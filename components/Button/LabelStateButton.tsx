import { useState } from 'react'
import Button from './Button'

interface Label {
  label: string
  icon: any
  color?: string
  pulsating?: boolean
}

interface Props {
  idle: Label
  active?: Label
  complete?: Label
  error?: Label
  onClick?: (() => Promise<void>)
  title?: string
  delay?: number
}

/*
  Button that can display the lable based on the state of the interaction.
  Also has an additional delay after completion.
*/
export default function LabelStateButton(props: Props) {
  const {
    idle,
    active,
    complete,
    error,
    onClick,
    title,
    delay = 1500,
  } = props

  const [
    state,
    setState,
  ] = useState(idle)

  // Handler when the button is clicked.
  const handler = async () => {
    // Set current state to active
    setState(active ?? idle)

    if (onClick) {
      try {
        // In case onClick was successful
        await onClick()
        setState(complete ?? idle)
      }
      catch (exception) {
        // In case onClick failed with an exception
        console.error(exception)
        setState(error ?? idle)
      }
    }
    else {
      // In case onClick is not available, just show the
      // completion message anyway.
      setState(complete ?? idle)
    }

    // Wait for the delay
    await new Promise((resolve) => setTimeout(
      resolve,
      delay,
    ))

    // Set current state to complete
    setState(idle)
  }

  return (
    <Button
      text={state.label}
      icon={state.icon}
      color={state.color}
      pulsating={state.pulsating}
      onClick={handler}
      title={title} />
  )
}
