const generateId = () => Number((Math.random()*100000).toFixed(0))

const createNote = content => {
return {
    type:'NEW_NOTE',
    payload:{
      content,
      important:false,
      id:generateId()
    }
  }
}

const toggleImportanceOf = (id) =>{
  return {
      type:'TOGGLE_IMPORTANCEÍ',
      payload:{id}
    }
  
}


export default {
createNote,
toggleImportanceOf
}