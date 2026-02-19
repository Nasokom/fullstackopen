const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0 ){
        return 0
    }

const total = blogs.reduce(
  (sum, post) => sum + post.likes,
  0,
);

 return total
 }

const favoriteBlog = (blogs)=>{

    const mostLike = blogs.toSorted((a,b)=> b.likes -a.likes)[0].likes
    const famousPost = blogs.find(a => a.likes === mostLike)
    return famousPost
}

const mostBlogs = (blogs)=>{

    const authors = []

    blogs.forEach(element => {
        const index = authors.findIndex( a => a.author == element.author)
        if(index >= 0){
        return authors[index].blogs = authors[index].blogs +1
        }
    
        return authors.push({author:element.author,blogs:1})
    });

    const result = authors.toSorted((a,b)=> b.blogs-a.blogs)[0]
    return result
}

const mostLikes = (blogs)=>{
      const authors = []

    blogs.forEach(element => {
        const index = authors.findIndex( a => a.author == element.author)
        if(index >= 0){
        return authors[index].likes = authors[index].likes +element.likes
        }
    
        return authors.push({author:element.author,likes:element.likes})
    });
    const result = authors.toSorted((a,b)=> b.likes-a.likes)[0]

    return result
}


module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}