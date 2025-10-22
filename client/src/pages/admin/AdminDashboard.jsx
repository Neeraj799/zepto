import ProductImageUpload from "@/components/admin/ProductImageUpload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common/commonSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log("uploadedImageUrl", uploadedImageUrl);

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  const handleDeleteImage = (id) => {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Image deleted successfully!");
        dispatch(getFeatureImages());
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log("featureImageList", featureImageList);

  return (
    <div className="flex flex-col px-10 justify-center">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoading={setImageLoading}
        imageLoading={imageLoading}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-4">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-4">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((item) => (
            <div>
              <div className="relative">
                <img
                  src={item.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />

                <button
                  onClick={() => handleDeleteImage(item._id)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-100 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No feature images uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
