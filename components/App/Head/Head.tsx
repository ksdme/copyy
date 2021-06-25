import Head from 'next/head'

interface Props {
  title?: string
}

/*
  Application level Head with the sane defaults.
*/
export default function AppHead(props: Props = {}) {
  const {
    title = 'Text Copy',
  } = props

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
