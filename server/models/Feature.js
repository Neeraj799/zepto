import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
