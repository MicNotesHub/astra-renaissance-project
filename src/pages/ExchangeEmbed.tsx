import { Navigation } from "@/components/ui/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExchangeCalculatorUG from "@/components/calculators/exchange-calculator-ug";
import ExchangeCalculator from "@/components/calculators/exchange-calculator";
import ExchangeCalculatorCLMG from "@/components/calculators/exchange-calculator-clmg";

const ExchangeEmbed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-10 px-4">
        <Tabs defaultValue="ug" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto">
            <TabsTrigger value="ug">Undergraduate</TabsTrigger>
            <TabsTrigger value="msc">MSc</TabsTrigger>
            <TabsTrigger value="clmg">CLMG</TabsTrigger>
          </TabsList>
          <TabsContent value="ug">
            <ExchangeCalculatorUG />
          </TabsContent>
          <TabsContent value="msc">
            <ExchangeCalculator />
          </TabsContent>
          <TabsContent value="clmg">
            <ExchangeCalculatorCLMG />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ExchangeEmbed;
