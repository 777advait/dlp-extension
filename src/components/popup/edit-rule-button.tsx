import * as DialogComponent from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function EditRuleButton() {
  return (
    <DialogComponent.Dialog>
      <DialogComponent.DialogTrigger asChild>
        <Button variant="link" size="sm" className="pl-0">
          Edit
        </Button>
      </DialogComponent.DialogTrigger>
      <DialogComponent.DialogContent>
        <DialogComponent.DialogHeader>
          <DialogComponent.DialogTitle>Edit Rules</DialogComponent.DialogTitle>
          <DialogComponent.DialogDescription>
            Edit the rules for upload/download
          </DialogComponent.DialogDescription>
        </DialogComponent.DialogHeader>
        <div>EditRuleButton</div>
      </DialogComponent.DialogContent>
    </DialogComponent.Dialog>
  );
}
