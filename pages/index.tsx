import Home, { Props } from './[code]'
import { GetServerSidePropsContext } from 'next'
import { generateCode } from '../hooks/useCode'

// Use Home
export default Home

// Default to using a random code.
export async function getServerSideProps(_: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: generateCode(),
      permanent: false,
    },
  }
}
