import { writable } from "svelte/store";

const storedUserData = JSON.parse(sessionStorage.getItem("userData")) || {
  username: "",
  password: "",
  email: "",
  fName: "",
  lName: "",
  date_of_birth: "",
  bio: "",
  avatar: ""
};

export const userDataStore = writable(storedUserData);

export function updateUserDataStore(userData) {
  userDataStore.set(userData);
  sessionStorage.setItem("userData", JSON.stringify(userData));
}


