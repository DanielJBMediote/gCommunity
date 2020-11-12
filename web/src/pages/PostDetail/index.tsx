import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import httpClient from "../../services/api";
import "./index.scss";

const PostDetail: React.FC = () => {
  const postID = window.location.pathname.split("/")[2];

  React.useEffect(() => {
    httpClient
      .get(`current-post/${postID}`)
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="post-content"></div>
        <div className="comment-content">
          <div className="comment-form">
            <span>New Comment</span>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={10}
            ></textarea>
            <Button label="Add" />
          </div>
          <div className="comment-list"></div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
