import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheet/index.css'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

import RecipeModal from './components/RecipeModal'
import { useState } from 'react'

const App = () => {
  const dummyRecipes = [
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

  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [recipes, setRecipes] = useState(dummyRecipes)
  const showAddNewRecipe = () => {
    setShowAddRecipe(!showAddRecipe)
  }

  const addNewRecipe = (name, ingredients, directions) => {
    const nextId = recipes.reduce((a, b) => a.id > b.id ? a.id : b.id)

    const newRecipe = {
      id: nextId + 1,
      name: name,
      ingredients: ingredients,
      directions: directions
    }

    setRecipes(recipes.concat(newRecipe))
    setShowAddRecipe(!showAddRecipe)
  }

  const removeRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <div className='container'>
      <div className='recipes-container'>
        <h1>Recipes memo</h1>
        {recipes.map(recipe => {
          return (
            <Accordion key={recipe.name}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{recipe.name}</Accordion.Header>
                <Accordion.Body>
                  <div>
                    <h4>Ingredients</h4>
                    <ul>
                      {recipe.ingredients.map((item, idx) => {
                        return <li key={item+idx}>{item}</li>
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4>Directions:</h4>
                    {recipe.directions}
                  </div>
                  <div className='accordion-buttons'>
                    <Button onClick={() => removeRecipe(recipe.id)}>Remove</Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
        )
        })}
        <div className='add-new-recipe-button'>
          <Button onClick={showAddNewRecipe}>Add new recipe</Button>
        </div>
      </div>
      {showAddRecipe ? <RecipeModal close={showAddNewRecipe} save={addNewRecipe}/> : null}
    </div>
  )
}

export default App;
