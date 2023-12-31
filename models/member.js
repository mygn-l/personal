import mongoose from "mongoose";

const user_object = {
  username: String,
  password: String,
};

const user_schema = new mongoose.Schema(user_object);

const user_model = mongoose.model("User", user_schema);

export default user_model;
