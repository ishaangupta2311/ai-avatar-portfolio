"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UserOnboardingForm() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-gray-600">Let&apos;s get to know you better</p>
      </header>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Information</CardTitle>
          <CardDescription>
            This information helps the chatbot give better responses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="about">Write few lines about yourself</Label>
            <Textarea id="about" placeholder="Tell us about yourself..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="career">Describe your career</Label>
            <Textarea
              id="career"
              placeholder="Describe your professional experience..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Upload your Resume</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 shadow-inner">
              <Input id="resume" type="file" className="hidden" />
              <Label htmlFor="resume" className="cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drag and drop files or Browse
                </span>
              </Label>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PDF, Docx
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked)}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept our Terms and Conditions
            </Label>
          </div>
          <Button className="w-full" disabled={!acceptedTerms}>
            Go to Avatar customization
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
