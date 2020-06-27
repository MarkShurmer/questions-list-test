const { SURVEYS } = require('./constants');
const { transformSurveys, validateSurvey } = require('./survey-adjunct');
const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');

describe('Survey adjunct', () => {
    describe('transform surveys', () => {
        let db;

        beforeEach(() => {
            db = low(new Memory());
            db.defaults({ surveys: [] }).write(); // default data
        });

        it('should give empty when empty', () => {
            // action
            const result = transformSurveys(db.get(SURVEYS));

            // verify
            expect(result).toEqual({});
        });

        it('should group one if given one', () => {
            // setup
            db.get(SURVEYS).push({ email: 'h@h.com', comment: 'Superstar', answer: 'Didier Drogba' }).write();

            // action
            const result = transformSurveys(db.get(SURVEYS));

            // verify
            expect(result).toEqual({
                'h@h.com': [{ answer: 'Didier Drogba', comment: 'Superstar', email: 'h@h.com' }],
            });
        });

        it('should group answers together ', () => {
            // setup
            db.get(SURVEYS)
                .push(
                    { email: 'h@h.com', comment: 'Superstar', answer: 'Didier Drogba' },
                    { email: 'h@h.com', comment: 'Class act', answer: 'Dennis Bergkamp' },
                )
                .write();

            // action
            const result = transformSurveys(db.get(SURVEYS));

            // verify
            expect(result).toEqual({
                'h@h.com': [
                    { answer: 'Didier Drogba', comment: 'Superstar', email: 'h@h.com' },
                    { answer: 'Dennis Bergkamp', comment: 'Class act', email: 'h@h.com' },
                ],
            });
        });

        it('should group answers together with multiple emails', () => {
            // setup
            db.get(SURVEYS)
                .push(
                    { email: 'h@h.com', comment: 'Superstar', answer: 'Didier Drogba' },
                    { email: 'g@g.com', comment: 'Clinical', answer: 'Alan Shearer' },
                    { email: 'h@h.com', comment: 'Class act', answer: 'Dennis Bergkamp' },
                )
                .write();

            // action
            const result = transformSurveys(db.get(SURVEYS));

            // verify
            expect(result).toEqual({
                'g@g.com': [{ answer: 'Alan Shearer', comment: 'Clinical', email: 'g@g.com' }],
                'h@h.com': [
                    { answer: 'Didier Drogba', comment: 'Superstar', email: 'h@h.com' },
                    { answer: 'Dennis Bergkamp', comment: 'Class act', email: 'h@h.com' },
                ],
            });
        });
    });

    describe('validate survey', () => {
        it('should give an error if fields not there', () => {
            // action
            const result = validateSurvey({});

            // verify
            expect(result).toBe('email, answer not specified');
        });

        it('should give an error if field not there', () => {
            // action
            const result = validateSurvey({ email: 'h@h.com', comment: 'hhh' });

            // verify
            expect(result).toBe('answer not specified');
        });

        it('should give an error if field not there', () => {
            // action
            const result = validateSurvey({ answer: 'Frank Lampard', comment: 'hhh' });

            // verify
            expect(result).toBe('email not specified');
        });

        it('should give an error if email not valid', () => {
            // action
            const result = validateSurvey({ email: 'hkh.com', answer: 'Frank Lampard', comment: 'Best midfielder' });

            // verify
            expect(result).toBe('email invalid');
        });

        it('should give no error if everything valid', () => {
            // action
            const result = validateSurvey({ email: 'h@h.com', answer: 'Frank Lampard', comment: 'Best midfielder' });

            // verify
            expect(result).toBe('');
        });
    });
});
