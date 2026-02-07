import { Navigation } from "@/components/ui/navigation";
import { useEffect } from "react";

const ExchangeEmbed = () => {
  useEffect(() => {
    // Prevent any referrer leakage
    const meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'no-referrer';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16">
        <iframe
          src="https://astraexchange.lovable.app"
          className="w-full h-[calc(100vh-4rem)] border-0"
          title="Exchange Calculator"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ExchangeEmbed;
