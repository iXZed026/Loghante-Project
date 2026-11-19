"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

import { fetcher } from "@/lib/api/fetcher";
import { logout as logoutRequest } from "@/lib/api/auth/logout";
import { removeFromLocalStorage } from "@/lib/utils/localStorage";
import { useLocale } from "next-intl";

interface UserType {
    userTypeId: number;
    code: string;
    name: string;
    description: string;
}

interface UserRole {
    userRoleId: number;
    code: string;
    name: string;
    description: string;
}

interface Profile {
    user_Id: number;
    full_name: string;
    email: string | null;
    phone_number: string | null;
    dob: string | null;
    userTypeId?: number;
    userRoleId?: number;
    userType?: UserType;
    userRole?: UserRole;
}

interface ProfileResponse {
    data: Profile;
    message: string;
    success: boolean;
}

interface ProfileContextType {
    profile: Profile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    getProfile: () => Promise<void>;
    setProfile: (profile: Profile | null) => void;
    logout: () => Promise<void>;
    clearSession: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(
    undefined,
);

export function ProfileProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [profile, setProfileState] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const profileRequestId = useRef(0);
    const profileRequestController = useRef<AbortController | null>(null);

    const locale = useLocale();

    const setProfile = useCallback((nextProfile: Profile | null) => {
        profileRequestId.current += 1;
        profileRequestController.current?.abort();
        profileRequestController.current = null;
        setProfileState(nextProfile);
        setIsLoading(false);
    }, []);

    const getProfile = useCallback(async () => {
        const requestId = ++profileRequestId.current;
        profileRequestController.current?.abort();

        const controller = new AbortController();
        profileRequestController.current = controller;

        try {
            const response = await fetcher<ProfileResponse>("/profile", {
                signal: controller.signal,
            });

            if (requestId !== profileRequestId.current) {
                return;
            }

            if (response.success) {
                setProfileState(response.data);
                console.log("Profile fetched successfully:", response.data);
            } else {
                setProfileState(null);
            }
        } catch {
            if (requestId === profileRequestId.current && !controller.signal.aborted) {
                setProfileState(null);
            }
        } finally {
            if (requestId === profileRequestId.current) {
                profileRequestController.current = null;
                setIsLoading(false);
            }
        }
    }, []);

    // Send the logout request without clearing the current session.
    // The UI clears the session after showing the success modal.
    const logout = useCallback(async () => {
        const response = await logoutRequest(locale);

        if (!response.success) {
            throw new Error(
                response.message || "Logout failed. Please try again.",
            );
        }
    }, [locale]);

    const clearSession = useCallback(() => {
        profileRequestId.current += 1;
        profileRequestController.current?.abort();
        profileRequestController.current = null;
        removeFromLocalStorage("accessToken");
        setProfileState(null);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void getProfile();
        }, 0);

        return () => {
            window.clearTimeout(timeout);
            profileRequestId.current += 1;
            profileRequestController.current?.abort();
        };
    }, [getProfile]);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                isAuthenticated: !!profile,
                isLoading,
                getProfile,
                setProfile,
                logout,
                clearSession,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error(
            "useProfile must be used within ProfileProvider",
        );
    }

    return context;
}
