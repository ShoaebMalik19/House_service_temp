import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-[var(--color-primary)] mb-6">
        404
      </h2>
      <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-4">
        Page Not Found
      </h3>
      <p className="text-lg text-[var(--color-text-muted)] max-w-md mx-auto mb-8">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button href="/" size="lg">
        Return Home
      </Button>
    </div>
  );
}
