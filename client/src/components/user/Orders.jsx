import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/user/orderSlice";
import { Badge } from "../ui/badge";
import OrderDetails from "./OrderDetails";

const Orders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.userOrder);

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrderDetails(id));
  };

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?._id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  console.log("orderDetails", orderDetails);

  return (
    <div>
      <Card>
        <CardHeader>Order History</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((item) => (
                    <TableRow key={item?._id}>
                      <TableCell>{item?._id}</TableCell>
                      <TableCell>{item?.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge orderDetails>{item?.orderStatus}</Badge>
                      </TableCell>
                      <TableCell>{item?.totalAmount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleFetchOrderDetails(item?._id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog
        open={openDetailsDialog}
        onOpenChange={() => {
          setOpenDetailsDialog(false);
          dispatch(resetOrderDetails());
        }}
      >
        <DialogContent>
          <DialogTitle>Order Details</DialogTitle>
          <OrderDetails orderDetails={orderDetails} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
