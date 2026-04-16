import type { Metadata } from "next";
import BerandaClient from "./BerandaClient";

export const metadata: Metadata = {
  title: "Beranda | Nagira Farm",
  description:
    "Peternakan domba modern di Majalengka dengan kualitas terbaik.",
  keywords: [
    "nagira farm",
    "peternakan domba",
    "domba garut",
    "kambing etawa",
    "peternakan majalengka",
  ],
  openGraph: {
    title: "Beranda | Nagira Farm",
    description:
      "Peternakan domba modern di Majalengka dengan kualitas terbaik.",
    type: "website",
  },
};

export default function BerandaPage() {
  return <BerandaClient />;
}
