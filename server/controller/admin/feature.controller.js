import Feature from "../../models/Feature.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    return res.status(201).json({ success: true, data: featureImages });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});

    return res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Feature.findByIdAndDelete(id);

    if (!deletedImage) {
      return res
        .status(404)
        .json({ success: false, message: "Feature image not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Feature image deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addFeatureImage, getFeatureImage, deleteFeatureImage };
