import { TRulesets } from "@/utils/types/rulesets.types";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

export default function RulesList({ rulesets }: { rulesets: TRulesets[] }) {
  return (
    <>
      {rulesets.length > 0 ? (
        <ScrollArea className="h-[300px]">
          {rulesets.map((ruleset) => (
            <div
              key={ruleset.id}
              className="bg-background ring-background/50 mb-2 rounded-md border px-4 py-2 ring-1 ring-inset last:mb-0"
            >
              <div className="space-y-2">
                <h2 className="truncate text-lg font-semibold">
                  {new URL(ruleset.url).host}
                </h2>
                <div className="flex items-center space-x-1 text-xs">
                  <Button variant="link" size="sm" className="pl-0">
                    Edit
                  </Button>
                  <span>&bull;</span>
                  <Button variant="link" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className="flex justify-center">
          <p className="text-muted-foreground text-center">
            No rules configured yet!
          </p>
        </div>
      )}
    </>
  );
}
