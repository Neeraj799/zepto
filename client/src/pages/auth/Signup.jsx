import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/components/config";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
        console.log("data", data);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          bottomText={
            <div className="w-lg">
              <p className="">
                Already have an account?
                <Link
                  className="font-medium ml-1 text-primary hover:underline"
                  to="/auth/login"
                >
                  Login
                </Link>
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Signup;
