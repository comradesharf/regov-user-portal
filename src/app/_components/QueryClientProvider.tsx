"use client";

import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export type QueryClientProvider = PropsWithChildren<{}>;

export default function QueryClientProvider({ children }: QueryClientProvider) {
    const [queryClient] = useState(() => new QueryClient());

    return <QCP client={queryClient}>{children}</QCP>;
}
