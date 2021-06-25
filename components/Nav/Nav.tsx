interface Props {
  children: JSX.Element[]
}

/*
  Renders a navigation element for the page.
*/
export default function Nav(props: Props) {
  const {
    children,
  } = props

  return (
    <div className="flex-none bg-white border-b-2 border-gray-200">
      <nav className="px-16 flex justify-between items-center">
        {children}
      </nav>
    </div>
  )
}
