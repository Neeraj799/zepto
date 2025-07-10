import { LogOut, Menu, ShoppingCart, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";
import { DialogTitle } from "../ui/dialog";
import CartWrapper from "./CartWrapper";
import { fetchCartItems } from "@/store/user/cartSlice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();

  const handleNavigate = (menuItem) => {
    localStorage.removeItem("filters");
    const currentFilter =
      menuItem.id !== "home" && menuItem.id !== "products"
        ? {
            category: [menuItem.id],
          }
        : null;

    if (currentFilter) {
      localStorage.setItem("filters", JSON.stringify(currentFilter));
    }

    navigate(`${menuItem.path}?category=${menuItem.id}`);
  };
  return (
    <div className="flex flex-col mb-3 lg:mb-0 lg: items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </div>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCart);
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("User logged out successfully");
  };

  useEffect(() => {
    dispatch(fetchCartItems({ id: user?._id }));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center sm:flex-row flex-col gap-4 p-4">
      <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
        <Button onClick={() => setOpenCart(true)} className="cursor-pointer">
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only ">User cart</span>
        </Button>

        <CartWrapper
          setOpenCart={setOpenCart}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/user/account")}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
        <Link to="/user/home" className="flex items-center gap-2">
          <span className="font-bold">Zepto</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs"
            aria-describedby={undefined}
          >
            <DialogTitle className="text-lg font-semibold p-4">
              Main menu
            </DialogTitle>
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </div>
  );
};

export default Header;
