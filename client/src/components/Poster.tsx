import { useState } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background: var(--surface);
`;

const Fallback = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 2 / 3;
  padding: 16px;
  background: linear-gradient(160deg, var(--surface-raised), var(--surface));
  color: var(--text-muted);
  font-weight: 600;
  text-align: center;
`;

// Movie poster that falls back to the title when the image is missing or fails to load
export default function Poster({ src, title, className, eager = false }: {
  src: string;
  title: string;
  className?: string;
  eager?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || src === 'N/A' || failedSrc === src) {
    return <Fallback className={className} role="img" aria-label={`${title} poster`}>{title}</Fallback>;
  }
  return (
    <Image
      className={className}
      src={src}
      alt={`${title} poster`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );
}
