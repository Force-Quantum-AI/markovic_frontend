"use client";

import React from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface SubscriptionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClick: () => void;
}

export default function SubscriptionEndModal({
    open,
    onOpenChange,
    onClick,
}: SubscriptionModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
            <DialogContent className="overflow-hidden border-0 p-0 sm:max-w-md rounded-3xl"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                {/* Background Image */}
                <div className="relative">
                    <Image
                        src="/lawImg1.jpg"
                        alt="Subscription"
                        fill
                        className="object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

                    {/* Content */}
                    <div className="relative z-10 px-8 py-10 text-center text-white backdrop-blur-sm">
                        {/* Crown Icon */}
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_0_40px_rgba(251,191,36,0.5)]">
                            <Crown className="h-10 w-10 text-white" />
                        </div>

                        <DialogHeader className="space-y-3">
                            <DialogTitle className="text-3xl font-bold">
                                Subscription Required
                            </DialogTitle>

                            <DialogDescription className="text-base leading-7 text-gray-200">
                                Your <span className="font-semibold text-white">trial period</span>{" "}
                                has ended or your subscription has expired.
                                Upgrade now to continue enjoying all premium features without
                                interruption.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Features */}
                        <div className="mt-6 space-y-2 text-sm text-gray-200">
                            <p>✓Unlimited Cases.</p>
                            <p>✓Clients, Calendar, Hearings & Deadlines.</p>
                            <p>✓ Documents Management.</p>
                            <p>✓ Laws & Bylaws Module.</p>
                            <p>✓ AI Court Practice Search.</p>
                            <p>✓ Global Search & Archive.</p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 space-y-3">
                            <Button
                                onClick={onClick}
                                className="w-full rounded-xl py-6 text-base font-semibold
                bg-amber-400 hover:bg-amber-500 cursor-pointer hover:text-white
                text-black shadow-xl transition-all duration-300 hover:scale-[1.02]"
                            >
                                Upgrade Now
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}