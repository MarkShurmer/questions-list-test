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
});
