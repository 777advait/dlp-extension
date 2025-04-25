import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import * as DialogComponent from "@/components/ui/dialog";
import React from "react";
import RulesetForm from "@/components/popup/ruleset-form";
import RulesList from "@/components/popup/rules-list";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="">
      <Container>
        <div className="bg-card ring-muted/25 space-y-6 rounded-2xl border p-4 shadow-md ring-2 ring-inset">
          <h1 className="text-2xl font-bold">Data Loss Prevention</h1>
          <RulesList />
          <div className="flex justify-end">
            <DialogComponent.Dialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <DialogComponent.DialogTrigger>
                <Button size="sm">
                  <Plus /> Add Rule
                </Button>
              </DialogComponent.DialogTrigger>
              <DialogComponent.DialogContent>
                <DialogComponent.DialogHeader>
                  <DialogComponent.DialogTitle>
                    Add Rule
                  </DialogComponent.DialogTitle>
                  <DialogComponent.DialogDescription>
                    Create a new rule for upload/download
                  </DialogComponent.DialogDescription>
                </DialogComponent.DialogHeader>
                <RulesetForm setIsDialogOpen={setIsDialogOpen} />
              </DialogComponent.DialogContent>
            </DialogComponent.Dialog>
          </div>
        </div>
      </Container>
      <Toaster />
    </div>
  );
}
