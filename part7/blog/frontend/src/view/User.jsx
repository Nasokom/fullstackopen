import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AppleWindow from "../components/AppleWindow";

const UserView = ({ close }) => {
  const { id } = useParams();
  const user = useSelector(({ users }) => users.find((elt) => elt.id === id));
  if (!user) {
    return null;
  }
  return (
    <AppleWindow onClose={!close ? "/users" : close}>
      <div className="appleText">
        <p>name : {user.name}</p>
        <p>username : {user.username}</p>
        <p>id: {user.id}</p>
        <h2>Added blogs :</h2>
        <ul>
          {user.blogs.length > 0 ? (
            user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
          ) : (
            <p>no blog</p>
          )}
        </ul>
      </div>
    </AppleWindow>
  );
};

export default UserView;
