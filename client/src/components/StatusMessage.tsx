import type { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 480px;
  margin: 0 auto;
  padding: 64px 16px;
  text-align: center;
`;

const Emoji = styled.p`
  font-size: 3rem;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 1.375rem;
  font-weight: 600;
`;

const Body = styled.p`
  color: var(--text-muted);
`;

export default function StatusMessage({
  emoji, title, children, action,
}: {
  emoji: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Wrapper role="status">
      <Emoji aria-hidden>{emoji}</Emoji>
      <Title>{title}</Title>
      {children && <Body>{children}</Body>}
      {action}
    </Wrapper>
  );
}
