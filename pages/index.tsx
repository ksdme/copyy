import Home, { Props } from './[code]'
import { GetServerSidePropsContext } from 'next'
import { generateCode } from '../hooks/useCode'

// Use Home
export default Home

interface ServerSideProps {
  props: Props
}

// Default to using a random code.
export async function getServerSideProps(_: GetServerSidePropsContext): Promise<ServerSideProps> {
  return {
    props: {
      defaultCode: generateCode(),
    },
  }
}
