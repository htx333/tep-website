import type { Metadata } from "next";
import StudentStories from "@/components/StudentStories";

export const metadata: Metadata = {
  title: "學生分享 | TEP",
  description: "來自 TEP 學員的真實蛻變歷程 — 學生分享與成功案例。",
};

export default function StoriesPage() {
  return <StudentStories />;
}
