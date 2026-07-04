"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
        Something went wrong!
      </h2>
      <p className="text-lg text-[var(--color-text-muted)] mb-8">
        An unexpected error occurred. We have been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
      </div>
    </div>
  );
}
