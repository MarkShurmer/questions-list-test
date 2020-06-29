import React, { useEffect } from 'react';
import { SurveyModel, SurveyResult } from '../survey-model';
import './SurveyList.scss';

const SurveyList = () => {
    const [surveys, setSurveys] = React.useState<SurveyResult>();
    const [error, setError] = React.useState<string>();

    useEffect(() => {
        fetch('http://localhost:3000/surveys')
            .then((resp) => resp.json())
            .then((data: SurveyResult) => {
                // transform data to tree format for component
                setSurveys(data);
            })
            .catch((err) => {
                console.log(err);
                setError('There was a problem loading the surveys');
            });
    }, []);

    const renderAnswerCell = (row: SurveyModel) => {
        return (
            <div className="result-block">
                <span className="result">{row.answer}</span>
                <span className="result">{row.comments}</span>
            </div>
        );
    };

    return (
        <div role="survey-list">
            <h2>Results</h2>

            {surveys && (
                <ul key="outer" className="parent">
                    {Object.entries(surveys).map((survey) => (
                        <li key={survey[0]}>
                            {survey[0]}
                            <ul key="inner" className="parent">
                                {survey[1].map((result, index) => (
                                    <li key={index}>{renderAnswerCell(result)}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SurveyList;
