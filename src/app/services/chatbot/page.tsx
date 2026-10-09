import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChatbotScene from "@/components/ChatbotScene";
import ChatbotExplainer from "@/components/service/ChatbotExplainer";
import ServiceHero from "@/components/service/ServiceHero";
import type { Interest } from "@/lib/lead";

const title = "Website Chatbot, 24/7";
const description =
  "An AI website assistant that chats with every visitor, answers their questions and collects their number, even while you sleep.";
const path = "/services/chatbot";
const interests: Interest[] = ["Website chatbot"];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | VYSON-AI`, description, url: path, type: "website" },
};

export default function ChatbotPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/#services" },
          { label: "Website Chatbot", href: path },
        ]}
      />

      <ServiceHero
        title="Your 24/7 Website Assistant"
        text="Chats with every visitor on your website, answers their questions and collects their number, even while you sleep."
        interests={interests}
        scene={<ChatbotScene />}
      />

      <ChatbotExplainer interests={interests} />
    </>
  );
}
