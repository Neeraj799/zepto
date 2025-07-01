import CommonForm from "@/components/common/CommonForm";
import { loginFormControls, registerFormControls } from "@/components/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        console.log("Success data:", data);
        toast.success(data?.payload?.message);
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
            Sign in to your account
          </h1>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          bottomText={
            <div className="w-lg">
              <p className="">
                Don't have an account?
                <Link
                  className="font-medium ml-1 text-primary hover:underline"
                  to="/auth/signup"
                >
                  Signup
                </Link>
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Login;
