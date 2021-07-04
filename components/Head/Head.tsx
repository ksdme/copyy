import Head from 'next/head'

interface Props {
  title?: string
}

/*
  Application level Head with the sane defaults.
*/
export default function AppHead(props: Props = {}) {
  const {
    title = 'copyy • paste across devices',
  } = props

  return (
    <Head>
      <meta name="title" content={title} />
      <meta name="description" content="copy and paste text, or open links across your devices right from your browser." />
      <meta name="keywords" content="copy,paste,utility,productivity,text,editing,clipboard,share,real-time" />
      <meta name="robots" content="index, nofollow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Orienta&display=swap" rel="stylesheet" />

      <script defer data-domain="copyy.app" src="https://plausible.io/js/plausible.js"></script>
    </Head>
  )
}
