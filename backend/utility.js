import conn from "./dbConfig.js";

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