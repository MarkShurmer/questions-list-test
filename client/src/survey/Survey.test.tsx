import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import Survey from './Survey';

describe('Survey', () => {
    beforeAll(() => {
        window.fetch = jest.fn().mockResolvedValue({ json: () => ['Beth England'] });
    });

    it('should load answers', async () => {
        // action
        render(<Survey />);
        const options = await screen.findAllByText('Beth England');

        // verify
        expect(options.length).toBe(1);
    });

    it('should set error for answer', async () => {
        // action
        let error;
        render(<Survey />);
        await act(async () => {
            fireEvent.click(screen.getByText('Save'));
        });

        error = await screen.getByText('answer needs to be picked');

        // verify
        expect(error).toBeDefined();
    });

    it('should set error', async () => {
        // action
        let error;
        render(<Survey />);

        // set the answer
        await fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Didier Drogba' } });

        await act(async () => {
            await fireEvent.click(screen.getByText('Save'));
        });

        error = await screen.getByText('email needs to be picked');

        // verify
        expect(error).toBeDefined();
    });
});
