'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Upload, CreditCard, LogOut, User, Box, CreditCard as BillingIcon, Settings, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export function SettingsPageComponent() {
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john@example.com')
  const [bio, setBio] = useState('AI enthusiast and 3D clone creator')
  const [plan, setPlan] = useState('pro')
  const [twoFactor, setTwoFactor] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const { theme, setTheme } = useTheme()

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'avatar', label: '3D Avatar', icon: Box },
    { id: 'billing', label: 'Billing', icon: BillingIcon },
    { id: 'account', label: 'Account', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          (<div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border bg-background">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={name} />
                <AvatarFallback className="bg-muted">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="secondary">Change Avatar</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <div className="flex items-center space-x-4">
                <Button variant="secondary">
                  <Upload className="mr-2 h-4 w-4" /> Upload Resume
                </Button>
                <span className="text-sm text-muted-foreground">No file chosen</span>
              </div>
            </div>
            <Button>Save Changes</Button>
          </div>)
        );
      case 'avatar':
        return (
          (<div className="space-y-6">
            <div
              className="h-[300px] bg-muted rounded-lg flex items-center justify-center border">
              <span className="text-muted-foreground">3D Avatar Customization Coming Soon</span>
            </div>
          </div>)
        );
      case 'billing':
        return (
          (<div className="space-y-6">
            <div className="space-y-2">
              <Label>Current Plan</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Plan</SelectItem>
                  <SelectItem value="pro">Pro Plan</SelectItem>
                  <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex items-center space-x-4 bg-muted p-4 rounded-lg border">
                <CreditCard className="h-6 w-6" />
                <span>•••• •••• •••• 4242</span>
                <Button variant="ghost" className="ml-auto">Change</Button>
              </div>
            </div>
            <Button className="w-full">Update Billing Information</Button>
          </div>)
        );
      case 'account':
        return (
          (<div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates about your account activity</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <Button variant="secondary" className="w-full">Change Password</Button>
            <Button variant="destructive" className="w-full"><LogOut className="mr-2 h-4 w-4" /> Sign Out</Button>
          </div>)
        );
      default:
        return null
    }
  }

  return (
    (<div className="min-h-screen bg-background text-foreground p-8 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
                  transition={{ duration: 0.2 }}>
                  <h1 className="text-3xl font-bold mb-6">{tabs.find(tab => tab.id === activeTab)?.label}</h1>
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
      <TooltipProvider>
        <nav
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background rounded-full shadow-md p-2 border">
          <ul className="flex space-x-1">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      className={`rounded-full p-3 ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : ''}`}
                      onClick={() => setActiveTab(tab.id)}>
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
    </div>)
  );
}