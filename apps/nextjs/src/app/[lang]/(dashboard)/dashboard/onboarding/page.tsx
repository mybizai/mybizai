import { BusinessOnboardingWizard } from "~/components/onboarding/business-onboarding-wizard";

export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12">
            <div className="w-full max-w-4xl px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Welcome to MyBizAI
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Let's tailor your experience. Are you starting fresh or growing an existing empire?
                    </p>
                </div>
                <BusinessOnboardingWizard />
            </div>
        </div>
    );
}
