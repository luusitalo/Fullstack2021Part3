
const { timeStamp } = require('console')
const express = require('express')
const app = express()

var morgan = require('morgan')

app.use(express.json())

app.use(morgan('tiny'))

const http = require('http')

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log("get", id)
  const person = persons.find(person => person.id == id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.get('/info', (request, response) => {
  response.send("App has info for "  + persons.length + " people." + '<br /><br />' + Date())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log("delete", id)
  persons = persons.filter(persons => persons.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    console.log(request.body)
 
  if (!person.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!person.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const match = persons.find(match => match.name == person.name)

  if (match) {
    response.status(400).json({
      error: 'Name exists already'
    })
  }



  const id = Math.floor(Math.random() * (10000 - 5000) + 5000);
  person.id = id

  persons = persons.concat(person)
  response.json(person)
})




//const app = http.createServer((request, response) => {
//    response.writeHead(200, { 'Content-Type': 'application/json' })
//    response.end(JSON.stringify(persons))
//  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)