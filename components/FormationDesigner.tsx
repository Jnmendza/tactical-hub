"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Save, Users } from 'lucide-react';
import FootballField from '@/components/FootballField';
import PlayerEditDialog from '@/components/PlayerEditDialog';
import { formations } from '@/lib/formations';
import { Player, Formation } from '@/lib/types';
import html2canvas from 'html2canvas';

export default function FormationDesigner() {
  const [players, setPlayers] = useState<Player[]>(formations['4-4-2']);
  const [currentFormation, setCurrentFormation] = useState<string>('4-4-2');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  const handleFormationChange = (value: string) => {
    setCurrentFormation(value);
    setPlayers(formations[value as keyof typeof formations]);
  };

  const handlePlayerPositionChange = (id: number, x: number, y: number) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === id ? { ...player, x, y } : player
      )
    );
  };

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
    setDialogOpen(true);
  };

  const handlePlayerUpdate = (updatedPlayer: Player) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };

  const handleExport = async () => {
    if (!fieldRef.current) return;
    
    try {
      // Add a temporary class to ensure the field is visible during capture
      fieldRef.current.classList.add('export-capture');
      
      const canvas = await html2canvas(fieldRef.current, {
        backgroundColor: '#3a8c3f', // Match the field green color
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Find the cloned field element
          const clonedField = clonedDoc.querySelector('.export-capture');
          if (clonedField) {
            // Make sure all elements are visible in the clone
            const playerElements = clonedField.querySelectorAll('[style*="position: absolute"]');
            playerElements.forEach((el) => {
              (el as HTMLElement).style.opacity = '1';
            });
          }
        }
      });
      
      // Remove the temporary class
      fieldRef.current.classList.remove('export-capture');
      
      // Convert to PNG and download
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `formation-${currentFormation}.png`;
      document.body.appendChild(link); // Needed for Firefox
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting formation:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <div ref={fieldRef} className="relative w-full">
            <FootballField 
              players={players} 
              onPlayerMove={handlePlayerPositionChange}
              onPlayerSelect={handlePlayerSelect}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Formation Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Formation
                </label>
                <Select value={currentFormation} onValueChange={handleFormationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select formation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4-4-2">4-4-2</SelectItem>
                    <SelectItem value="4-3-3">4-3-3</SelectItem>
                    <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
                    <SelectItem value="3-5-2">3-5-2</SelectItem>
                    <SelectItem value="5-3-2">5-3-2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Actions</h3>
                <div className="flex gap-2 flex-col">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleExport}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Select a formation from the dropdown menu</li>
              <li>Drag players to adjust their positions</li>
              <li>Click on a player to edit their name and number</li>
              <li>Click Export to download your formation as an image</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <PlayerEditDialog 
        player={selectedPlayer}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handlePlayerUpdate}
      />
    </div>
  );
}