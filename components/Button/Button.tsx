import classes from 'classnames'

interface Props {
  text?: string
  icon?: any
  color?: string
  onClick?: (() => void)
}

/*
  Button that adds the default behavior to the button.
*/
export default function Button(props: Props = {}) {
  const {
    icon: Icon = null,
    text = null,
    color = 'text-gray-400',
    onClick,
  } = props

  return (
    <button className={classes('flex items-center gap-x-2 hover:text-black', color)} onClick={onClick}>
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
