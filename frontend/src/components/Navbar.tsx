import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu.tsx";

import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  path: string;
};

export default function Navbar() {
  const navBarOptions: NavItem[] = [
    { label: "Home", path: "/home" },
    { label: "Build", path: "/build" },
    { label: "Race", path: "/race" },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navBarOptions.map((option) => (
          <NavigationMenuItem key={option.label}>
            <NavigationMenuLink asChild>
              <Link to={option.path}>{option.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
