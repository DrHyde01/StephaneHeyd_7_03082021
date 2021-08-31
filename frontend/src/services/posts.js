import API from "./apiService";

export default {
  createPost(data) {
    return API().post("posts/add", data);
  },

  getOnePost(id) {
    return API().get("posts/" + id);
  },

  getAllPosts() {
    return API().get("posts/");
  },

  updatePost(id, data) {
    return API().put("posts/" + id, data);
  },

  deletePost(id) {
    return API().delete("posts/" + id);
  },
};
