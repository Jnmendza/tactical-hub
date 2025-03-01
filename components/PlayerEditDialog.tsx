"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/lib/types';

interface PlayerEditDialogProps {
  player: Player | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPlayer: Player) => void;
}

export default function PlayerEditDialog({ player, open, onOpenChange, onSave }: PlayerEditDialogProps) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Update local state when player changes
  useState(() => {
    if (player) {
      setName(player.name);
      setNumber(player.number.toString());
    }
  });

  const handleSave = () => {
    if (!player) return;
    
    const updatedPlayer: Player = {
      ...player,
      name: name,
      number: parseInt(number, 10) || player.number,
    };
    
    onSave(updatedPlayer);
    onOpenChange(false);
  };

  if (!player) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Player name"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="col-span-3"
              type="number"
              min="1"
              max="99"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Position</Label>
            <div className="col-span-3 font-medium">{player.position}</div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}