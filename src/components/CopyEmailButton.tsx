import { useState } from 'react';

/**
 * React island example — interactive components hydrate with a `client:*`
 * directive (see contact.astro). Future dataviz components follow this pattern.
 */
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className="btn" onClick={copy} data-testid="copy-email">
      {copied ? 'Copied!' : 'Copy email'}
    </button>
  );
}
