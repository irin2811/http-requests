const express = require('express');
const app = express();
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false })   

const host = '127.0.0.1';
const port = 7000;

app.listen(port, host, () => 
    console.log(`Server listens http://${host}:${port}`)
)
//создание JSON-массива с данными
let data = [
    {id: 1, user_name: 'Ira', user_age: '30', user_status: true},
    {id: 2, user_name: 'Peter', user_age: '55', user_status: true},
    {id: 3, user_name: 'Kate', user_age: '15', user_status: true},
];
//Get-запрос (получить все данные)
app.get('/', (req, res) => {
    res.status(200).json(data);
});
//Get-запрос (получить данные по id пользователя)
app.get('/:id', (req, res) => {
    let found = data.find(item => {
        return item.id === parseInt(req.params.id);
    });
    if(found) {
        res.status(200).json(found);
    } else {
        res.status(400).send({message: 'Bad request'});
    }
});
app.post('/', urlencodedParser, (req, res) => {
    let itemId = data.map(item => item.id);
    let newId = itemId.length > 0 ? Math.max.apply(Math, itemId) + 1 : 1;
    let newItem = {
        id: newId,
        user_name: req.body.user_name,
        user_age: req.body.user_age,
        user_status: true
    };
    if(data.push(newItem)) {
        res.status(200).json(newItem);
    } else {
        res.status(400).send({message: 'Bad request'});
    }
});
//Put-запрос (обновить данные пользователя)
app.put('/:id', urlencodedParser, (req, res) => {
    let found = data.find(item => {
        return item.id === parseInt(req.params.id);
    });
    if(found) {
        let updated = {
            id: found.id,
            user_name: req.body.user_name,
            user_age: req.body.user_age,
            user_status: true
        };
        let index = data.indexOf(found);
        data.splice(index, 1, updated);

        res.status(200).json(updated);
    } else {
        res.status(400).send({message: 'Bad request'});
    }
});
//Delete-запрос (удаление данных пользователя)
app.delete('/:id', (req, res) => {
    let found = data.find(item => {
        return item.id === parseInt(req.params.id);
    });
    if(found) {
        let index = data.indexOf(found);
        data.splice(index, 1);
        res.status(200).json(data);
    } else {
        res.status(400).send({message: 'Bad request'});
    }
});