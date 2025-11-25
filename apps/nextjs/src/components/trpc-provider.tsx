"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink } from "@trpc/client";
import { useState } from "react";

import { api } from "~/utils/api";
import { endingLink, transformer } from "~/trpc/shared";

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        endingLink({
           headers: {
             "x-trpc-source": "client",
           }
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
