"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import type { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";

import { Button } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { Modal } from "~/components/modal";
import { siteConfig } from "~/config/site";
import { useSigninModal } from "~/hooks/use-signin-modal";
import { env } from "~/env.mjs";

export const SignInClerkModal = ({ dict }: { dict: Record<string, string> }) => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);
  const { signIn } = useSignIn();

  const signInWith = useCallback(
    async (strategy: OAuthStrategy) => {
      if (!signIn) {
        return;
      }

      try {
        const origin =
          typeof window !== "undefined" ? window.location.origin : env.NEXTAUTH_URL;

        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: "/sign-in/sso-callback",
          redirectUrlComplete: `${origin}/dashboard`,
        });
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "errors" in error) {
          console.error("Clerk sign-in failed", (error as { errors: unknown }).errors);
        } else {
          console.error("Sign-in failed", error);
        }
        throw error;
      }
    },
    [signIn],
  );

  const handleGithubSignIn = useCallback(async () => {
    if (!signIn) {
      return;
    }

    setSignInClicked(true);
    try {
      await signInWith("oauth_github");
      setTimeout(() => {
        signInModal.onClose();
        setSignInClicked(false);
      }, 1000);
    } catch {
      setSignInClicked(false);
    }
  }, [signIn, signInModal, signInWith]);

  if (!signIn) {
    return null;
  }

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-neutral-200 dark:border-neutral-800 bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            {/* <Image
              src="/images/avatars/saasfly-logo.svg"
              className="mx-auto"
              width="64"
              height="64"
              alt=""
            /> */}
          </a>
          <h3 className="font-urban text-2xl font-bold">{dict.signup}</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">{dict.privacy}</p>
        </div>

        <div className="flex flex-col space-y-4 px-4 py-8 md:px-16">
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={() => {
              void handleGithubSignIn();
            }}
          >
            {signInClicked ? (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.GitHub className="mr-2 h-4 w-4" />
            )}{" "}
            {dict.signup_github}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
