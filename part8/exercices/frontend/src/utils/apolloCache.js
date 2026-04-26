import { ALL_BOOKS} from '../queries'

export const addBookToCache = (cache, bookToAdd) => {

console.log(cache)
cache.modify({
  fields: {
    allBooks(existingTodos = []) {
      return [...existingTodos, bookToAdd];
    }
  }
});

}
