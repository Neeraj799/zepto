import ProductImageUpload from "@/components/admin/ProductImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common/commonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((item) => (
              <div>
                <div className="relative">
                  <img
                    src={item.image}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
