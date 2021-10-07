import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar, Spinner } from "../../components";
import { db } from "../../firebase";

const Blogs = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPosts = () => {
    setIsLoading(true);
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const appObj = {
            postId: doc.id,
            ...doc.data(),
          };
          posts.push(appObj);
        });
        console.log(posts, "posts");
        setAllPosts(posts);
        setIsLoading(false);
      });
  };

  useEffect(() => getAllPosts(), []);

  return (
    <div>
      <NavBar />

      <div className="blogs-container">
        {isLoading ? (
          <Spinner />
        ) : (
          <ol>
            {allPosts.map((post, index) => {
              return (
                <Link to={`/blogs/${post.postId}`}>
                  {" "}
                  <li key={index}>{post.post}</li>{" "}
                </Link>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Blogs;
