import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function App() {
  return (
    <div>
      <Container>
        <div className="border bg-card p-4 rounded-2xl shadow-md ring-2 ring-inset ring-muted/25 space-y-6">
          <h1 className="text-2xl font-bold">Data Loss Prevention</h1>
          <div>
            
          </div>
          <div className="flex justify-end">
            <Button size="sm">
              <Plus className="" /> Add Rule
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
