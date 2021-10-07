import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavBar, Spinner } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import "./blogsWithComments.css";

const BlogsWithComments = () => {
  const [comment, setPostComment] = useState();
  const [singlePost, setSinglePost] = useState([]);
  const [getComments, setGetComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(getComments, "getCOmment");

  const { postId } = useParams();
  console.log(postId);

  const { currentUser } = useAuth();
  console.log(currentUser, "currentUser");

  const handleSubmitComment = () => {
    const pushToFirebase = {
      comment: comment,
      commentedByUserId: currentUser.claims.user_id,
      commentedToPostId: postId,
    };

    db.collection("comments")
      .add(pushToFirebase)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleGetComments = () => {
    setIsLoading(true);
    db.collection("comments")
      .where("commentedToPostId", "==", postId)
      .get()
      .then((querySnapshot) => {
        const getComments = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const appObj = { commentId: doc.id, ...doc.data() };
          getComments.push(appObj);
        });
        setGetComments(getComments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const getPostById = () => {
    console.log("hello");
    const postArr = [];
    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        postArr.push(doc.data());
        setSinglePost(postArr);
      });

    console.log(postArr);
    console.log(singlePost, "single ost");
  };

  useEffect(() => getPostById(), []);
  useEffect(() => handleGetComments(), []);

  console.log(singlePost, "singlepost");
  return (
    <div>
      <NavBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {singlePost.length !== 0 ? (
            <div className="blogsWithComments-container">
              <div className="post">{singlePost[0].post}</div>
              <div className="comment-textarea">
                <div class="form-group">
                  <label for="exampleFormControlTextarea1" className="label">
                    Comment
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    onChange={(e) => setPostComment(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => handleSubmitComment()}
                  >
                    Comment
                  </button>
                </div>
              </div>
              <div className="comments">
                <ol>
                  {getComments.map((comt, index) => {
                    return <li key={index}>{comt.comment}</li>;
                  })}
                </ol>
                {/* <ol>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ol> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsWithComments;
