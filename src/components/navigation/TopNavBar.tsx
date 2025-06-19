import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftRight, History, PlusIcon, Workflow } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";

interface TopNavBarProps {
  title: string;
  url: string;
  icon?: React.ElementType;
  hasSubMenu: boolean;
}

const data: TopNavBarProps[] = [
  {
    title: "Dataverwerking",
    url: "#",
    icon: ArrowLeftRight,
    hasSubMenu: true,
  },
  {
    title: "Workflows",
    url: "#",
    icon: Workflow,
    hasSubMenu: false,
  },
  {
    title: "Rapportage",
    url: "#",
    hasSubMenu: true,
  },
  {
    title: "Hulpprogramma's",
    url: "#",
    hasSubMenu: true,
  },
  {
    title: "Over Brio",
    url: "#",
    hasSubMenu: true,
  },
];

export const TopNavBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (searchValue.trim()) {
      // Navigate to the dynamic vehicle route
      navigate({
        to: "/vehicle",
        search: {
          q: searchValue.trim(),
        },
      });

      // Optional: Clear the search after navigation
      setSearchValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  return (
    <nav
      className="w-full h-14 border-b flex items-center px-4 gap-4  z-10 bg-background sticky top-0"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Button variant={"outline"} size={"default"}>
        <PlusIcon />
        Betrokkene toevoegen
      </Button>

      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center max-w-lg w-full sm:w-[500px]"
      >
        <Input
          className="pl-8 pr-8"
          aria-label="Zoek"
          placeholder="Zoek op betrokkene, contract, schade, document, Brio functionaliteit of..."
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <History className="absolute right-2 h-4 w-4 text-gray-500" />
      </form>
      <Separator orientation="vertical" className="h-14" />
      <NavigationMenu>
        <NavigationMenuList>
          {data.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.hasSubMenu ? (
                <>
                  <NavigationMenuTrigger>
                    <div className="flex items-center gap-2 ">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <Link
                        to={item.url}
                        className="flex items-center gap-2 flex-row"
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    to={item.url}
                    className="flex items-center gap-2 flex-row"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
