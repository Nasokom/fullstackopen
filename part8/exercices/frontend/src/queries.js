import { gql } from "@apollo/client"

export const ALL_AUTHOR = gql`
query{
  allAuthor {
    name
    id
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query ($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    published
    author{
      name
      id
    }
    id
    genres
  }
}
`

export const ALL_GENRES = gql `
query{
  allGenres
}`

export const ADD_BOOKS = gql`
    mutation ($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    id
    genres
  }
}
`
export const EDIT_AUTHOR = gql`
mutation Mutation($name: String, $setBornTo: Int) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    id
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}`


export const ME= gql`
query{
  me {
    username
    id
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
subscription{
  bookAdded{
     title
    published
    author{
      name
      id
    }
    id
    genres
  }
}
`