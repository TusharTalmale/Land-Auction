import { createContext, useState } from 'react'

export const TagContext = createContext();

export default function TagProvider(props) {
  const [tags, setTags] = useState([])

  const fetchTags = async (id) => {
    let res = await fetch(`/rest/tag/${id}`)
    res = await res.json()
    setTags(res)
  }

  const values = {
    tags,
    fetchTags
  }

  return (
    <TagContext.Provider value={values}>
      {props.children}
    </TagContext.Provider>
  )
}
