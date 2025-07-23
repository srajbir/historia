import type { Metadata } from "next";
import Hero_section from "./hero_section";

export const metadata: Metadata = {
  title: "Historia",
  description: "Explore History",
  icons: {
    icon: "/logo1.svg",}
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Hero_section/>
        {children}
    </>

  );
}
