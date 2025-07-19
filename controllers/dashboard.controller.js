const userModel = require("../models/user.model");
const { userSocketMap } = require("../config/socket");
const fs = require('fs');
const path = require('path');

class DashboardController {
  async addprofileForm(req, res) {
    try {
        const user=await userModel.findOne({_id:req.user._id})
        console.log(user,"333")
      res.render("addProfile",{user});
    } catch (error) {
      console.error(error);
      res.redirect("/login-form");
    }
  }
async addProfile(req, res) {
  try {
    const { fullName } = req.body;
    const id = req.user._id;
    const profileImage = req.file?.filename;

    // 1. Fetch existing user
    const user = await userModel.findById(id);

    // 2. Delete previous image if new one is uploaded and old one exists
    if (profileImage && user?.profilePic) {
      const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', user.profilePic);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // delete old file
      }
    }

    // 3. Prepare update fields
    const updateFields = { fullName };
    if (profileImage) {
      updateFields.profilePic = profileImage;
    }

    // 4. Update user
    const profile = await userModel.updateOne(
      { _id: id },
      { $set: updateFields }
    );

    // 5. Handle response
    if (profile.matchedCount > 0 && profile.modifiedCount > 0) {
      req.flash("success", "Profile updated successfully!");
    } else if (profile.matchedCount > 0) {
      req.flash("info", "No changes made to your profile.");
    } else {
      req.flash("error", "User not found.");
    }

    res.redirect("/chat-dashboard");
  } catch (error) {
    console.error("Something went wrong in addProfile:", error);
    req.flash("error", "An error occurred. Please try again.");
    res.redirect("/add-profile-form");
  }
}



  async loadChatDashboard(req, res) {
    try {
      const loggedInUserId = req.user._id;
      const users = await userModel
        .find({ _id: { $ne: loggedInUserId } })
        .select("-password");

    const onlineUserIds = Object.keys(userSocketMap);
        res.render("dashboard", { users,currentUser: req.user,onlineUsers: onlineUserIds });
    
      
    } catch (error) {
      console.error("Chat dashboard error:", error);
      req.flash("error", "Unable to load dashboard.");
      res.redirect("/login-form");
    }
  }
}

module.exports = new DashboardController();
