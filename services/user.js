import bcrypt from "bcrypt";

import member_model from "../models/member.js";

const user_service = {};

user_service.create_user = async function (username, password) {
  let hashed_password = await bcrypt.hash(password, 10);
  await member_model.create({
    username: username,
    password: hashed_password,
  });
};

user_service.change_username = async function (username, new_username) {
  await member_model.updateOne({ username: username }, { username: new_username });
};

user_service.change_password = async function (username, new_password) {
  let hashed_password = await bcrypt.hash(new_password, 10);
  await member_model.updateOne({ username: username }, { password: hashed_password });
};

user_service.get_user = async function (username) {
  return await member_model.findOne({ username: username }, "username password");
};

export default user_service;
