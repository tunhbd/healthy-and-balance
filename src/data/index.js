export const users = {
  admin: {
    username: "admin",
    password: "admin",
    displayName: "Admin",
    email: "admin@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "admin",
    avatar: "/media/images/users/placeholder.png",
  },
  nvphuoc: {
    username: "nvphuoc",
    password: "nvphuoc",
    displayName: "Nguyen Van Phuoc",
    email: "nvphuoc@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "user",
    avatar: "/media/images/users/placeholder.png",
  },
  phhviet: {
    username: "phhviet",
    password: "phhviet",
    displayName: "Pham Huu Hoang Viet",
    email: "phhviet@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "user",
    avatar: "/media/images/users/placeholder.png",
  },
  ngtu: {
    username: "ngtu",
    password: "ngtu",
    displayName: "Nguyen Huu Tu",
    email: "phhviet@healthyandbalance.com",
    gender: 1,
    isActive: true,
    followingPosts: [],
    markedPosts: [],
    role: "user",
    avatar: "/media/images/users/placeholder.png",
  },
};
export const commonCategories = [
  { id: "new", title: "bài viết mới", url: "/category/new" },
  { id: "following", title: "Đang theo dõi", url: "/category/following" },
  { id: "marked", title: "Đã đánh dấu", url: "/category/marked" },
];
export const categories = [
  { id: "categ01", title: "Sức khỏe", url: "/category/categ01" },
  { id: "categ02", title: "Sống khỏe", url: "/category/categ02" },
  { id: "categ03", title: "Thể thao", url: "/category/categ03" },
  { id: "categ04", title: "Theo mùa", url: "/category/categ04" },
];
// {
//   categ01: "Sức khỏe",
//   categ02: "Sống khỏe",
//   categ03: "Thể thao",
//   categ04: "Theo mùa",
// };
export const posts = [
  {
    id: 1,
    title: "Post 01",
    category: "categ01",
    status: 0,
    shortDescription: "Post 01 description",
    content: "Post 01 content",
    createdDate: "2019-12-10",
  },
  {
    id: 2,
    title: "Post 02",
    category: "categ01",
    status: 0,
    shortDescription: "Post 02 description",
    content: "Post 01 content",
    createdDate: "2019-12-10",
  },
];
