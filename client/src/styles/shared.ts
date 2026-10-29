import { Link } from 'react-router';
import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

export const Skeleton = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${(p) => p.$width ?? '100%'};
  height: ${(p) => p.$height ?? '1em'};
  border-radius: ${(p) => p.$radius ?? '6px'};
  background: linear-gradient(90deg, var(--surface) 25%, var(--surface-raised) 50%, var(--surface) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s linear infinite;
`;

export const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Chip = styled.li`
  padding: 3px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  font-size: 0.8125rem;
`;

export const RatedBadge = styled.span`
  padding: 1px 7px;
  border: 1px solid var(--text-muted);
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  white-space: nowrap;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border: 0;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;

  &:active {
    transform: scale(0.97);
  }
`;

export const PrimaryButton = styled(Link)`
  ${buttonBase}
  background: var(--accent);
  color: #fff;

  &:hover {
    background: var(--accent-hover);
  }
`;

export const RetryButton = styled.button`
  ${buttonBase}
  margin-top: 8px;
  background: var(--accent);
  color: #fff;

  &:hover {
    background: var(--accent-hover);
  }
`;

export const SecondaryButton = styled(Link)`
  ${buttonBase}
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const PageContainer = styled.div`
  padding: calc(var(--header-height) + 32px) var(--gutter) 64px;
`;
