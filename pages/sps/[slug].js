import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import SpBody from '@/components/sp-body'
import Layout from '@/components/layout'
import { getAllSpsWithSlug, getSp } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

export default function Sp({ sp }) {
  const router = useRouter()
  if (!router.isFallback && !sp?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Head>
              <title>
                {sp.title} | By {CMS_NAME}
              </title>
            </Head>
            <SpBody content={sp.content} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getSp(params.slug)
  const content = await markdownToHtml(data?.sps[0]?.content || '')

  return {
    props: {
      sp: {
        ...data?.sps[0],
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const allSps = await getAllSpsWithSlug()
  return {
    paths: allSps?.map((sp) => `/sps/${sp.slug}`) || [],
    fallback: true,
  }
}
