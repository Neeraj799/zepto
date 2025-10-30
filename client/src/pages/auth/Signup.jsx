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
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Create new account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your details to register a new account.
          </p>
        </div>

        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          bottomText={
            <div className="text-center">
              <p className="text-sm text-gray-600">
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
