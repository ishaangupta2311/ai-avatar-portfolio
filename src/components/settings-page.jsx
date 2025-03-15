//src/components/settings-page.jsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarSettings } from "@/components/settings-page/Avatar-settings";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  User,
  Box,
  CreditCard as BillingIcon,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Image } from "next/image";
import { getSignedURL } from "@/lib/utils/actions";
import { BillingSettings } from "./settings-page/Billing-settings";
import { AccountSettings } from "./settings-page/Account-settings";

export function SettingsPageComponent() {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState("AI enthusiast and 3D clone creator");
  const [plan, setPlan] = useState("pro");
  const [twoFactor, setTwoFactor] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const { theme, setTheme } = useTheme();
  const [file, setFile] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const computeSHA256 = async (file) => {
    try {
      // Check if crypto.subtle is available
      if (!window.crypto || !window.crypto.subtle) {
        console.error("Web Crypto API is not available in this environment");
        throw new Error("Web Crypto API is not available");
      }

      const buffer = await file.arrayBuffer();
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

      // Convert to Base64 for AWS S3
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const base64Hash = btoa(String.fromCharCode.apply(null, hashArray));

      console.log("Generated Base64 SHA-256 hash:", base64Hash);
      return base64Hash;
    } catch (error) {
      console.error("Error computing SHA-256 hash:", error);
      throw error;
    }
  };

  const handleSave = async (e) => {
    console.log("Creating signed url");
    setLoading(true);
    try {
      console.log("Checking if file exists");
      if (file) {
        console.log("File exists");
        console.log("creating checksum for File");

        const checksum = await computeSHA256(file);

        console.log("created checksum");
        console.log("getting signed url");

        const signedUrlResult = await getSignedURL(
          file.type,
          file.size,
          checksum
        );

        console.log("created signed url");

        if (signedUrlResult.failure !== undefined) {
          console.log("Failed to get signed url");
          throw new Error(signedUrlResult.failure);
        }

        const url = signedUrlResult.success.url;

        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
        console.log("Uploading File");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      return;
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "avatar", label: "3D Avatar", icon: Box },
    { id: "billing", label: "Billing", icon: BillingIcon },
    { id: "account", label: "Account", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border bg-background">
                <AvatarImage
                  // src="/placeholder.svg?height=96&width=96"
                  alt={name}
                />
                <AvatarFallback className="bg-muted">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="secondary">Change Avatar</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="file"
                  onChange={handleResumeChange}
                  id="resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </div>
              {/* {fileUrl && (
                <Image src={fileUrl} alt='resume Preview' />  // TODO: Show preview of resume
              )} */}
            </div>
            <Button disabled={isLoading} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        );
      case "avatar":
        return <AvatarSettings />;
      case "billing":
        return <BillingSettings plan={plan} setPlan={setPlan} />;
      case "account":
        return (
          <AccountSettings
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            twoFactor={twoFactor}
            setTwoFactor={setTwoFactor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <div className="bg-card rounded-3xl overflow-hidden border shadow-sm">
          <main className="p-6">
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-3xl font-bold mb-6">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h1>
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
      <TooltipProvider>
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background rounded-full shadow-md p-2 border">
          <ul className="flex space-x-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className={`rounded-full p-3 ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="h-6 w-6" />
                      <span className="sr-only">{tab.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tab.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </TooltipProvider>
    </div>
  );
}
