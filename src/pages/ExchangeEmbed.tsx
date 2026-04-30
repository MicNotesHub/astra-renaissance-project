import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";

const ExchangeEmbed = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type") || "undergraduate";

  const validTypes = ["undergraduate", "graduate", "law"] as const;
  const type = (validTypes as readonly string[]).includes(typeParam)
    ? typeParam
    : "undergraduate";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <iframe
          src={`https://astraexchange.lovable.app/calculator/${type}`}
          title="Astra Exchange Calculator"
          className="w-full h-[calc(100vh-4rem)] border-0"
          allow="clipboard-write; clipboard-read"
        />
      </main>
    </div>
  );
};

export default ExchangeEmbed;
