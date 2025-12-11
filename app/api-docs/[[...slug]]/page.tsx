import { redirect, notFound } from 'next/navigation'
import ApiDocsClient from '../../../components/ApiDocsClient'

const VALID_SLUGS = ['valid-jolli-api-yaml', 'valid-pet-store-api-yaml', 'valid-jolli-api-json', 'valid-pet-store-api-json']

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['valid-jolli-api-yaml'] },
    { slug: ['valid-pet-store-api-yaml'] },
    { slug: ['valid-jolli-api-json'] },
    { slug: ['valid-pet-store-api-json'] }
  ]
}

export default async function ApiDocsPage(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slugArray = params.slug || []

  // No slug provided - redirect to first API doc
  if (slugArray.length === 0) {
    redirect('/api-docs/valid-jolli-api-yaml')
  }

  const slug = slugArray[0]

  // Invalid slug - return 404
  if (!VALID_SLUGS.includes(slug)) {
    notFound()
  }

  return <ApiDocsClient slug={slug} />
}
