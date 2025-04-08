import { getDatabase } from "./database.js";
import bcrypt from "bcrypt";
import yup from "yup";

const userSchema = yup.object({ // validation schema for user creation
  username: yup.string().required(),
  password: yup.string().min(5).required(),
  email: yup.string().email().optional(),
  fName: yup.string().optional(),
  lName: yup.string().optional(),
  date_of_birth: yup.date().optional(),
  bio: yup.string().optional(),
  avatar: yup.string().optional(),
}).required();

const updateUserSchema = yup.object({ // validation schema for user updates
  password: yup.string().nullable(),
  email: yup.string().email(),
  fName: yup.string(),
  lName: yup.string(),
  date_of_birth: yup.date().nullable(),
  bio: yup.string(),
  avatar: yup.string(),
}).required();

export async function createUser(userData) {
  const db = await getDatabase();
  await userSchema.validate(userData); // Validate user data

  const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash password
  const { username, email = "", fName = "", lName = "", date_of_birth = new Date, bio = "", avatar = "" } = userData;

  try {
    await db.run(
      `INSERT INTO User (username, password, email, fName, lName, date_of_birth, bio, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, email, fName, lName, date_of_birth, bio, avatar]
    );
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw new Error("Unable to create user");
  }
}

export async function getUserWithUsername(username) {
  const db = await getDatabase();
  return await db.get(`SELECT * FROM User WHERE username = ?`, [username]);
}

export async function updateUser(username, updates) {
  const db = await getDatabase();
  await updateUserSchema.validate(updates);

  const currentUser = await getUserWithUsername(username);

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  } else {
    updates.password = currentUser.password;
  }

  const email = updates.email || currentUser.email;
  const fName = updates.fName || currentUser.fName;
  const lName = updates.lName || currentUser.lName;
  const bio = updates.bio || currentUser.bio;
  const avatar = updates.avatar || currentUser.avatar;
  const dateOfBirth = updates.date_of_birth || currentUser.date_of_birth;

  await db.run(
    `UPDATE User SET email = ?, fName = ?, lName = ?, password = ?, bio = ?, avatar = ?, date_of_birth = ? WHERE username = ?`,
    [email, fName, lName, updates.password, bio, avatar, dateOfBirth, username]
  );
}

export async function deleteUser(username) {
  const db = await getDatabase();
  await db.run(`DELETE FROM User WHERE username = ?`, [username]);
}
