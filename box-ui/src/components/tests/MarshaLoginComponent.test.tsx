import React from 'react';
import { render, screen } from '@testing-library/react';
<<<<<<< HEAD:box-ui/src/components/tests/MarshaLoginComponent.test.tsx
import MarshaLoginComponent from '../ts/MarshaLoginComponent';

test('renders learn react link', () => {
    render(<MarshaLoginComponent />);
=======
import HeaderComponent from '../ts/HeaderComponent';

test('renders learn react link', () => {
    render(<HeaderComponent returnDisplayed={true} marshaDisplayed={true} />);
>>>>>>> 11839a9a5a2037887734829fb3dda20d609bf789:box-ui/src/components/tests/HeaderComponent.test.tsx
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
