import { headers } from 'next/headers';

/**
 * Renders a Schema.org JSON-LD <script> carrying the per-request CSP nonce,
 * so structured data is allowed by the strict Content-Security-Policy.
 * Server component — use anywhere in a page/layout tree.
 */
export default async function JsonLd({ data }: { data: object | object[] }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
