"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, RotateCcw } from "lucide-react"; // Added RotateCcw for reset icon
import FootballField from "@/components/FootballField";
import { formations } from "@/lib/formations";
import { Player } from "@/lib/types";
import html2canvas from "html2canvas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveFormationToDb, signInWithGoogle } from "@/utils/actions";
import { useRouter } from "next/navigation";

import { createClientForBrowser } from "@/utils/supabase/client";

export default function FormationDesigner() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>(formations["4-4-2"]);
  const [currentFormation, setCurrentFormation] = useState<string>("4-4-2");
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  // Selected player for editing
  const selectedPlayer = players.find((p) => p.id === selectedPlayerId) || null;

  const handleSaveFormation = async () => {
    const confirmLogin = window.confirm(
      "You must sign in with Google to save formations. Sign in now?"
    );
    if (confirmLogin) {
      try {
        const url = await signInWithGoogle();
        router.push(url);
      } catch (error) {
        console.error("Error signing in with Goole:", error);
      }
    }
  };

  const handleFormationChange = (value: string) => {
    setCurrentFormation(value);
    setPlayers(formations[value as keyof typeof formations]);
    setSelectedPlayerId(null); // Reset selection on formation change
  };

  const handlePlayerPositionChange = (id: number, x: number, y: number) => {
    setPlayers((prev) =>
      prev.map((player) => (player.id === id ? { ...player, x, y } : player))
    );
  };

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayerId(player.id);
  };

  const handlePlayerUpdate = (field: "name" | "number", value: string) => {
    if (!selectedPlayer) return;
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === selectedPlayer.id
          ? {
              ...player,
              [field]:
                field === "number" ? parseInt(value) || player.number : value,
            }
          : player
      )
    );
  };

  const handleResetFormation = () => {
    setPlayers(formations[currentFormation as keyof typeof formations]);
    setSelectedPlayerId(null); // Optional: reset selection on reset
  };

  const handleExport = async () => {
    if (!fieldRef.current) return;
    try {
      fieldRef.current.classList.add("export-capture");
      const canvas = await html2canvas(fieldRef.current, {
        backgroundColor: "#3a8c3f",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedField = clonedDoc.querySelector(".export-capture");
          if (clonedField) {
            const playerElements = clonedField.querySelectorAll(
              '[style*="position: absolute"]'
            );
            playerElements.forEach((el) => {
              (el as HTMLElement).style.opacity = "1";
            });
          }
        },
      });
      fieldRef.current.classList.remove("export-capture");
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `formation-${currentFormation}.png`;
      link.click();
    } catch (error) {
      console.error("Error exporting formation:", error);
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <Card className='lg:col-span-2 '>
        <CardContent className='p-6'>
          <div ref={fieldRef} className='relative w-full'>
            <FootballField
              players={players}
              onPlayerMove={handlePlayerPositionChange}
              onPlayerSelect={handlePlayerSelect}
            />
          </div>
        </CardContent>
      </Card>

      <div className='space-y-6'>
        <Card>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Formation Controls</h2>
            <div className='space-y-4'>
              <div>
                <Label className='block text-sm font-medium mb-2'>
                  Select Formation
                </Label>
                <Select
                  value={currentFormation}
                  onValueChange={handleFormationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select formation' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='4-4-2'>4-4-2</SelectItem>
                    <SelectItem value='4-3-3'>4-3-3</SelectItem>
                    <SelectItem value='4-2-3-1'>4-2-3-1</SelectItem>
                    <SelectItem value='3-5-2'>3-5-2</SelectItem>
                    <SelectItem value='5-3-2'>5-3-2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div>
                <h3 className='text-lg font-medium mb-2'>Actions</h3>
                <div className='flex gap-2 flex-col'>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={handleExport}
                  >
                    <Download className='mr-2 h-4 w-4' />
                    Export
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={handleResetFormation}
                  >
                    <RotateCcw className='mr-2 h-4 w-4' />
                    Reset Formation
                  </Button>
                  <Button
                    variant='default'
                    className='w-full'
                    onClick={handleSaveFormation}
                  >
                    Save Formation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Edit Players</h2>
            <div className='space-y-4'>
              {/* Player Selection Dropdown */}
              <div>
                <Label className='block text-sm font-medium mb-2'>
                  Select Player
                </Label>
                <Select
                  value={selectedPlayerId?.toString()} // Removed || "" to avoid empty string
                  onValueChange={(value) =>
                    setSelectedPlayerId(value ? parseInt(value) : null)
                  }
                >
                  <SelectTrigger className='bg-gray-800 text-white border-gray-700'>
                    <SelectValue placeholder='Choose a player' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-900 text-white border-gray-700'>
                    {players.map((player) => (
                      <SelectItem
                        key={player.id}
                        value={player.id.toString()} // Always a valid string
                        className='hover:bg-gray-800'
                      >
                        {player.number} - {player.name || "Unnamed"} (
                        {player.position})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Editing Form */}
              {selectedPlayer && (
                <div className='space-y-4'>
                  <div>
                    <Label
                      htmlFor='player-name'
                      className='text-sm font-medium'
                    >
                      Name
                    </Label>
                    <Input
                      id='player-name'
                      value={selectedPlayer.name}
                      onChange={(e) =>
                        handlePlayerUpdate("name", e.target.value)
                      }
                      placeholder='Player name'
                      className='mt-1 bg-gray-800 text-white border-gray-700'
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor='player-number'
                      className='text-sm font-medium'
                    >
                      Number
                    </Label>
                    <Input
                      id='player-number'
                      value={selectedPlayer.number.toString()}
                      onChange={(e) =>
                        handlePlayerUpdate("number", e.target.value)
                      }
                      type='number'
                      min='1'
                      max='99'
                      className='mt-1 bg-gray-800 text-white border-gray-700'
                    />
                  </div>
                  <div>
                    <Label className='text-sm font-medium'>Position</Label>
                    <p className='mt-1 text-gray-300'>
                      {selectedPlayer.position}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Instructions</h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li>Select a formation from the dropdown menu</li>
              <li>Drag players to adjust their positions</li>
              <li>
                Click a player or use the dropdown to edit their name and number
              </li>
              <li>Click Export to download your formation as an image</li>
              <li>Click Reset Formation to revert to the default positions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
