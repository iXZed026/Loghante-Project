// (auth)/layout.tsx

import AuthHeader from "@/features/auth/components/AuthHeader";
import { cn } from "@/lib/utils/cn";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-screen bg-crimson fcc">
            <div className={cn(
                "w-130 min-h-144",
                "px-12 py-15",
                "bg-white-utility",
                "rounded-xl"
            )}>
                <AuthHeader />
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}