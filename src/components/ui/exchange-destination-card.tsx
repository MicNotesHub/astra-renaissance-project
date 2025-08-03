import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, TrendingUp, TrendingDown } from "lucide-react";

interface BaseDestination {
  id: number;
  delta: number;
  isEligible?: boolean;
}

interface MSCDestination extends BaseDestination {
  University: string;
  Continent: string;
  'SLOTS 2024/25': number;
  'Highest Score': string;
  'Lowest Score': string;
  'ADDITIONAL ACADEMIC REQUIREMENTS': string;
  'ADDITIONAL LANGUAGE REQUIREMENT': string;
  NOTES: string;
  minScore?: number;
  maxScore?: number;
}

interface UGDestination extends BaseDestination {
  uni_name: string;
  continent: string;
  min_score: number;
  max_score: number;
  sel_details: string;
}

interface CLMGDestination extends BaseDestination {
  uni: string;
  country: string;
  state: string;
  codice: number;
  highest: number;
  lowest: number;
}

type ExchangeDestination = MSCDestination | UGDestination | CLMGDestination;

interface ExchangeDestinationCardProps {
  destination: ExchangeDestination;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  variant?: 'msc' | 'ug' | 'clmg';
}

export const ExchangeDestinationCard: React.FC<ExchangeDestinationCardProps> = ({
  destination,
  isFavorite = false,
  onToggleFavorite,
  variant = 'msc'
}) => {
  const getUniversityName = () => {
    if ('University' in destination) return destination.University;
    if ('uni_name' in destination) return destination.uni_name;
    if ('uni' in destination) return destination.uni;
    return 'Unknown University';
  };

  const getLocation = () => {
    if ('Continent' in destination) return destination.Continent;
    if ('continent' in destination) return destination.continent;
    if ('country' in destination && 'state' in destination) 
      return `${destination.state}, ${destination.country}`;
    return 'Unknown Location';
  };

  const getScoreRange = () => {
    if ('Lowest Score' in destination && 'Highest Score' in destination) {
      const min = parseFloat(destination['Lowest Score']?.replace(',', '.') || '0');
      const max = parseFloat(destination['Highest Score']?.replace(',', '.') || '0');
      return { min, max };
    }
    if ('min_score' in destination && 'max_score' in destination) {
      return { min: destination.min_score, max: destination.max_score };
    }
    if ('lowest' in destination && 'highest' in destination) {
      return { min: destination.lowest, max: destination.highest };
    }
    return { min: 0, max: 0 };
  };

  const getAdditionalInfo = () => {
    if ('SLOTS 2024/25' in destination) {
      return `${destination['SLOTS 2024/25']} posti disponibili`;
    }
    if ('sel_details' in destination) {
      return destination.sel_details;
    }
    if ('codice' in destination) {
      return `Codice: ${destination.codice}`;
    }
    return null;
  };

  const getRequirements = () => {
    const requirements = [];
    if ('ADDITIONAL ACADEMIC REQUIREMENTS' in destination && destination['ADDITIONAL ACADEMIC REQUIREMENTS']) {
      requirements.push(destination['ADDITIONAL ACADEMIC REQUIREMENTS']);
    }
    if ('ADDITIONAL LANGUAGE REQUIREMENT' in destination && destination['ADDITIONAL LANGUAGE REQUIREMENT']) {
      requirements.push(destination['ADDITIONAL LANGUAGE REQUIREMENT']);
    }
    return requirements;
  };

  const getNotes = () => {
    if ('NOTES' in destination && destination.NOTES) {
      return destination.NOTES;
    }
    return null;
  };

  const scoreRange = getScoreRange();
  const isEligible = destination.isEligible !== undefined ? destination.isEligible : destination.delta >= 0;
  const deltaColor = destination.delta >= 0 ? 'text-green-600' : 'text-red-600';
  const deltaIcon = destination.delta >= 0 ? TrendingUp : TrendingDown;
  const DeltaIcon = deltaIcon;

  return (
    <Card className={`relative transition-all hover:shadow-md ${
      isEligible 
        ? 'border-green-200 bg-green-50/30 dark:border-green-800 dark:bg-green-950/30' 
        : 'border-red-200 bg-red-50/30 dark:border-red-800 dark:bg-red-950/30'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-lg leading-tight">{getUniversityName()}</h4>
              {onToggleFavorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(destination.id)}
                  className="p-1 h-8 w-8"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{getLocation()}</span>
            </div>

            {getAdditionalInfo() && (
              <p className="text-sm text-muted-foreground">{getAdditionalInfo()}</p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                Punteggio: {scoreRange.min} - {scoreRange.max}
              </Badge>
              
              <div className={`flex items-center gap-1 text-xs font-medium ${deltaColor}`}>
                <DeltaIcon className="h-3 w-3" />
                <span>Delta: {destination.delta > 0 ? '+' : ''}{destination.delta.toFixed(2)}</span>
              </div>
            </div>

            {getRequirements().length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Requisiti aggiuntivi:</p>
                {getRequirements().map((req, index) => (
                  <Badge key={index} variant="secondary" className="text-xs mr-1">
                    {req}
                  </Badge>
                ))}
              </div>
            )}

            {getNotes() && (
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> {getNotes()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border/50">
          <Badge 
            variant={isEligible ? "default" : "destructive"}
            className="text-xs"
          >
            {isEligible 
              ? variant === 'ug' ? 'Requisiti soddisfatti' : 'Probabilmente accettabile'
              : variant === 'ug' ? 'Requisiti non soddisfatti' : 'Sotto soglia minima'
            }
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};