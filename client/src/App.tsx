import React, { useState } from 'react';
import SurveyList from './survey-list/SurveyList';
import Survey from './survey/Survey';
import './App.scss';

export const App = () => {
    const [isShowingEdit, setIsShowingEdit] = useState<Boolean>(true);

    const switchToSurvey = () => {
        setIsShowingEdit(true);
    };

    const switchToResults = () => {
        setIsShowingEdit(false);
    };

    return (
        <div className="app">
            <header className="app-header">
                <button className="app-menu-button" onClick={switchToSurvey}>
                    Survey
                </button>
                <button className="app-menu-button" onClick={switchToResults}>
                    Results
                </button>
                <h1>Premier league goal scorer survey</h1>
            </header>
            <section>
                <div>{isShowingEdit ? <Survey /> : <SurveyList />}</div>
            </section>
        </div>
    );
};
