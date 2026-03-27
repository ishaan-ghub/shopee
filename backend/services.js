import conn from "./dbConfig.js";
import bcrypt from "bcrypt";
import { existingEmail, sendResponse } from "./utility.js";

export async function getAllUsers() {
  const [res] = await conn.execute("SELECT * FROM shopUsers");
  return res;
}

export async function getUser(id) {
  const [[res]] = await conn.execute(
    `SELECT * FROM shopUsers
      where id = ?`,
    [id],
  );
  return res;
}

export async function loginUser(res, email, password) {
  const [[user]] = await conn.execute(
    `SELECT * FROM shopUsers where email = ?`,
    [email],
  );
  if (!user) {
    return sendResponse(res, 400, "User not found");
  }
  const correctPass = await bcrypt.compare(password, user.password);
  if (!correctPass) {
    return sendResponse(res, 400, "Incorrect password");
  }
  const data = { id: user.id, name: user.Name, email: email };
  return sendResponse(res, 200, "logged in successfully", data);
}

export async function signup(res, email, password, name) {
  try {
    if (!(email || email.trim()) || !(password || password.trim())) {
      return sendResponse(res, 401, "Email and password are required fields");
    }
    const hashedpass = await bcrypt.hash(password, 10);
    const exists = await existingEmail(email);
    if (exists) {
      return sendResponse(res, 400, "user already exists");
    }
    const [user] = await conn.execute(
      `INSERT INTO shopUsers(email, password, name) values(?, ?, ?)`,
      [email, hashedpass, name],
    );
    const data = { id: user.insertId, email: email, name: name };
    return sendResponse(res, 201, "User registered successfully", data);
  } catch (error) {
    if (error.message?.includes("email_valid")) {
      return sendResponse(res, 400, "Invalid email entered");
    }
    return sendResponse(res, 500, error.message);
  }
}

// // not used
// export async function updateUser(id, updates) {
//   // 1. Get the names of the fields being updated (e.g., ["email", "username"])
//   const keys = Object.keys(updates);
//   if (keys.length === 0) return null; // Nothing to update

//   // 2. Build the "SET column1=?, column2=?" string
//   const setClause = keys.map((key) => `${key} = ?`).join(", ");

//   // 3. Collect the values in the same order as the keys
//   const values = Object.values(updates);

//   // 4. Run the query (adding the ID at the end for the WHERE clause)
//   const [result] = await conn.execute(
//     `UPDATE users SET ${setClause} WHERE id = ?`,
//     [...values, id],
//   );

//   return result.affectedRows > 0;
// }

// const user = await signup("abey@gmail.com", "abhay12345", "Abhay");
// console.log(user);
