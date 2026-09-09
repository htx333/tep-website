import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "報名 | TEP",
  description: "TEP Careers 香港金融職涯發展計畫報名表。",
};

export default function RegistrationPage() {
  return <RegistrationForm />;
}
