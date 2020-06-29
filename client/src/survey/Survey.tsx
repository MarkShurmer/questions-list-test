import React, { MouseEvent, ChangeEvent } from 'react';
import './Survey.scss';

const Survey = () => {
    const [answers, setAnswers] = React.useState([]);
    const [error, setError] = React.useState<string>();
    const [email, setEmail] = React.useState<string>('');
    const [answer, setAnswer] = React.useState<string>('');
    const [comments, setComments] = React.useState<string>('');
    const [isSaving, setIsSaving] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetch('http://localhost:3000/answers')
            .then((resp) => resp.json())
            .then((data) => {
                setAnswers(data);
            })
            .catch((err) => {
                console.log(err);
                setError('There was a problem loading the answers');
            });
    }, []);

    const saveSurvey = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // validate
        if (answer.trim().length === 0) {
            setError('answer needs to be picked');
            return;
        }
        if (email.trim().length === 0) {
            setError('email needs to be picked');
            return;
        }

        const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailCheck.test(String(email).toLowerCase())) {
            setError('email invalid');
            return;
        }

        setIsSaving(true);
        fetch('http://localhost:3000/survey', {
            method: 'post',
            body: JSON.stringify({ answer, email, comments }),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            setIsSaving(false);
            // saved fine, so clear down
            setAnswer('');
            setEmail('');
            setComments('');
        });
    };

    const onChooseAnswer = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setAnswer(e.target.value);
        setError('');
    };

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.currentTarget.value);
        setError('');
    };

    const onChangeComments = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setComments(e.currentTarget.value);
        setError('');
    };

    const formClass = 'survey-form' + (isSaving ? ' .disabled' : '');

    return (
        <div role="form" className="container">
            <h2>Survey</h2>
            <p>Please choose the person that you think has been the best goal scorer in the premier league</p>
            <form className={formClass} aria-disabled={isSaving}>
                <label>*Who was the best goalscorer</label>
                <select className="entry" value={answer} onChange={onChooseAnswer}>
                    <option value="" key="none">
                        None selected
                    </option>
                    {answers.map((opt) => (
                        <option value={opt} key={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <label>*Please enter your email</label>
                <input className="entry" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                <label>Do you wish to add comments</label>
                <input className="entry" placeholder="Enter comments" onChange={onChangeComments} />
                <button className="entry" onClick={saveSurvey} disabled={isSaving}>
                    Save
                </button>
                {error && (
                    <div className="error" role="error">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Survey;
