async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllSpsWithSlug() {
  const data = fetchAPI(`
    {
      sps {
        slug
      }
    }
  `)
  return data?.allSps
}

export async function getAllSpsForHome() {
  const data = await fetchAPI(
    `
    query Sps($where: JSON){
      sps(sort: "date:desc", limit: 10, where: $where) {
        title
        slug
        order_date
      }
    }
  `
  )
  return data?.sps
}

export async function getSp(slug) {
  const data = await fetchAPI(
    `
  query SpBySlug($where: JSON) {
    sps(where: $where) {
      title
      slug
      content
      order_date
    }
  }
  `
  )
  return data
}
