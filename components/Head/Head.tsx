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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Orienta&display=swap" rel="stylesheet" />
    </Head>
  )
}
