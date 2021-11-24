import React, { useEffect, useState } from "react";
import { NavBar } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import "./postBlogs.css";

import firebase, { db } from "../../firebase";

const PostBlogs = () => {
  const [post, setPost] = useState("");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const { currentUser, activeUser } = useAuth();

  console.log(currentUser, "currentUser", activeUser);

  //yo nabhaye ni kei hunna ta?? why?
  interface IPushToFirebase {
    post: string;
    postedBy: string;
    postedByUserId: string;
    createdAt: {};
  }

  const handlePost = (e: any) => {
    console.log("clicked");
    console.log(post);

    let pushToFirebase: IPushToFirebase = {
      post: post,
      postedBy: activeUser.name,
      postedByUserId: currentUser.claims.user_id,
      createdAt: firebase.firestore.Timestamp.now(),
    };
    console.log(typeof pushToFirebase);
    console.log(pushToFirebase, "ptf");
    db.collection("posts")
      .add(pushToFirebase)
      .then((docRef) => {
        (
          document.getElementById(
            "exampleFormControlTextarea1"
          ) as HTMLTextAreaElement
        ).value = "";

        setIsShowAlert(true);
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
        {isShowAlert ? (
          <div className="alert alert-success alert-dismissible fade show">
            <strong>Success!</strong> Your post has been posted!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              onClick={() => setIsShowAlert(false)}
            ></button>
          </div>
        ) : (
          ""
        )}{" "}
        <div className="textarea">
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1" className="label">
              Whats on your mind?
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={parseInt("6")}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="button">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={(e) => {
              console.log(e);
              handlePost(e);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostBlogs;
