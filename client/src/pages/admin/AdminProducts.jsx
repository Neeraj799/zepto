import ListProducts from "@/components/admin/ListProducts";
import ProductImageUpload from "@/components/admin/ProductImageUpload";
import CommonForm from "@/components/common/CommonForm";
import { addProductFormElements } from "@/components/config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "@/store/admin";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (currentId !== null) {
        dispatch(
          updateProduct({
            id: currentId,
            formData,
          })
        ).then((data) => {
          console.log(data);

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductDialog(false);
            setCurrentId(null);
          }
        });
      } else {
        const result = await dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        );
        console.log("data", result);
        if (result?.payload?.success) {
          setOpenCreateProductDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          toast.success("Product added successfully");
          dispatch(fetchAllProducts());
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const handleDelete = (productId) => {
    console.log("productId", productId);

    dispatch(deleteProduct(productId)).then((data) => {
      console.log(data);

      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log("data", productList);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add new Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <ListProducts
                key={productItem._id}
                product={productItem}
                onEdit={() => {
                  setFormData(productItem);
                  setCurrentId(productItem._id);
                  setOpenCreateProductDialog(true);
                }}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle>
              {currentId !== null ? "Edit Product" : "Add new Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            currentId={currentId}
          />
          <div className="px-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentId !== null ? "Update" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
