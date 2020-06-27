const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { transformSurveys, validateSurvey } = require('./survey-adjunct');
const { SURVEYS } = require('./constants');

const adapter = new FileSync('db/db.json');
const db = low(adapter);

function getSurveys(req, res) {
    // get the interchanges
    res.send(transformSurveys(db.get(SURVEYS)));
}

function addSurvey(req, res) {
    const error = validateSurvey(req.body);
    if (error.length > 0) {
        res.send(400, error);
        return;
    }

    try {
        // add the interchange to the array
        db.get('surveys').push(req.body).write();
        res.sendStatus(200);
    } catch (err) {
        res.send(500, 'Error saving survey');
    }
}

module.exports = { getSurveys, addSurvey };
