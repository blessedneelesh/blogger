import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavBar, Spinner } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import firebase, { db } from "../../firebase";
import "./blogsWithComments.css";

const BlogsWithComments = () => {
  const [comment, setPostComment] = useState();
  const [singlePost, setSinglePost] = useState([]);
  const [getComments, setGetComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  console.log(loggedInUser, "loggedin user");

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
      commentedByUserName: loggedInUser,
      commentedTime: firebase.firestore.Timestamp.now(),
    };

    db.collection("comments")
      .add(pushToFirebase)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("exampleFormControlTextarea1").value = "";
        setIsShowAlert(true);
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
        const sortedComments = getComments.sort(
          (a, b) => b.commentedTime - a.commentedTime
        );
        setGetComments(sortedComments);
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

  //loggedIn user and Commented user is same
  const getNameOfloggedInUser = () => {
    db.collection("users")
      .doc(currentUser.claims.user_id)
      .onSnapshot((doc) => setLoggedInUser(doc.data().name));
  };

  useEffect(() => getPostById(), []);
  useEffect(() => handleGetComments(), []);
  useEffect(() => getNameOfloggedInUser(), []);

  console.log(singlePost, "singlepost");
  return (
    <div>
      <NavBar />
      {isShowAlert ? (
        <div class="alert alert-success alert-dismissible fade show">
          <strong>Success!</strong> Comment successfully Posted!
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            onClick={() => {
              setIsShowAlert(false);
            }}
          ></button>
        </div>
      ) : (
        ""
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {singlePost.length !== 0 ? (
            <div className="blogsWithComments-container">
              <div className="post">{`${singlePost[0].post}.  -------------Posted By: ${singlePost[0].postedBy}`}</div>
              <div className="comment-textarea">
                <div class="form-group">
                  <label
                    for="exampleFormControlTextarea1"
                    className="label mt-4"
                  >
                    Leave Comments:
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    onChange={(e) => setPostComment(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-primary mt-3 mb-3"
                    onClick={() => handleSubmitComment()}
                  >
                    Comment
                  </button>
                </div>
              </div>
              <div className="comments">
                <span style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
                  See Comments
                </span>
                <ol>
                  {getComments.length != 0 ? (
                    <div>
                      {" "}
                      {getComments.map((comt, index) => {
                        return (
                          <li key={index} className="mt-3">
                            {comt.comment} -----Commented By:{" "}
                            {comt.commentedByUserName}{" "}
                          </li>
                        );
                      })}
                    </div>
                  ) : (
                    "you dont have any Comments"
                  )}
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
