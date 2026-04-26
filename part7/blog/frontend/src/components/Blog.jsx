import { Link } from "react-router";

const Blog = ({ blog }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <Link to={"/blogs/" + blog.id}>
        <span className="blogTitle">{blog.title}</span> {blog.author}
      </Link>
    </div>
  );
};

export default Blog;
