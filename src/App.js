import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheet/index.css'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import RecipeModal from './components/RecipeModal'

import recipeService from './services/recipes'

const App = () => {
  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    recipeService
      .getAll()
      .then(recipes => setRecipes(recipes))
      .catch(error => {
        console.log("Error:", error)
      })
  }, [])

  const showAddNewRecipe = () => {
    setShowAddRecipe(!showAddRecipe)
  }

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
      .catch(error => {
        console.log("Error:", error)
      })
  }

  const removeRecipe = (id) => {
    recipeService
      .remove(id)
      .then(setRecipes(recipes.filter(recipe => recipe.id !== id)))
  }

  const changeFavorite = (id) => {
    const recipeToUpdate = recipes.find(recipe => recipe.id === id)
    const updatedRecipe = {...recipeToUpdate, favorite: !recipeToUpdate.favorite}

    recipeService
      .update(id,updatedRecipe)
      .then(setRecipes(recipes.map(recipe => recipe.id === id ? updatedRecipe : recipe)))
      .catch(error => {
        console.log("Error:", error)
      })
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
                    {recipe.directions.map(((item, idx) => {
                      return (
                        <div className='direction-container' key={item+idx}>
                          <p className='step-text'>Step {idx + 1}</p>
                          {item}
                        </div>
                      )
                    }))}
                  </div>
                  <div className='accordion-buttons'>
                    <Button onClick={() => removeRecipe(recipe.id)}>Remove</Button>
                    <Button className='favorite-button' onClick={() => changeFavorite(recipe.id)}>{recipe.favorite ? <MdFavorite /> : <MdFavoriteBorder />}</Button>
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
