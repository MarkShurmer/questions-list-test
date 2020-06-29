import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import SurveyList from './SurveyList';

describe('SurveyList', () => {
    beforeAll(() => {
        window.fetch = jest
            .fn()
            .mockResolvedValue({ json: () => ({ 'h@h.com': [{ answer: 'abc', comments: 'hghghg kkkk' }] }) });
    });

    it('should load surveys', async () => {
        // action
        render(<SurveyList />);
        const options = await screen.findAllByText('abc');

        // verify
        expect(options.length).toBe(1);
    });
});
