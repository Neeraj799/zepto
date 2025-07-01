import { userSignUpValidation } from "../../helpers/authValidation.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/createToken.js";

const userSignup = async (req, res) => {
  try {
    const { error } = userSignUpValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.log(error);
      return res.status(403).json({ error: error.details });
    }

    const { userName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({
      success: true,
      user: newUser,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { userSignup, userLogin };
