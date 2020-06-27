const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db/db.json');
const db = low(adapter);

function getAnswers(req, res) {
    res.send(db.get('answers'));
}

module.exports = getAnswers;
