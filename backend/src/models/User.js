import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  usu_name: String,
  usu_email: String,
  usu_password: String,
  usu_provider: Boolean,
});

export default mongoose.model("User", UserSchema);
