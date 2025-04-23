import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { TRulesets } from "@/utils/types/rulesets.types";
import { Plus } from "lucide-react";
import * as DialogComponent from "@/components/ui/dialog";
import React from "react";
import RulesetForm from "@/components/popup/ruleset-form";
import RulesList from "@/components/popup/rules-list";

export default function App() {
  const rulesets: TRulesets[] = [
    {
      id: 1,
      url: "https://google.com",
      uploadExtensions: [".pdf"],
      downloadExtensions: [".pdf"],
      blockUpload: true,
      blockDownload: true,
      enabled: true,
    },
    {
      id: 2,
      url: "https://facebook.com",
      uploadExtensions: [".pdf"],
      downloadExtensions: [".pdf"],
      blockUpload: true,
      blockDownload: true,
      enabled: true,
    },
    {
      id: 3,
      url: "https://ilovepdf.com",
      uploadExtensions: [".pdf"],
      downloadExtensions: [".pdf"],
      blockUpload: true,
      blockDownload: true,
      enabled: true,
    },
    {
      id: 4,
      url: "https://astro-dev.tech",
      enabled: true,
      blockDownload: true,
      blockUpload: true,
      downloadExtensions: [".pdf"],
      uploadExtensions: [".docx"],
    },
    {
      id: 5,
      url: "https://align-network.astro-dev.tech",
      enabled: true,
      blockDownload: true,
      blockUpload: true,
      downloadExtensions: [".pdf"],
      uploadExtensions: [".docx"],
    },
    {
      id: 5,
      url: "https://align-network-is-motherfuckning-super-long-subdomain.astro-dev.tech",
      enabled: true,
      blockDownload: true,
      blockUpload: true,
      downloadExtensions: [".pdf"],
      uploadExtensions: [".docx"],
    },
  ];

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div>
      <Container>
        <div className="bg-card ring-muted/25 space-y-6 rounded-2xl border p-4 shadow-md ring-2 ring-inset">
          <h1 className="text-2xl font-bold">Data Loss Prevention</h1>
          <RulesList rulesets={rulesets} />
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
                <RulesetForm />
              </DialogComponent.DialogContent>
            </DialogComponent.Dialog>
          </div>
        </div>
      </Container>
    </div>
  );
}
