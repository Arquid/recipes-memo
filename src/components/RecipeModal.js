import { useEffect, useState } from 'react'

import '../stylesheet/recipeModal.css'

import Modal from  'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/form'
import InputGroup from 'react-bootstrap/InputGroup'

const RecipeModal = ({close, save, update, updateRecipe}) => {
  const [name, setName] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [direction, setDirection] = useState('')
  const [allIngredients, setAllIngredients] = useState([])
  const [allDirections, setAllDirections] = useState([])

  useEffect(() => {
    if(updateRecipe) {
      setName(updateRecipe.name)
      setAllIngredients(updateRecipe.ingredients)
      setAllDirections(updateRecipe.directions)
    }
  }, [updateRecipe])

  const changeName = (event) => {
    setName(event.target.value)
  }

  const changeIngredient = (event) => {
    setIngredient(event.target.value)
  }

  const changeDirection = (event) => {
    setDirection(event.target.value)
  }

  const addNewIngredient = () => {
    setAllIngredients(allIngredients.concat(ingredient))
    setIngredient('')
  }

  const addNewDirection = () => {
    setAllDirections(allDirections.concat(direction))
    setDirection('')
  }

  const clearForm = () => {
    setName('')
    setAllIngredients([])
    setIngredient('')
    setAllDirections([])
    setDirection('')
  }

  const canSave = name === '' || !allIngredients.length > 0 || !allDirections.length > 0

  return (
    <div>
      <Modal
        show={true}
        backdrop='static'
        size='lg'
      >
        <Modal.Header>
          <Modal.Title>Add new recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Recipe name:</Form.Label>
              <Form.Control type='text' value={name} onChange={changeName}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ingredients:</Form.Label>
              <ul>
                {allIngredients.map((item, idx) => {
                  return <li key={item+idx}>{item}</li>
                })}
              </ul>
              <InputGroup>
                <Form.Control type='text' onChange={changeIngredient} value={ingredient}/>
                <InputGroup.Text className={ingredient === '' ? 'add-row-disabled' : 'add-row'} onClick={ingredient === '' ? null : addNewIngredient}>
                  Add row
                </InputGroup.Text> 
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Directions:</Form.Label>
              <ol>
                {allDirections.map((item, idx) => {
                  return <li key={item+idx}>{item}</li>
                })}
              </ol>
              <InputGroup>
                <Form.Control type='text' onChange={changeDirection} value={direction}/>
                <InputGroup.Text className={direction === '' ? 'add-row-disabled' : 'add-row'} onClick={direction === '' ? null : addNewDirection}>
                  Add step
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
          <Button onClick={clearForm}>Clear</Button>
          {!updateRecipe ?
            <Button disabled={canSave} onClick={() => save(name, allIngredients, allDirections)}>Save</Button> :
            <Button disabled={canSave} onClick={() => update(name, allIngredients, allDirections, updateRecipe.id)}>Update</Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RecipeModal