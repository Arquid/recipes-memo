const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let recipes = [
  {
    id: 0,
    name: 'Corned beef roast',
    ingredients: [
      '1 (5 1/2 pound) corned beef brisket with spice packet',
      '7 small potatoes, peeled and diced',
      '4 medium carrots, peeled and diced',
      '1 medium onion, diced',
      '3 cloves garlic, chopped'
    ],
    directions: [
      'Preheat the oven to 300 degrees.',
      'Arrange potatoes and carrots around the sides, then scatter onion and garlic over top.',
      'Sprinkle seasoning packet over beef, then pour in water until potatoes are almost covered.',
      'Cover with a lid or heavy aluminum foil.',
      'Roast in the preheated oven until corned beef is so tender it can be flaked apart with a fork, about 5 to 6 hours.'
    ],
    favorite: true
  }
]

app.get('/api/recipes', (request, response) => {
  response.json(recipes)
})

app.post('/api/recipes', (request, response) => {
  const recipe = request.body
  const nextId = recipes.reduce((a, b) => a.id > b.id ? a.id : b.id)

  recipe.id = nextId + 1

  recipes = recipes.concat(recipe)

  response.json(recipe) 
})

app.delete('/api/recipes/:id', (request, response) => {
  const id = Number(request.params.id)
  recipes = recipes.filter(recipe => recipe.id !== id)

  response.status(204).end()
})

app.put('/api/recipes/:id', (request, response) => {
  const id = Number(request.params.id)
  recipes = recipes.map(recipe => recipe.id === id ? request.body : recipe)

  response.json(recipes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
