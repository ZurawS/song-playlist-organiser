import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);
  let docRef = projectFirestore.collection(collection).doc(id);

  // add a new document
  const deleteDoc = async () => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      console.error(err.message);
      error.value = "could not delete playlist";
      isPending.value = false;
    }
  };

  //change existing document
  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err);
      isPending.value = false;
      error.value = "could not update the document";
    }
  };

  return { error, deleteDoc, updateDoc, isPending };
};

export default useDocument;
