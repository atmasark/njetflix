import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Bar = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: clamp(20px, 4vw, 48px);
  height: var(--header-height);
  padding: 0 var(--gutter);
  border-bottom: 1px solid ${(p) => (p.$scrolled ? 'var(--border)' : 'transparent')};
  background: ${(p) => (p.$scrolled
    ? 'rgba(12, 12, 16, 0.86)'
    : 'linear-gradient(180deg, rgba(0, 0, 0, 0.75), transparent)')};
  backdrop-filter: ${(p) => (p.$scrolled ? 'blur(14px)' : 'none')};
  transition: background 0.3s, border-color 0.3s;
`;

const Logo = styled.img`
  width: clamp(96px, 14vw, 132px);
  height: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: clamp(16px, 3vw, 32px);
`;

const NavItem = styled(NavLink)`
  position: relative;
  padding: 6px 0;
  color: var(--text-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 2px;
    border-radius: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }

  &:hover,
  &.active {
    color: var(--text);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Bar $scrolled={scrolled}>
      <Link to="/" aria-label="Njetflix home">
        <Logo src={logo} alt="Njetflix" width={132} height={35} />
      </Link>
      <Nav aria-label="Main">
        <NavItem to="/" end>By genre</NavItem>
        <NavItem to="/all">All movies</NavItem>
      </Nav>
    </Bar>
  );
}
