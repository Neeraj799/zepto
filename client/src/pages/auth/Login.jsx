import CommonForm from "@/components/common/CommonForm";
import { loginFormControls } from "@/components/config";
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
    // 🟢 CHANGED: Wrapped everything in a flex container with min-h-screen to center vertically and horizontally
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-2 lg:px-8">
      {/* 🟢 CHANGED: Added responsive container styling */}
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-md">
        <div className="text-center">
          {/* 🟢 CHANGED: Added responsive font sizes and color for better readability */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h1>

          {/* 🟢 NEW: Added a small subheading for better UX */}
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and password to access your account.
          </p>
        </div>

        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          bottomText={
            // 🟢 CHANGED: Made bottom text centered and responsive
            <div className="text-center">
              <p className="text-sm text-gray-600">
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
