// Déclaration des différentes instances Axios pour les opérations Posts ----------------------------------
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

  updateOnePost(id, data) {
    return API().put("posts/" + id, data);
  },

  deleteOnePost(id) {
    return API().delete("posts/" + id);
  },

  addLike(id) {
    return API().post("posts/" + id + "/likes");
  },

  createComment(id, data) {
    return API().post("posts/" + id + "/comments", data);
  },

  getComments(id) {
    return API().get("posts/" + id + "/comments");
  },

  deleteComment(id) {
    return API().delete("posts/comments/" + id);
  },
};
