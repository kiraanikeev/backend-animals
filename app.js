const express = require('express');

const mongoose = require('mongoose');
const AnimalData = require('./models/animals');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json()); 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
app.get('/', (req, res) => {
    AnimalData.find({})
    .then((data) => {
        res.send(data);
    })
    .catch(() => res.status(500).send({ message: '500- Не удалось получить данные из базы данных. Произошла ошибка' })); 
})

app.post('/', (req, res) => {
    const {
        avatar,
        bio,
        firstName,
        id,
        lastName,
        title,
    } = req.body;
    AnimalData.create({ 
        avatar,
        bio,
        firstName,
        id,
        lastName,
        title,
    })
    .then((data) => {
        res.send(data);
    })
    .catch((err) => res.send({ message: 'Не удалось добавить животное' })); 
})

app.put('/:_id', (req, res) => {
    const {
        avatar,
        bio,
        firstName,
        id,
        lastName,
        title,
    } = req.body;
    const animalId = req.params._id
    AnimalData.findByIdAndUpdate(animalId, {
        avatar,
        bio,
        firstName,
        id,
        lastName,
        title,
    })
    .then((data) => {
        if(!data) {
            res.send('Животное с этим id не найдено')
        } else res.send(data)
    })
    .catch(err => res.send(err))

})

app.delete('/:_id', (req, res, next) => {
    AnimalData.findById(req.params._id)
    .then((data) => {
        if(!data) {
            res.send('Животное с этим id не найдено')
        }
        AnimalData.findByIdAndRemove(req.params._id)
        .then((animal) => res.send(animal))
        .catch(next);
    })
    .catch(next);
})



mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})