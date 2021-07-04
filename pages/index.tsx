import { GetServerSidePropsContext } from 'next'
import { useCookie } from 'next-cookie'
import { generateCode } from '../hooks/useCode'
import Home, { Props } from './[code]'

// Use Home
export default Home

// Default to using a random code.
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get the cookies from the context.
  const cookie = useCookie(context)

  // If the query has force in it, force generate new code.
  const forceGenerate = context.query?.force

  // Get code from the Cookie.
  const existingCode = cookie.get('pairing-code')

  // Code to be used now.
  const code = existingCode && !forceGenerate
    ? existingCode
    : generateCode()

  // Remember the pairing code.
  cookie.set('pairing-code', code, {
    maxAge: 2592000,
  })

  return {
    redirect: {
      destination: code,
      permanent: false,
    },
  }
}
