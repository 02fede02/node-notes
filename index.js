const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
	{
		name: 'Hacer la comida',
		id: 1
	},
	{
		name: 'Entrenar piernas y abdomne',
		id: 2
	},
	{
		name: 'Maniana ir a la verduleria',
		id: 3
	}
]


// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain'})
//     response.end('Hello wolrd')
// })

app.get('/', (request, response) => {
	response.send('<h1>Hello fede</h1>')
})

app.get('/about', (request, response) => {
	response.send('<p>About page</p>')
})

app.get('/notes', (request, response) => {
	const note = request.body
	
	if(!note || !note.content) {
		return response.status(400).json({
			error: 'note.content is missingasdfa'
		})
	} else {
		response.json(note)
	}
})

// app.get(`/api/notes/:id`, (request, response) => {
//     const id = request.params
//     console.log({id})
//     response.send(id)
// })

app.get('/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	console.log({id})
	console.log({note})
	if(note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.delete('/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)
	response.status(204).end()
})

app.post('/notes', (request, response) => {
	const note = request.body

	const ids = notes.map(note => note.id)
	const maxId = Math.max(...ids)

	const newNote = {
		id: maxId + 1,
		name: note.content
	}

	notes = [...notes, newNote]

	response.status(201).json(newNote)
})


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => 
	console.log(`Server running on port ${PORT}`))