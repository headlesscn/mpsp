import Date from './date'
import Link from 'next/link'

export default function SpPreview({
  title,
  order_date,
  slug,
}) {
  return (
    <div className="grid grid-cols-2">
      <h3 className="text-lg mb-2">
        <Link as={`/sps/${slug}`} href="/sps/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">
        <Date dateString={order_date} />
      </div>
    </div>
  )
}
