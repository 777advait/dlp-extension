import * as DialogComponent from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import EditRulesetForm from "./edit-ruleset-form";

export default function ViewRuleButton({ ruleId }: { ruleId: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogComponent.Dialog open={open} onOpenChange={setOpen}>
      <DialogComponent.DialogTrigger asChild>
        <Button variant="link" size="sm" className="pl-0">
          View Rules
        </Button>
      </DialogComponent.DialogTrigger>
      <DialogComponent.DialogContent>
        <DialogComponent.DialogHeader>
          <DialogComponent.DialogTitle>View Rules</DialogComponent.DialogTitle>
          <DialogComponent.DialogDescription>
            View the rules for upload/download
          </DialogComponent.DialogDescription>
        </DialogComponent.DialogHeader>
        <EditRulesetForm ruleId={ruleId} setOpenDialog={setOpen} />
      </DialogComponent.DialogContent>
    </DialogComponent.Dialog>
  );
}
