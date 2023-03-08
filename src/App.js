import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheet/index.css'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

import RecipeModal from './components/RecipeModal'

import recipeService from './services/recipes'

const App = () => {
  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [recipes, setRecipes] = useState([])
  const showAddNewRecipe = () => {
    setShowAddRecipe(!showAddRecipe)
  }

  useEffect(() => {
    recipeService
      .getAll()
      .then(recipes => setRecipes(recipes))
  }, [])

  const addNewRecipe = (name, ingredients, directions) => {

    const newRecipe = {
      name: name,
      ingredients: ingredients,
      directions: directions
    }

    recipeService
      .create(newRecipe)
      .then(returnedRecipe => {
        setRecipes(recipes.concat(returnedRecipe))
        setShowAddRecipe(!showAddRecipe)
      })
  }

  const removeRecipe = (id) => {
    recipeService
      .remove(id)
      .then(setRecipes(recipes.filter(recipe => recipe.id !== id)))
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
