import classes from 'classnames'

interface Props {
  text?: string
  icon?: any
  color?: string
  className?: string
  onClick?: (() => void)
  title?: string
  pulsating?: boolean
}

/*
  Button that adds the default behavior to the button.
*/
export default function Button(props: Props) {
  const {
    icon: Icon = null,
    text = null,
    color = 'text-gray-400',
    pulsating = false,
    className,
    onClick,
    title,
  } = props

  const conditionals = {
    'animate-pulse': pulsating,
  }

  const buttonClasses = classes(
    'flex items-center gap-x-2 hover:text-black',
    color,
    className,
    conditionals,
  )

  const textContent = Icon
    ? <Icon className="w-4 h-4" />
    : null

  const iconContent = text
    ? text
    : null

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      title={title}>
      <span>
        {textContent}
      </span>

      <span className="whitespace-nowrap">
        {iconContent}
      </span>
    </button>
  )
}
