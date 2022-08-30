<template>
  <div class="user-playlist">
    <h2>My playlist</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
      <router-link :to="{ name: 'CreatePlaylist' }" class="btn">
        Create a new Playlist
      </router-link>
    </div>
  </div>
</template>

<script>
import ListView from "../../components/ListView.vue";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>

<style></style>
