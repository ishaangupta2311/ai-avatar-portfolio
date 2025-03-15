import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export function BillingSettings({ plan, setPlan }) {
  return (
    <div className="space-y-6">
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
          <Button variant="ghost" className="ml-auto">
            Change
          </Button>
        </div>
      </div>
      <Button className="w-full">Update Billing Information</Button>
    </div>
  );
}
