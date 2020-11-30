import Container from '@/components/container'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import AllSps from '@/components/all-sps'
import { getAllSpsForHome } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'

export default function Index({ allSps }) {
  return (
    <>
      <Layout>
        <Head>
          <title>SP Manager By {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {allSps.length > 0 
          && <AllSps sps={allSps} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allSps = (await getAllSpsForHome()) || []
  return {
    props: { allSps },
  }
}
