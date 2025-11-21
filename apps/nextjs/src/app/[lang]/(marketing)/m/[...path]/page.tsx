import type { Metadata } from "next";
import type { Locale } from "~/config/i18n-config";

export const dynamic = 'force-dynamic';

interface MockPageProps {
    params: Promise<{
        lang: Locale;
        path: string[];
    }>;
}

export async function generateMetadata({
    params,
}: MockPageProps): Promise<Metadata> {
    const { path } = await params;
    const mockName = path.join("/");
    const title = mockName
        .split(/[_:&]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
        title: `${title} | MyBizAI`,
        description: `MyBizAI ${title}`,
    };
}

export default async function MockPage({ params }: MockPageProps) {
    const { path } = await params;
    const mockPath = path.join("/");
    const htmlUrl = `/api/mocks/${encodeURIComponent(mockPath)}/code.html`;

    return (
        <div className="flex flex-col h-screen w-full">
            <iframe
                src={htmlUrl}
                className="w-full h-full border-0"
                title={mockPath}
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        </div>
    );
}
