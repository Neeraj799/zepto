import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  console.log("selectedId", selectedId);

  return (
    <div>
      <Card
        onClick={() =>
          setCurrentSelectedAddress
            ? setCurrentSelectedAddress(addressInfo)
            : null
        }
        className={`cursor-pointer border-blue-600 ${
          selectedId?._id === addressInfo?._id
            ? "border-blue-900 border-[4px]"
            : "border-black"
        }`}
      >
        <CardContent className="grid gap-4">
          <Label>Address: {addressInfo?.address}</Label>
          <Label>City: {addressInfo?.city}</Label>
          <Label>Pincode: {addressInfo?.pincode}</Label>
          <Label>Phone: {addressInfo?.phone}</Label>
          <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => handleEditAddress(addressInfo)}>Update</Button>
          <Button onClick={() => handleDeleteAddress(addressInfo)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;
