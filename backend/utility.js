import conn from "./dbConfig.js";
import jwt from "jsonwebtoken"

export const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

export async function existingEmail(email) {
  const [existing] = await conn.execute(
    "SELECT 1 FROM shopUsers WHERE email = ?",
    [email],
  );
  return existing[0];
}

export function setAuthToken(userData, expiry, res){
let jwtsecret = process.env.JWT_SECRET;
let token = jwt.sign({userData}, jwtsecret, { expiresIn: expiry });
res.cookie("token", token)
}