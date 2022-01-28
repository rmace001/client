import React, { useState, useEffect } from "react";
import PostCreate from "./PostCreate";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    //   need response data
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = posts ? (
    Object.values(posts).map((post) => {
      return (
        <div
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
          key={post.id}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList postId={post.id} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      );
    })
  ) : (
    <div></div>
  );

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
