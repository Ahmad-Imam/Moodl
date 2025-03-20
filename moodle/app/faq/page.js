import Main from "@/components/Main";
import FaqContent from "./_components/faq-content";

export const metadata = {
  title: "Moodl . FAQ",
  description: "Frequently asked questions about the Mood Tracker application",
};

export default function FaqPage() {
  return (
    <Main>
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <FaqContent />
    </Main>
  );
}
