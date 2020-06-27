function transformSurveys(surveys) {
    return surveys.groupBy((survey) => survey.email).value();
}

function validateSurvey(survey) {
    const requiredFields = ['email', 'answer'];

    const missingFields = requiredFields.filter((fld) => !survey.hasOwnProperty(fld));

    if (missingFields.length > 0) {
        return missingFields.join(', ') + ' not specified';
    }

    // check email
    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailCheck.test(String(survey.email).toLowerCase())) {
        return 'email invalid';
    }

    // all ok
    return '';
}

module.exports = { transformSurveys, validateSurvey };
