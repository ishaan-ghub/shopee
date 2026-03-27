import { getAllUsers, getUser, loginUser, signup } from "./services.js";
import { sendResponse } from "./utility.js";
import express from "express";

const router = express.Router()

router.get("/get-all-users", async (_req, res) => {
  try {
    const allusers = await getAllUsers();
    if (!allusers) {
      return sendResponse(res, 404, "no users found");
    }
    return sendResponse(res, 200, "all users fetched successfully", allusers);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

router.get("/get-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(parseInt(id));
    if (!user) {
      return sendResponse(res, 404, "user not found");
    }
    return sendResponse(res, 200, "successfully retrieved user", user);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    return await loginUser(res, email, password);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    return await signup(res, email, password, name);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

export default router;