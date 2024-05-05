import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchMetadata } from 'frames.js/next'
import { headers } from 'next/headers'

const DEFAULT_DEBUGGER_URL =
  process.env.DEBUGGER_URL ?? 'http://localhost:3010/'

export const DEFAULT_DEBUGGER_HUB_URL =
  process.env.NODE_ENV === 'development'
    ? new URL('/hub', DEFAULT_DEBUGGER_URL).toString()
    : undefined

export function createDebugUrl(frameURL: string | URL): string {
  try {
    const url = new URL('/', DEFAULT_DEBUGGER_URL)

    url.searchParams.set('url', frameURL.toString())

    return url.toString()
  } catch (error) {
    return '#'
  }
}

export function currentURL(pathname: string): URL {
  const headersList = headers()
  const host = headersList.get('x-forwarded-host') || headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'

  try {
    return new URL(pathname, `${protocol}://${host}`)
  } catch (error) {
    return new URL('http://localhost:3000')
  }
}

export function appURL() {
  if (process.env.APP_URL) {
    return process.env.APP_URL
  } else {
    const url = process.env.APP_URL || vercelURL() || 'http://localhost:3000'
    console.warn(
      `Warning: APP_URL environment variable is not set. Falling back to ${url}.`,
    )
    return url
  }
}

export function vercelURL() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'New api example',
    description: 'This is a new api example',
    other: {
      ...(await fetchMetadata(
        new URL('/examples/new-api-transaction/frames', appURL()),
      )),
    },
  }
}

export default async function Home() {
  const url = currentURL('/examples/new-api-transaction')

  return (
    <div>
      Rent farcaster storage example{' '}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  )
}
