export interface SurveyModel {
    email: string;
    answer: string;
    comments: string;
}

export interface SurveyResult {
    email: SurveyModel[];
}
