import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// 1. Mock Framer Motion
vi.mock('framer-motion', () => {
  const createMockComponent = (Tag) => {
    const MockComponent = React.forwardRef(({ children, initial, animate, exit, transition, whileHover, whileTap, ...props }, ref) => (
      <Tag ref={ref} {...props}>
        {children}
      </Tag>
    ));
    MockComponent.displayName = `motion(${Tag})`;
    return MockComponent;
  };

  return {
    motion: {
      div: createMockComponent('div'),
      h1: createMockComponent('h1'),
      h2: createMockComponent('h2'),
      h3: createMockComponent('h3'),
      p: createMockComponent('p'),
      section: createMockComponent('section'),
      form: createMockComponent('form'),
      a: createMockComponent('a'),
      button: createMockComponent('button'),
      span: createMockComponent('span'),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
    useReducedMotion: () => false,
    useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
    useSpring: () => ({ set: vi.fn(), get: vi.fn() }),
  };
});

// 2. Mock Three.js / React Three Fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="mock-canvas">{children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ viewport: { width: 10, height: 10 } }),
}));

vi.mock('@react-three/drei', () => ({
  Text: ({ children }) => <div>{children}</div>,
  Float: ({ children }) => <div>{children}</div>,
  useGLTF: vi.fn(),
}));

// Components to test
import Hero from '../sections/Hero';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Skills from '../sections/Skills';

describe('Sections Smoke Tests', () => {
  it('Hero renders without crashing', () => {
    const { container } = render(<Hero />);
    expect(container).toBeInTheDocument();
  });

  it('About renders without crashing', () => {
    const { container } = render(<About />);
    expect(container).toBeInTheDocument();
  });

  it('Contact renders without crashing', () => {
    const { container } = render(<Contact />);
    expect(container).toBeInTheDocument();
  });

  it('Skills renders without crashing', () => {
    const { container } = render(<Skills />);
    expect(container).toBeInTheDocument();
  });
});
