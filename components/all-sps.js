import SpPreview from './sp-preview'

export default function AllSps({ sps }) {
  return (
    <section>
      <h2 className="mb-8 text-4xl font-bold tracking-tighter leading-tight">
        All Sps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {sps.map((sp) => (
          <SpPreview
            key={sp.slug}
            title={sp.title}
            order_date={sp.order_date}
            slug={sp.slug}
          />
        ))}
      </div>
    </section>
  )
}
