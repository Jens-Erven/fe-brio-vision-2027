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
      {/* Logo or brand */}
      <div
        className="text-xl font-semibold cursor-pointer no-drag"
        onClick={() => navigate({ to: "/briowebview" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 904 345"
          width="60"
          fill="none"
        >
          <g clipPath="url(#a)">
            <path
              fill="#009996"
              d="M133.5 344.8C83.7 344.8 0 320.3 0 196.2V0h57.1v187.7c0 88.1 38.6 99.9 76.3 99.9 24.4 0 42.8-6.8 54.6-20.1 12.3-13.9 15.9-32.4 16.7-45.5 1-15.3-.4-36.3-12.8-49.5-9.4-10-24.4-15.1-44.8-15.1h-56v-57.1h56c36.3 0 66.2 11.5 86.5 33.1 20.9 22.3 30.6 54.2 28.1 92.3-3.6 57.6-39.2 119.1-128.2 119.1Zm229.9 0h-57V195.4c0-28.9 13.4-55.9 36.8-74 28-21.7 67.1-28.1 107.3-17.7l-14.3 55.2c-23-6-44.2-3.2-58.1 7.6-9.5 7.3-14.7 17.6-14.7 28.9v149.4Zm181.801-243.7h-57v243.7h57V101.1Zm-3-101.1h-51v62.2h51V0Z"
            />
            <path
              fill="url(#b)"
              d="M832.4 215.5c-3.6-55.3-37.9-114.4-123.4-114.4h-2.8c-85.5 0-119.8 59.1-123.4 114.4-.2 2.5-.3 5-.3 7.5.1 2.5.1 5 .3 7.5 3.6 55.3 37.9 114.4 123.4 114.4h2.8c85.5 0 119.8-59.1 123.4-114.4.2-2.5.3-5 .3-7.5l-.3-7.5ZM777.6 227c-.8 12.6-4.3 30.3-16.1 43.7-11.3 12.8-29 19.3-52.5 19.3h-2.8c-23.5 0-41.2-6.5-52.5-19.3-11.8-13.4-15.3-31.1-16.1-43.7-.1-1.3-.1-2.6-.2-4 0-1.4.1-2.7.2-4 .8-12.6 4.3-30.3 16.1-43.7 11.3-12.8 29-19.3 52.5-19.3h2.8c23.5 0 41.2 6.5 52.5 19.3 11.8 13.4 15.3 31.1 16.1 43.7.1 1.3.1 2.6.2 4-.1 1.4-.2 2.7-.2 4Z"
            />
            <path
              fill="#F9D700"
              d="M903.9 143c-1.5-22.9-13.5-97.8-105.6-97.8h-2.5c-92 0-104 74.8-105.5 97.8-.1 2.1-.2 4.2-.3 6.6 0 2.1.1 4.1.3 6.3 1.3 20.8 11.4 84.5 82.2 96 3.3-8.8 4.6-17.7 5.1-24.8.1-1.3.1-2.6.2-4 0-1.4-.1-2.7-.2-4-.1-1.3-.2-2.8-.4-4.2-14.2-2.7-25.5-8.7-33.7-18-11.9-13.5-15.4-31-16.2-43.4-.1-1.2-.1-2.5-.2-3.8v-.4c0-1.3.1-2.6.2-3.8.8-12.4 4.3-29.9 16.2-43.4 11.5-13 29.1-19.6 52.3-19.6h2.6c23.2 0 40.8 6.6 52.3 19.6 11.9 13.5 15.4 31 16.2 43.4.1 1.2.1 2.5.2 3.8v.4c0 1.3-.1 2.6-.2 3.8-.8 12.4-4.3 29.9-16.2 43.4-5.1 5.8-11.4 10.2-18.8 13.5.2 1.7.3 3.4.4 5.2.2 2.5.3 5 .3 7.5-.1 2.5-.1 5-.3 7.5-.4 6.6-1.3 13.2-2.6 19.7 63.6-14.8 72.9-74.4 74.2-94.4.1-2.1.2-4.2.3-6.6-.1-2.1-.1-4.2-.3-6.3Z"
            />
          </g>
          <defs>
            <radialGradient
              id="b"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="rotate(17.679 -80.522 2398.452) scale(46.2449 83.9227)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".095" stopColor="#007371" />
              <stop offset=".606" stopColor="#009996" />
            </radialGradient>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h904v345H0z" />
            </clipPath>
          </defs>
        </svg>
      </div>
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
