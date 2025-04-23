import * as DialogComponent from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useChromeStorage } from "@/utils/hooks/useChromeStorage";
import { TRuleset } from "@/utils/types/rulesets.types";
import { toast } from "sonner";
import React from "react";

export default function DeleteRuleButton({ ruleId }: { ruleId: string }) {
  const { data: rulesets, setItem } = useChromeStorage<TRuleset[]>("rulesets");
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      if (!rulesets) return;

      const updatedRulesets = rulesets.filter((rule) => rule.id !== ruleId);

      await setItem(updatedRulesets);

      toast.success("Rule deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete rule");
    }
  };

  return (
    <DialogComponent.Dialog open={open} onOpenChange={setOpen}>
      <DialogComponent.DialogTrigger asChild>
        <Button variant="link" size="sm" className="text-destructive">
          Delete
        </Button>
      </DialogComponent.DialogTrigger>
      <DialogComponent.DialogContent>
        <DialogComponent.DialogHeader>
          <DialogComponent.DialogTitle>
            Are you absolutely sure?
          </DialogComponent.DialogTitle>
          <DialogComponent.DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this rule?
          </DialogComponent.DialogDescription>
        </DialogComponent.DialogHeader>
        <DialogComponent.DialogFooter>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogComponent.DialogFooter>
      </DialogComponent.DialogContent>
    </DialogComponent.Dialog>
  );
}
