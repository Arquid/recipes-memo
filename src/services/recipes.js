import axios from 'axios'
const baseUrl = "/api/recipes"

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const create = async newRecipe => {
  const response = await axios.post(baseUrl, newRecipe)

  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  console.log(response.status)
  return response.data
}

const update = async (id, updatedRecipe) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedRecipe)
  console.log(response.status)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, remove, update}