import * as data from "../data";
import { get, keysIn } from "lodash";
import { toast } from "react-toastify";
import { updateCookie } from "./cookies";

export const prepareDataForApp = () => {
  saveDataToLocalStorage("preparedData", true);
  saveDataToLocalStorage(
    "commonCategories",
    JSON.stringify(data.commonCategories)
  );
  saveDataToLocalStorage("categories", JSON.stringify(data.categories));
  saveDataToLocalStorage("users", JSON.stringify(data.users));
  saveDataToLocalStorage("posts", JSON.stringify(data.posts));
  saveDataToLocalStorage("comments", JSON.stringify(data.comments));
};

export const saveDataToLocalStorage = (key, val) => {
  localStorage.setItem(key, val);
};

export const getDataFromLocalStorage = key => {
  const data = localStorage.getItem(key);

  return data;
};

export const getCategoryTitle = id => {
  const categories = [
    ...JSON.parse(getDataFromLocalStorage("commonCategories")),
    ...JSON.parse(getDataFromLocalStorage("categories"))
  ];

  const category = categories.filter(categ => categ.id === id)[0];

  return get(category, "title");
};

export const getCategoryById = id => {
  const categories = [
    ...JSON.parse(getDataFromLocalStorage("commonCategories")),
    ...JSON.parse(getDataFromLocalStorage("categories"))
  ];

  const category = categories.filter(categ => categ.id === id)[0];

  return category;
};

export const getUserByUsername = username => {
  const users = JSON.parse(getDataFromLocalStorage("users"));
  console.log("users", users);

  return get(users, username);
};

export const fetchPostsByCategory = (categoryId, page, pageSize) => {
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.category === categoryId
  );
  const totalPage = Math.ceil((posts.length * 1.0) / pageSize);

  if (totalPage < page) {
    return [];
  }

  return posts.slice((page - 1) * pageSize, page * pageSize);
};

export const fetchPostsBySearch = (text, page, pageSize) => {
  const posts = JSON.parse(getDataFromLocalStorage("posts")).filter(
    post => post.title.indexOf(text) > -1
  );
  const totalPage = Math.ceil((posts.length * 1.0) / pageSize);

  if (totalPage < page) {
    return [];
  }

  return posts.slice((page - 1) * pageSize, page * pageSize);
};

export const updateCurrentCategory = id => {
  saveDataToLocalStorage("currentCategory", getCategoryById(id));
};

export const getCurrentCategory = id => {
  return JSON.parse(getDataFromLocalStorage("currentCategory"));
};

export const clearSensitiveChange = () => {
  localStorage.removeItem("");
};

export const isPostInUserMarks = (username, postId) => {
  const user = getUserByUsername(username);
  console.log("user", user);
  if (!user) {
    return false;
  }

  return user.markedPosts.findIndex(pId => pId === postId) > -1;
};

export const isPostInUserFollowings = (username, authorUsername) => {
  const user = getUserByUsername(username);
  console.log("ooooo", user);
  if (!user) {
    return false;
  }

  return user.followingUsers.findIndex(usn => usn === authorUsername) > -1;
};

export const signIn = (username, password) => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (users[username] && users[username].password === password) {
    return users[username];
  }

  return null;
};

export const removeMarkedPost = (username, id) => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (!users[username]) {
    return [];
  }

  users[username].markedPosts = users[username].markedPosts.filter(
    pId => pId !== id
  );
  saveDataToLocalStorage("users", JSON.stringify(users));
  saveDataToLocalStorage("user", JSON.stringify(users[username]));
  updateCookie("user", JSON.stringify(users[username]));

  return users[username].markedPosts;
};

export const addMarkedPost = (username, id) => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (!users[username]) {
    return [];
  }

  users[username].markedPosts.push(id);
  saveDataToLocalStorage("users", JSON.stringify(users));
  saveDataToLocalStorage("user", JSON.stringify(users[username]));
  updateCookie("user", JSON.stringify(users[username]));

  return users[username].markedPosts;
};

