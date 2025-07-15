import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddress,
  updateAddress,
} from "@/store/user/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
  };
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.userAddress);

  const handleAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add maximum of 3 addresses");
      return;
    }

    currentEditId !== null
      ? dispatch(
          updateAddress({
            userId: user?._id,
            addressId: currentEditId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?._id));
            setCurrentEditId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?._id,
          })
        ).then((data) => {
          console.log(data);

          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?._id));
            setFormData(initialAddressFormData);
            toast.success("Address added successfully");
          }
        });
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    console.log("address", getCurrentAddress);

    dispatch(
      deleteAddress({
        userId: user?._id,
        addressId: getCurrentAddress?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?._id));
        toast.success("Address deleted successfully");
      }
    });
  };

  const handleEditAddress = (getCurrentAddress) => {
    console.log("address", getCurrentAddress);

    setCurrentEditId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address || "",
      city: getCurrentAddress?.city || "",
      phone: getCurrentAddress?.phone || "",
      pincode: getCurrentAddress?.pincode || "",
      notes: getCurrentAddress?.notes || "",
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?._id));
  }, [dispatch]);

  console.log("addressList", addressList);

  return (
    <>
      <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {addressList && addressList.length > 0 ? (
            addressList.map((item) => (
              <AddressCard
                selectedId={selectedId}
                key={item._id}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                addressInfo={item}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-xl">
            {currentEditId !== null ? "Edit Address" : "Add New Address"}
          </CardTitle>

          <CardContent className="py-6">
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditId !== null ? "Update" : "Add"}
              onSubmit={handleAddress}
              isBtnDisabled={!isFormValid()}
            />
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default Address;
