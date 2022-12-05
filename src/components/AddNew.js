import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/posts/postsSlice";
import { selectAllUsers } from "../redux/users/usersSlice";

const AddNew = () => {
  const dispatch = useDispatch();
  const userSelectRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userID, setUserID] = useState("0");

  const users = useSelector(selectAllUsers);

  const changeTitle = (e) => setTitle(e.target.value);
  const changeContent = (e) => setContent(e.target.value);
  const changeUser = (e) => setUserID(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(title, content, userID));
    setTitle("");
    setContent("");
    setUserID("0");

    userSelectRef.current.selectedIndex = 0;
  };

  const canSave = title && content && userID !== null;

  return (
    <form
      className=" p-2 flex flex-col w-full md:w-[400px]"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="border border-sky-500 outline-none px-2 py-1 m-2"
        placeholder="title..."
        value={title}
        onChange={changeTitle}
      />
      <input
        type="text"
        className="border border-sky-500 outline-none px-2 py-1 m-2"
        placeholder="content..."
        value={content}
        onChange={changeContent}
      />
      <select
        name="users"
        className="border border-sky-500 outline-none px-2 py-1 m-2"
        onChange={changeUser}
        ref={userSelectRef}
      >
        {users.map((user) => {
          return (
            <option value={user.id - 1} key={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
      <button
        disabled={!canSave}
        className={`${
          canSave ? " bg-green-900" : "bg-gray-600"
        } p-2 m-2 text-white`}
      >
        Add
      </button>
    </form>
  );
};

export default AddNew;
