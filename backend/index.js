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
    directions: 'Preheat the oven to 300 degrees F (150 degrees C). Place corned beef brisket in the center of a roasting pan. Arrange potatoes and carrots around the sides, then scatter onion and garlic over top. Sprinkle seasoning packet over beef, then pour in water until potatoes are almost covered. Cover with a lid or heavy aluminum foil. Roast in the preheated oven until corned beef is so tender it can be flaked apart with a fork, about 5 to 6 hours.'
  },
  {
    id:1,
    name: 'Mississippi chicken',
    ingredients: [
      '2 pounds skinless, boneless chicken breasts',
      '1 (1 ounce) package dry ranch dressing mix',
      '1 (16 ounce) jar sliced pepperoncini peppers, drained',
      '4 tablespoons unsalted butter, sliced'
    ],
    directions: 'Gather ingredients, and preheat the oven to 350 degrees F (175 degrees C). Season chicken with ranch seasoning mix; place in bottom of large Dutch oven. Place pepperoncini peppers, butter, and 1/2 cup reserved pepper juice over chicken. Cover, and bake in preheated oven until chicken is fork tender, about 1 hour 30 minutes. An instant-read thermometer inserted into the center should read 165 degrees F (74 degrees C). Let stand 5 minutes. Shred chicken using two forks.'
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
