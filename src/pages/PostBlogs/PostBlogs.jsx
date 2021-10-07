import React, { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./postBlogs.css";

import firebase, { db } from "../../firebase";

const PostBlogs = () => {
  const [post, setPost] = useState("");

  const { currentUser, activeUser } = useAuth();

  console.log(currentUser, "currentUser", activeUser);

  const handlePost = (e) => {
    console.log("clicked");
    console.log(post);
    let pushToFirebase = {
      post: post,
      postedBy: activeUser.name,
      postedByUserId: currentUser.claims.user_id,
      createdAt: firebase.firestore.Timestamp.now(),
    };

    db.collection("posts")
      .add(pushToFirebase)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="post-blogs-container">
        {/* <div className="header">
          <h3>Whats on your mind?</h3>
        </div> */}
        <div className="textarea">
          <div class="form-group">
            <label for="exampleFormControlTextarea1" className="label">
              Whats on your mind?
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="6"
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="button">
          <button
            type="button"
            class="btn btn-primary mt-3"
            onClick={(e) => handlePost(e)}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBlogs;
