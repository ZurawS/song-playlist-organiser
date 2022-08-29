<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    />

    <label for="file">Upload playlist cover image</label>
    <input @change="handleChange" id="file" type="file" />
    <p class="error" v-if="fileError">{{ fileError }}</p>

    <button v-if="!isPending" :disabled="isPending">Create</button>
    <button v-if="isPending" :disabled="!isPending">Creating...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();
    const isPending = ref(false);
    const router = useRouter();

    const handleSubmit = async () => {
      if (!file.value) return;
      isPending.value = true;
      await uploadImage(file.value);
      console.log("Image uploaded under url: ", url.value);

      const res = await addDoc({
        title: title.value,
        description: description.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        url: url.value,
        filePath: filePath.value,
        songs: [],
        createdAt: timestamp(),
      });

      if (!error.value)
        router.push({ name: "PlaylistDetails", params: { id: res.id } });
      isPending.value = false;
    };

    const allowedTypes = ["image/png", "image/jpeg"];
    const handleChange = (e) => {
      const selected = e.target.files[0];

      if (selected && allowedTypes.includes(selected.type)) {
        fileError.value = null;
        return (file.value = selected);
      }
      file.value = null;
      return (fileError.value = "Please select an image file (png or jpeg)");
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
    };
  },
};
</script>

<style>
form {
  background: #fefefe;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
