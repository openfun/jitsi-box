import React from 'react';
import { render, screen } from '@testing-library/react';
<<<<<<< HEAD:box-ui/src/components/JitsiComponent.test.tsx
import JitsiComponent from './JitsiComponent';

test('renders learn react link', () => {
    render(<JitsiComponent />);
=======
import HeaderComponent from '../ts/HeaderComponent';

test('renders learn react link', () => {
    render(<HeaderComponent returnDisplayed={true} marshaDisplayed={true} />);
>>>>>>> 0501649 (Creating folders ts/css/tests in components):box-ui/src/components/tests/HeaderComponent.test.tsx
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
