import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsubscribe = documentRef.onSnapshot(
    (doc) => {
      if (!doc.data())
        return (error.value = "Sorry, playlist with this id does not exist");
      document.value = { ...doc.data(), id: doc.id };
      error.value = null;
    },
    (err) => {
      console.error(err.message);
      document.value = null;
      error.value = "could not fetch the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, document };
};

export default getDocument;
