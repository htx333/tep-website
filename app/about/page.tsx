import type { Metadata } from "next";
import { Suspense } from "react";
import AboutTabs from "@/components/AboutTabs";

export const metadata: Metadata = {
  title: "關於我們 | TEP",
};

export default function AboutPage() {
  return (
    <Suspense>
      <AboutTabs />
    </Suspense>
  );
}
