import BrainstormForm from "~/components/brainstorm-form";

export default function BrainstormPage() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mt-8">
        AI Brainstorming
      </h1>

      <BrainstormForm />
    </main>
  );
}
