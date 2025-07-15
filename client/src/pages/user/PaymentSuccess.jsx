import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="p-10">
        <div>
          <CardHeader className="p-0">
            <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
          </CardHeader>
          <Button className="mt-4" onClick={() => navigate("/user/account")}>
            View Orders
          </Button>
        </div>
      </Card>
    </>
  );
};

export default PaymentSuccess;
