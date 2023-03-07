import { useState } from 'react'

import '../stylesheet/recipeModal.css'

import Modal from  'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/form'
import InputGroup from 'react-bootstrap/InputGroup'

const RecipeModal = ({close, save}) => {
  const [name, setName] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [directions, setDirections] = useState('')
  const [allIngredients, setAllIngredients] = useState([])

  const changeName = (event) => {
    setName(event.target.value)
  }

  const changeIngredient = (event) => {
    setIngredient(event.target.value)
  }

  const changeDirections = (event) => {
    setDirections(event.target.value)
  }

  const addNewIngredient = () => {
    setAllIngredients(allIngredients.concat(ingredient))
    setIngredient('')
  }

  const clearForm = () => {
    setName('')
    setAllIngredients([])
    setIngredient('')
    setDirections('')
  }

  const canSave = [name, directions].includes('') || !allIngredients.length > 0

  return (
    <div>
      <Modal
        show={true}
        backdrop='static'
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
              <Form.Control as='textarea' value={directions} onChange={changeDirections}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
          <Button onClick={clearForm}>Clear</Button>
          <Button disabled={canSave} onClick={() => save(name, allIngredients, directions)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RecipeModal