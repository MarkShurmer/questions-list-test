import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
    beforeAll(() => {
        window.fetch = jest.fn().mockResolvedValue({ json: () => [] });
    });

    it('should default to displaying edit page', async () => {
        // setup
        await act(async () => {
            render(<App />);
        });

        // verify
        expect(await screen.getByRole('form')).toBeInTheDocument();
    });

    it('should change to displaying list page', async () => {
        // setup
        await act(async () => {
            render(<App />);
        });

        // action
        await act(async () => {
            fireEvent.click(screen.getByText('Results'));
        });

        // verify
        const resultComponent = await screen.getByRole('survey-list');
        expect(resultComponent).toBeDefined();
    });
});
