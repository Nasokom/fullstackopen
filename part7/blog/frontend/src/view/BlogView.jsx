import { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog, addComment } from "../reducer/blogReducer";
import AppleWindow from "../components/AppleWindow";

const BlogView = ({ close }) => {
  const { id } = useParams();
  const blog = useSelector(({ blog }) => blog.find((elt) => elt.id === id));
  const currentUser = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const handleLike = () =>
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }));

  const handleDelete = () => {
    if (window.confirm("Do you want to delete this blog ?")) {
      dispatch(deleteBlog(blog.id, currentUser.token));
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    const value = event.target.comment.value;
    try {
      dispatch(addComment(blog.id, comment));
      setComment("");
    } catch {}
  };

  if (!blog) {
    return null;
  }

  return (
    <AppleWindow
      title={blog.title}
      smallTitle={true}
      onClose={!close ? "/blogs" : close}
    >
      <div className="appleText">
        <p>title : {blog.title}</p>
        <p>
          url : <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          number of likes : {blog.likes} likes{" "}
          <button onClick={handleLike}>like</button>
        </p>
        <p>author : {blog.author}</p>

        {blog.user && currentUser.username === blog.user.username && (
          <button onClick={handleDelete} name="delete blog">
            remove
          </button>
        )}

        <h2>comments</h2>
        <ul
        //style={{ overflow: "scroll" }}
        >
          {blog.comments &&
            blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
        </ul>

        <form onSubmit={handleComment}>
          <textarea
            name="comment"
            id=""
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
      </div>
    </AppleWindow>
  );
};

export default BlogView;
