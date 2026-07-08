import type { Metadata } from "next";
import AboutTabs from "@/components/AboutTabs";

export const metadata: Metadata = {
  title: "關於我們 | TEP",
};

export default function AboutPage() {
  return <AboutTabs />;
}
