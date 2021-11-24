import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar, Spinner } from "../../components";
import { db } from "../../firebase";

const Blogs = () => {
  interface IappObj {
    postId: string;
    createdAt: number; //{} = because createdAt is t{} cha
    post: string;
    postedBy: string;
    postedByUserId: string;
  }
  const [allPosts, setAllPosts] = useState<IappObj[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPosts = () => {
    setIsLoading(true);
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        const posts: IappObj[] = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const appObj = {
            postId: doc.id,
            // ...doc.data(),
            createdAt: doc.data().createdAt,
            post: doc.data().post,
            postedBy: doc.data().postedBy,
            postedByUserId: doc.data().postedByUserId,
          };

          posts.push(appObj);
        });
        const sortedData: IappObj[] = posts.sort(
          (a: IappObj, b: IappObj): number => {
            return b.createdAt.valueOf() - a.createdAt.valueOf();
          }
        );
        console.log(sortedData, "posts");
        setAllPosts(sortedData);
        setIsLoading(false);
      });
  };

  //1. destructure gareko object maa, type dina mildaina.
  //2.

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
                <div style={{ display: "flex", marginTop: "1rem" }}>
                  <Link to={`/blogs/${post.postId}`}>
                    {" "}
                    <li key={index}>{post.post}</li>{" "}
                  </Link>
                  <span style={{ marginLeft: "auto" }}>
                    {" "}
                    ----Posted By:{post.postedBy}
                  </span>
                </div>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Blogs;
