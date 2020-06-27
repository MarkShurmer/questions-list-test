const { getSurveys, addSurvey } = require('./survey');
const getAnswers = require('./answers');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Alive'));
app.get('/answers', getAnswers);
app.get('/surveys', getSurveys);
app.post('/survey', addSurvey);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
