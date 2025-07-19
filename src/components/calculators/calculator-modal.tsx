import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GPACalculator } from "./gpa-calculator";
import { ExchangePlanner } from "./exchange-planner";
import { StudyPlanCalculator } from "./study-plan-calculator";
import { X } from "lucide-react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorType: string;
}

export function CalculatorModal({ isOpen, onClose, calculatorType }: CalculatorModalProps) {
  const getCalculatorComponent = () => {
    switch (calculatorType) {
      case 'gpa':
        return <GPACalculator />;
      case 'exchange':
        return <ExchangePlanner />;
      case 'study-plan':
        return <StudyPlanCalculator />;
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
      case 'gpa':
        return 'Calcolatore GPA';
      case 'exchange':
        return 'Exchange Planner';
      case 'study-plan':
        return 'Piano di Studi';
      case 'simulator':
        return 'Simulatore Voti';
      case 'planner':
        return 'Planner Sessioni';
      case 'performance':
        return 'Analisi Performance';
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