export const removeFollowingUsers = (username, authorUsername) => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (!users[username]) {
    return [];
  }

  users[username].followingUsers = users[username].followingUsers.filter(
    usn => usn !== authorUsername
  );
  saveDataToLocalStorage("users", JSON.stringify(users));
  saveDataToLocalStorage("user", JSON.stringify(users[username]));
  updateCookie("user", JSON.stringify(users[username]));

  return users[username].followingUsers;
};

export const addFollowingUsers = (username, authorUsername) => {
  const users = JSON.parse(getDataFromLocalStorage("users"));

  if (!users[username]) {
    return [];
  }

  users[username].followingUsers.push(authorUsername);
  saveDataToLocalStorage("users", JSON.stringify(users));
  saveDataToLocalStorage("user", JSON.stringify(users[username]));
  updateCookie("user", JSON.stringify(users[username]));

  return users[username].followingUsers;
};

export const getPostById = id => {
  const posts = JSON.parse(getDataFromLocalStorage("posts"));
  const postIndex = posts[posts.findIndex(p => p.id === id)];

  if (postIndex < 0) {
    return null;
  }

  return posts[postIndex];
};

export const getPostComments = postId => {
  const comments = JSON.parse(getDataFromLocalStorage("comments")) || [];

  const filteredComments = comments
    .filter(cmt => cmt.postId === postId)
    .sort(
      (cmtOne, cmtTwo) =>
        new Date(cmtTwo.createdDate) - new Date(cmtOne.createdDate)
    )
    .map(cmt => ({ ...cmt, author: getUserByUsername(cmt.author) }));

  const ret = filteredComments
    .filter(cmt => !cmt.parentId)
    .map(cmt => ({
      ...cmt,
      children: filteredComments.filter(sCmt => sCmt.parentId === cmt.id)
    }));

  return ret;
};

export const addNewPostComment = (postId, content, parentId, author) => {
  const comment = {
    id: new Date().getTime(),
    content,
    author: author.username,
    parentId,
    postId,
    likes: 0,
    createdDate: new Date()
  };

  saveDataToLocalStorage(
    "comments",
    JSON.stringify([
      ...(JSON.parse(getDataFromLocalStorage("comments")) || []),
      comment
    ])
  );

  return {
    ...comment,
    author
  };
};

export const likedComment = (username, commentId) => {
  const user = getUserByUsername(username);

  return user.likeComments.findIndex(id => id === commentId) > -1;
};

export const likeComment = (username, commentId) => {
  const users = JSON.parse(getDataFromLocalStorage("users")) || {};
  const comments = JSON.parse(getDataFromLocalStorage("comments")) || {};

  if (!users[username]) {
    return;
  }

  users[username].likeComments = [
    ...(users[username].likeComments || []),
    commentId
  ];
  comments[comments.findIndex(cmt => cmt.id === commentId)].likes++;

  saveDataToLocalStorage("users", JSON.stringify(users));
  saveDataToLocalStorage("comments", JSON.stringify(comments));
};

export const unLikeComment = (username, commentId) => {
  const users = JSON.parse(getDataFromLocalStorage("users")) || {};
  const comments = JSON.parse(getDataFromLocalStorage("comments")) || {};

  if (!users[username]) {
    return;
  }

  users[username].likeComments = users[username].likeComments.filter(
    id => id !== commentId
  );
  comments[comments.findIndex(cmt => cmt.id === commentId)].likes--;

  saveDataToLocalStorage("users", JSON.stringify(users));
  saveDataToLocalStorage("comments", JSON.stringify(comments));
};

export const getUsers = () => {
  const users = JSON.parse(getDataFromLocalStorage("users")) || {};

  return keysIn(users).map(username => users[username]);
};

export const notify = (type, text) => {
  toast.configure({
    toastClassName: "aaa",
    autoClose: 500,
    position: "bottom-right",
    className: "bbb",
    bodyClassName: "ccc"
  });
  const options = {
    position: "bottom-right",
    autoClose: 2000
  };

  switch (type) {
    case "success":
      toast.success(text, options);
      break;
    case "error":
      toast.error(text, options);
      break;
    default:
      toast.info(text, options);
  }
};
