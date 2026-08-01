const User = require("../models/user");

module.exports.renderSignUpform = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to VistaStay");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
module.exports.renderLoginform = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.renderForgotPasswordForm = (req, res) => {
  res.render("users/forgot-password.ejs");
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    if (!password || !confirmPassword || password !== confirmPassword) {
      req.flash("error", "Passwords do not match.");
      return res.redirect("/forgot-password");
    }

    const lookup = email || username;
    const user = await User.findOne({
      $or: [{ email: lookup }, { username: lookup }],
    });

    if (!user) {
      req.flash("error", "No account found with that email or username.");
      return res.redirect("/forgot-password");
    }

    await user.setPassword(password);
    await user.save();

    req.flash("success", "Password reset successful. Please log in again.");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message || "Unable to reset password.");
    res.redirect("/forgot-password");
  }
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to VistaStay!");
  let redirectUrl = res.locals.redirectUrl || "listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged out now");
    res.redirect("/listings");
  });
};
