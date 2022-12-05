import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  reactionAdd,
  selectAllPosts,
} from "../redux/posts/postsSlice";
import { selectAllUsers } from "../redux/users/usersSlice";
import moment from "moment";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const users = useSelector(selectAllUsers);
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const reactions = [
    ["thumbsUP", "🤙"],
    ["WoW", "😮"],
    ["heart", "❤️"],
    ["rocket", "🚀"],
    ["coffee", "☕"],
  ];

  return (
    <div className=" flex flex-wrap items-center justify-center">
      {posts.map((post) => {
        return (
          <div
            className="w-[180px] border border-sky-500 border-5 p-2 m-[2px] md:m-2 relative"
            key={post.id}
          >
            <button
              className="bg-red-500 text-white absolute right-2 top-2 h-7 w-7"
              onClick={() => dispatch(deletePost(post.id))}
            >
              X
            </button>
            <h1 className="font-bold font-xl"> {post.title}</h1>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500 italic">
              {users[post.userID] ? users[post.userID]?.name : "unknown author"}
            </p>

            <p className="text-sm italic text-gray-400">
              {moment(post?.date).fromNow()}
            </p>

            <div className="flex justify-between items-center ">
              {reactions.map((reaction) => {
                return (
                  <div key={reaction[0]} className="flex gap-1 text-sm">
                    <button
                      onClick={() =>
                        dispatch(
                          reactionAdd({
                            postID: post.id,
                            reaction: reaction[0],
                          })
                        )
                      }
                    >
                      {reaction[1]}
                    </button>
                    <p className="text-sm">{post.reactions[reaction[0]]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
