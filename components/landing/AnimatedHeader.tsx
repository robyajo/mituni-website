"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { AnimatedTabs } from "./AnimatedTabs";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AnimatedHeader() {
  const [starsCount, setStarsCount] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const { status } = useSession();

  const fetchStarsCount = async () => {
    const res = await fetch(
      "https://api.github.com/repos/robyajo/mituni-website"
    );
    const data = await res.json();
    setStarsCount(data.stargazers_count || 0);
  };

  React.useEffect(() => {
    fetchStarsCount();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { label: "Home", value: "home", href: "/" },
    { label: "About", value: "about", href: "/about" },
    { label: "Contact", value: "contact", href: "/contact" },
    { label: "Danger Zone", value: "danger-zone", href: "/danger-zone" },
  ];

  return (
    <>
      {/* Header with logo and GitHub button */}
      <header className="w-full bg-background relative ">
        <motion.div
          className="fixed top-4 left-4 z-50 flex items-center justify-center"
          animate={{
            scale: Math.max(0.8, 1 - scrollY * 0.006),
          }}
          transition={{
            duration: 0.1,
            ease: "linear",
          }}
        >
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={26}
            height={26}
            className="block"
          />
        </motion.div>

        <div className="hidden md:flex justify-between px-5 items-center font-mono pt-3 pb-0 pl-14">
          <div className="hidden md:flex items-center gap-2 ">
            {/* <span className="text-sm font-medium">/</span> */}
            <div className="text-sm font-bold hover:underline">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <a
                href={process.env.NEXT_PUBLIC_GITHUB_REPO}
                target="_blank"
                className="flex items-center"
              >
                <GitHubLogoIcon />
                <StarIcon
                  fill="currentColor"
                  size={16}
                  className="text-yellow-500 mr-1"
                />
                {starsCount}
                <ArrowUpRightIcon size={16} />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Sticky Navigation with animated tabs */}
      <div className="sticky top-0 bg-background overflow-x-hidden border-b border-border px-4">
        {/* Desktop tabs (tetap seperti semula, hanya tabs di tengah) */}
        <div className="hidden md:flex justify-center items-center">
          <motion.div
            className="flex justify-center flex-1"
            animate={{
              x: Math.min(scrollY * 0.5, 40), // Move 0.5px right per 1px scroll, max 40px
            }}
            transition={{
              duration: 0.05,
              ease: "linear",
            }}
          >
            <AnimatedTabs tabs={tabs} />
          </motion.div>
          <div className="flex items-center gap-2 ml-4">
            {status === "authenticated" ? (
              <Button size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile: menu + sheet untuk melihat semua menu dan tombol auth */}
        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <div className="font-mono text-sm font-medium ml-4">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle></SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                {tabs.map((tab) => (
                  <Link
                    key={tab.value}
                    href={tab.href}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {tab.label}
                  </Link>
                ))}
                {status === "authenticated" ? (
                  <Button asChild className="mt-4">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup">Register</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
