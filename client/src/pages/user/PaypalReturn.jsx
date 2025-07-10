import { Card, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/user/orderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(localStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          localStorage.removeItem("currentOrderId");
          window.location.href = "/user/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div>
      <Card>
        <CardTitle>Processing payment...Please wait!</CardTitle>
      </Card>
    </div>
  );
};

export default PaypalReturn;
