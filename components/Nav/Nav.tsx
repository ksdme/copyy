interface Props {
  children: JSX.Element | JSX.Element[]
}

/*
  Renders a navigation element for the page.
*/
export default function Nav(props: Props) {
  const {
    children,
  } = props

  return (
    <nav className="flex-none px-4 sm:px-8 bg-white border-b-2 border-gray-200">
      {children}
    </nav>
  )
}
