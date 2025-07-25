const mongoose=require( "mongoose")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports= User
