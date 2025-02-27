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

const Header = () => {
  // using useNavigate from react router dom
  const navigate = useNavigate();
  // user is not logged in by default
  const user = true;
  return (
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>HI</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Hamza Ishaq</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link2 className="mr-2 h-2 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-700 font-bold">
                <LogOut className="mr-2 h-2 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* using navigate that i declared earlier to navigate to auth  */}
      </div>
    </nav>
  );
};

export default Header;
