import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, FOOTER_COPY } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-chart-5">
            <MessageSquare size={14} className="text-chart-1" />
          </div>
          <span className="font-serif text-base font-semibold text-chart-5">
            {SITE_CONFIG.name}
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground/70">
          {FOOTER_COPY.tagline}
        </p>

        <div className="flex items-center gap-1">
          {FOOTER_COPY.links.map((link) => (
            <Button key={link.href} variant="link" size="default" asChild>
              <Link href={link.href} className="text-xs text-muted-foreground/70 min-h-[44px] px-3">
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
