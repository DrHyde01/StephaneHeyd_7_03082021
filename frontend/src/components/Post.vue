<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col  lg:mx-20 mx-0 my-4 py-4 px-4 border-2 rounded-md shadow-md"
    >
      <div class="flex items-center">
        <div class="flex items-center">
          <img
            v-if="post.User.picture !== null"
            class="inline object-cover rounded-full h-14 w-14 border-4 border-gray-300 mr-4"
            :src="post.User.picture"
            alt="photo de profil"
          />
        </div>

        <div class="flex flex-wrap flex-1 items-center">
          <p class="text-center font-semibold text-gray-600">
            {{ post.User.username }}
          </p>
          <StatusOnlineIcon
            v-if="$store.state.user.userId == post.User.id"
            class=" h-6 w-6 ml-1 text-green-400"
          />
          <p class="text-xs font-thin ml-2">
            {{ moment(post.createdAt).format("[le] DD MMMM YYYY") }}
          </p>
        </div>

        <!-- Si l'user est le propriétaire du post ou l'admin on l'autorise la modification ou la suppresion -->
        <div
          class="flex flex-2 items-center justify-center"
          v-if="
            $store.state.user.userId == post.User.id ||
              $store.state.user.isAdmin == true
          "
        >
          <button
            type="button"
            title="Modifer ce post"
            @click="modifyPost(post.id)"
          >
            <PencilIcon
              class="h-6 w-5 mr-4 text-gray-300 hover:text-gray-600"
            />
          </button>
          <modifyModal v-show="showModal" @close="closeModifyPost" />
          <button
            type="button"
            title="Supprimer ce post"
            @click="deletePost(post.id)"
          >
            <TrashIcon class="h-6 w-5 mr-2 text-red-400 hover:text-red-600" />
          </button>
        </div>
      </div>

      <div
        v-if="post.imageURL !== null"
        class="flex justify-center border my-4 max-h-80"
      >
        <img class="inline object-cover" :src="post.imageURL" />
      </div>

      <div
        v-if="post.link !== null"
        class="flex justify-center border my-4 max-h-80"
      >
        <img class="inline object-cover" :src="post.link" />
      </div>

      <div class="flex flex-wrap mx-4 my-2">
        <p class="text-left">{{ post.message }}</p>
      </div>

      <!-- Affichage du bouton like et commentaires, et de leurs compteurs -->
      <div class="flex items-center my-2 px-4">
        <div class="flex justify-between items-center mr-2">
          <button type="button" title="Liker" @click="likePost(post.id)">
            <HeartIcon :class="postLiked" />
          </button>
          <p class="text-xs font-light text-center">{{ post.Likes.length }}</p>
        </div>
        <div class="flex justify-between items-center">
          <button
            type="button"
            title="Accéder aux commentaires"
            @click="showComments = !showComments"
          >
            <AnnotationIcon
              class="h-6 w-6 mr-1 text-gray-300 hover:text-gray-600"
            />
          </button>
          <p class="text-xs font-light text-center">
            {{ post.Comments.length }}
          </p>
        </div>
      </div>

      <!-- Section commentaires -->
      <div
        class="flex flex-col w-full p-3 my-3 rounded-md bg-gray-50"
        v-show="showComments"
      >
        <form>
          <div class="flex items-center">
            <textarea
              v-model="data.comment"
              class="w-full rounded-md p-2 mr-2 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
              type="text"
              rows="1"
              placeholder="Votre commentaire"
              aria-label="Ecrire un commentaire"
            />
            <button
              type="button"
              title="Envoyer le commentaire"
              @click="commentPost(post.id)"
            >
              <ArrowCircleRightIcon
                class="h-6 w-6  text-gray-400 hover:text-gray-600"
                :disabled="!validatedFields"
                :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
              />
            </button>
          </div>
        </form>
        <div
          class="items-center p-2 
        "
        >
          <div
            v-for="comment of post.Comments"
            :key="comment.id"
            class="flex
            my-2 items-center"
          >
            <img
              v-if="comment.User.picture !== null"
              class="inline object-cover rounded-full h-8 w-8  mr-2"
              :src="comment.User.picture"
              alt="photo de profil"
            />
            <div
              class="flex-col items-center w-full p-2 bg-gray-100 rounded-xl"
            >
              <div class="flex items-center">
                <p class="text-sm font-semibold text-gray-600 mr-2">
                  {{ comment.User.username }}
                </p>
                <p class="text-xs font-thin">
                  {{
                    moment(comment.createdAt).format(
                      "[le] DD MMMM YYYY [à] HH:mm"
                    )
                  }}
                </p>
                <div
                  v-if="
                    $store.state.user.userId == comment.UserId ||
                      $store.state.user.isAdmin == true
                  "
                  class=""
                >
                  <button
                    type="button"
                    title="Supprimer ce commentaire"
                    @click="deleteComment(comment.id)"
                  >
                    <TrashIcon
                      class="h-4 w-4 ml-2 text-red-400 hover:text-red-600"
                    />
                  </button>
                </div>
              </div>
              <p class="text-sm font-light">{{ comment.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import modifyModal from "../components/PostModifyModal.vue";

import {
  PencilIcon,
  TrashIcon,
  StatusOnlineIcon,
  HeartIcon,
  AnnotationIcon,
  ArrowCircleRightIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Posts",

  components: {
    modifyModal,
    PencilIcon,
    TrashIcon,
    StatusOnlineIcon,
    HeartIcon,
    AnnotationIcon,
    ArrowCircleRightIcon,
  },

  data: () => ({
    comment: "",

    showComments: false, // La div des commentaires ne s'affiche pas à la base

    showModal: false, // Ni la modale permettant de modifier un post

    data: {
      comment: "",
    },
  }),

  props: {
    post: {
      type: Object,
    },
  },

  created: function() {
    this.moment = moment; // Permet le formatage de la date du post
    moment.locale("fr");
  },

  methods: {
    modifyPost(id) {
      (this.showModal = true), this.$router.push(`/posts/${id}`);
    },

    closeModifyPost() {
      this.showModal = false;
      this.$router.push("/wall");
    },

    deletePost(id) {
      this.$store.dispatch("deleteOnePost", id);
    },

    likePost(id) {
      this.$store.dispatch("postLike", id);
    },

    commentPost(id) {
      this.$store.dispatch("addComment", {
        id: id,
        data: this.data,
      });
      this.data.comment = ""; // Supprime le commentaire après l'envoi
    },

    deleteComment(id) {
      this.$store.dispatch("deleteOneComment", id);
    },
  },

  computed: {
    postLiked() {
      // Le bouton like reste en rose si l'user a déjà liké l'article
      const userId = this.$store.state.user.userId;
      let userLike = this.post.Likes.map((id) => id.UserId);
      if (userLike == userId) {
        // Egalité stricte ne fonctionne pas, à vérifier !
        return "h-6 w-6 mr-1 text-pink-600 ";
      } else {
        return "h-6 w-6 mr-1 text-gray-300 hover:text-pink-600";
      }
    },

    validatedFields: function() {
      if (this.data.comment != "") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
