//library imports
import { Link, useNavigate } from "react-router-dom";

// Shadcn imports
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

//logo imports
import logo from "../assets/LinkWhiz.png";
import { Link2, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";

import toast from "react-hot-toast";

const Header = () => {
  // using useNavigate from react router dom
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  const handleLogout = () => {
    toast
      .promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            fnLogout()
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }, 1000);
        }),
        {
          loading: "Logging out...",
          success: "logged out successfully",
          error: "Failed to logout",
        }
      )
      .then(() => {
        fetchUser();
        navigate("/");
      });
  };

  console.log(user);
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        {/* link form react router dom */}
        <Link to="/">
          <img src={logo} alt="LinkWhiz logo" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={() => navigate("auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-12 rounded-full overflow-hidden">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>HI</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <Link2 className="mr-2 h-2 w-4" />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-700 font-bold">
                  <LogOut className="mr-2 h-2 w-4" />
                  <span onClick={handleLogout}>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {/* using navigate that i declared earlier to navigate to auth  */}
        </div>
      </nav>
    </>
  );
};

export default Header;
