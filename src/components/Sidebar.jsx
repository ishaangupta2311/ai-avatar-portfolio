import { Button } from "@/components/ui/button";
import React from "react";
import PropTypes from "prop-types";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Share,
  SquareTerminal,
  SquareUser,
  Turtle,
} from "lucide-react";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className=" bg-gray-200">?</AvatarFallback>
        </Avatar>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <ModeToggle />
        <div className="flex flex-col place-content-between h-full py-4">
          <div className="flex flex-col items-center gap-1 py-4">
            <SidebarItem
              icon={<SquareTerminal className="size-5" />}
              text="Customize Avatar"
            />
            <SidebarItem
              icon={<Book className="size-5" />}
              text="Documentation"
            />
            <SidebarItem
              icon={<SquareUser className="size-5" />}
              text="Account"
            />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className="mt-auto flex flex-col items-center py-4">
            <SidebarItem icon={<LifeBuoy className="size-5" />} text="Help" />
            <SidebarItem
              icon={<Settings className="size-5" />}
              text="Settings"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SidebarItem({ icon, text, active }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start rounded-lg ${active ? "bg-accent" : ""}`}
      aria-label={text}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Button>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  active: PropTypes.bool,
};

SidebarItem.defaultProps = {
  active: false,
};
