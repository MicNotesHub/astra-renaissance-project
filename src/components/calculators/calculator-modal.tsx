import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationGradeCalculator } from "./graduation-grade-calculator";
import ExchangeCalculator from "./exchange-calculator";
import ExchangeCalculatorCLMG from "./exchange-calculator-clmg";
import ExchangeCalculatorUG from "./exchange-calculator-ug";
import { X } from "lucide-react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorType: string;
}

export function CalculatorModal({ isOpen, onClose, calculatorType }: CalculatorModalProps) {
  const getCalculatorComponent = () => {
    switch (calculatorType) {
      case 'graduation':
        return <GraduationGradeCalculator />;
      case 'exchange-calculator':
        return <ExchangeCalculator />;
      case 'exchange-calculator-clmg':
        return <ExchangeCalculatorCLMG />;
      case 'exchange-calculator-ug':
        return <ExchangeCalculatorUG />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Calcolatore in Sviluppo</h3>
            <p className="text-muted-foreground">
              Questo calcolatore sarà disponibile presto!
            </p>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (calculatorType) {
      case 'graduation':
        return 'Undergraduate Graduation Grade Calculator';
      case 'exchange-calculator':
        return 'Exchange Calculator MSc';
      case 'exchange-calculator-clmg':
        return 'Exchange Calculator CLMG';
      case 'exchange-calculator-ug':
        return 'Exchange Calculator UG';
      default:
        return 'Calcolatore';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            {getTitle()}
          </DialogTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="mt-4">
          {getCalculatorComponent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}