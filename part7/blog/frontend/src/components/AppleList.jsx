import React, { Children, useState, useRef } from "react";
import { useNavigate } from "react-router";
import "../styles/appleList.css";

const AppleList = ({ children, data }) => {
  const list = data.list || null;
  const [selectedItem, setItem] = useState(null);
  const btnElt = useRef();

  const handleClick = (id) => {
    return () => {
      btnElt.current.classList.add("button-ready");
      setTimeout(() => {
        btnElt.current.classList.remove("button-ready");
      }, 500);

      setItem(id);
    };
  };
  const navigate = useNavigate();
  return (
    <div className="appleList" draggable={true}>
      <div className="appleList-container">
        <div className="appleList-list">
          {list &&
            list
              .toSorted((a, b) => b.likes - a.likes)
              .map((item) => (
                <p
                  onDoubleClick={() => navigate(`/${data.type}/${item.id}`)}
                  onClick={handleClick(item.id)}
                  key={item.id}
                  style={{
                    textDecoration: selectedItem === item.id && "underline",
                  }}
                >
                  - {item.title || item.name}
                </p>
              ))}
        </div>
        <div className="appleList-btns">
          <button
            ref={btnElt}
            disabled={selectedItem ? false : true}
            onClick={() => navigate(`/${data.type}/${selectedItem}`)}
          >
            Open
          </button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
        {data.type === "blogs" && (
          <div className="appleList-extra">{children}</div>
        )}
      </div>
    </div>
  );
};

export default AppleList;
