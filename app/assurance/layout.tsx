import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurance | Trott-e",
  description: "Protégez votre trottinette Trott-e avec nos solutions d'assurance complètes et flexibles. Ridez en toute sérénité.",
};

export default function AssuranceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
