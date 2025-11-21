import { notFound } from "next/navigation"

import { DashboardHeader } from "~/components/header"
import { DashboardShell } from "~/components/shell"

interface MockPageProps {
    params: {
        slug: string
    }
}

export default function MockPage({ params }: MockPageProps) {
    const slug = params?.slug

    if (!slug) {
        return notFound()
    }

    const title = slug
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())

    return (
        <DashboardShell>
            <DashboardHeader heading={title} text="This feature is currently under development." />
            <div className="grid gap-10">
                <div className="flex h-[450px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <span className="text-4xl">🚧</span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Work in Progress</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                        We are working hard to bring you the <strong>{title}</strong> feature.
                        Check back soon for updates!
                    </p>
                </div>
            </div>
        </DashboardShell>
    )
}
