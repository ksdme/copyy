import classes from 'classnames'

interface Props {
  text?: string
  icon?: any
  color?: string
  className?: string
  onClick?: (() => void)
  title?: string
}

/*
  Button that adds the default behavior to the button.
*/
export default function Button(props: Props = {}) {
  const {
    icon: Icon = null,
    text = null,
    color = 'text-gray-400',
    className,
    onClick,
    title,
  } = props

  return (
    <button
      className={classes('flex items-center gap-x-2 hover:text-black', color, className)}
      onClick={onClick}
      title={title}>
      {
        Icon
          ? <Icon className="w-4 h-4" />
          : null
      }
      {
        text
          ? text
          : null
      }
    </button>
  )
}
