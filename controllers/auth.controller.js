const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  async registerForm(req, res) {
    try {
      res.render("register");
    } catch (error) {
      console.error(error);
      res.redirect("/register-form");
    }
  }

  async registerUser(req, res) {
    try {
      const { fullName, email, password } = req.body;

      let isEmailExists = await userModel.findOne({ email });
      if (isEmailExists) {
        req.flash("error", "Email already exists!");
        return res.redirect("/register-form");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        fullName,
        email,
        password: hashPassword,
      });

      if (user) {
        req.flash("success", "Registration successfully!");
        return res.redirect("/login-form");
      }
    } catch (error) {
      console.error("Register error:", error);
      req.flash("error", "Something went wrong during registration!");
      res.redirect("/register-form");
    }
  }

  async loadLogin(req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.error(error);
      res.redirect("/login-form");
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
        req.flash("error", "Invalid credentials!");
        return res.redirect("/login-form");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        req.flash("error", "Invalid credentials!");
        return res.redirect("/login-form");
      }

      // User is authenticated, now create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // expires in 1 hour
      );
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
      });
      req.user = user;

      req.flash("success", "Logged in successfully!");
      res.redirect("/chat-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      req.flash("error", "Something went wrong! Please try again.");
      res.redirect("/login-form");
    }
  }


async logout(req, res) {
  try {
    res.clearCookie("connect.sid"); // Make sure the cookie name matches your session cookie name
    res.clearCookie("token"); // Make sure the cookie name matches your session cookie name
    return res.redirect("/login-form");
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).send("Something went wrong during logout.");
  }
}

}

module.exports = new AuthController();
