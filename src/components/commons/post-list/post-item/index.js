import React from "react";
import { Fade } from "react-reveal";
import "./post-item.styles.scss";
import TextTruncate from "react-text-truncate";
import moment from "moment";
import { getCategoryTitle, getUserByUsername } from "../../../../utils";
import CategoryLabel from "../../../commons/category-label";
import AuthorLabel from "../../../commons/author-label";
import "./post-item.styles.scss";

export default function PostItem({ post, onClick }) {
  const defaultImage = "/media/images/posts/placeholder.png";
  const categoryTitle = getCategoryTitle(post.category);
  const user = getUserByUsername(post.author);

  return (
    <Fade>
      <div className="hb-post-item" onClick={onClick}>
        <img
          className="post-image"
          src={post.image || defaultImage}
          alt="post"
        />
        <div className="post-info">
          <div>
            <TextTruncate
              className="title"
              line={1.5}
              element="span"
              truncateText="…"
              text={post.title}
              // textTruncateChild={<a href="#">Read on</a>}
            />
            {/* <span className="title">{post.title}</span> */}
            {/* <span> */}
            <TextTruncate
              className="short-description"
              line={3}
              element="span"
              truncateText="…"
              text={post.shortDescription}
              // textTruncateChild={<a href="#">Read on</a>}
            />
            {/* {post.shortDescription} */}
            {/* </span> */}
          </div>
          <div className="post-meta-info">
            <CategoryLabel title={categoryTitle} />
            <AuthorLabel user={user} />
            <span className="created-date">
              {moment(post.createdDate).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
        </div>
      </div>
    </Fade>
  );
}
