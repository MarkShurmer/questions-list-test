import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
    it('should default to displaying edit page', async () => {
        // setup
        render(<App />);

        // verify
        const editComponent = await screen.getByRole('form');
        expect(editComponent).toBeDefined();
    });

    it('should change to displaying list page', async () => {
        // setup
        render(<App />);

        // action
        fireEvent.click(screen.getByText('Results'));

        // verify
        const resultComponent = await screen.getByRole('list');
        expect(resultComponent).toBeDefined();
    });
});
