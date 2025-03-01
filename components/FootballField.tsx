"use client";

import { useState, useRef, useEffect } from "react";
import { Player } from "@/lib/types";
import PlayerJersey from "@/components/PlayerJersey";

interface FootballFieldProps {
  players: Player[];
  onPlayerMove: (id: number, x: number, y: number) => void;
  onPlayerSelect?: (player: Player) => void;
}

export default function FootballField({
  players,
  onPlayerMove,
  onPlayerSelect,
}: FootballFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [fieldDimensions, setFieldDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [draggingPlayer, setDraggingPlayer] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (fieldRef.current) {
        setFieldDimensions({
          width: fieldRef.current.offsetWidth,
          height: fieldRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const playerElement = e.currentTarget as HTMLDivElement;
    const rect = playerElement.getBoundingClientRect();

    setDraggingPlayer(id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingPlayer === null || !fieldRef.current) return;

    const fieldRect = fieldRef.current.getBoundingClientRect();
    const playerSize = 50; // Size of the player jersey

    // Calculate new position relative to the field
    let newX =
      ((e.clientX - fieldRect.left - dragOffset.x) / fieldRect.width) * 100;
    let newY =
      ((e.clientY - fieldRect.top - dragOffset.y) / fieldRect.height) * 100;

    // Constrain to field boundaries
    newX = Math.max(
      0,
      Math.min(100 - (playerSize / fieldRect.width) * 100, newX)
    );
    newY = Math.max(
      0,
      Math.min(100 - (playerSize / fieldRect.height) * 100, newY)
    );

    onPlayerMove(draggingPlayer, newX, newY);
  };

  const handleMouseUp = () => {
    setDraggingPlayer(null);
  };

  const handleClick = (e: React.MouseEvent, player: Player) => {
    // Only trigger click if we didn't drag
    if (draggingPlayer === null && onPlayerSelect) {
      onPlayerSelect(player);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggingPlayer(null);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className='relative w-full aspect-[3/4] bg-green-600 rounded-lg overflow-hidden'
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Field markings */}
      <div className='absolute inset-0 flex flex-col'>
        {/* Center circle */}
        <div className='absolute top-1/2 left-1/2 w-[30%] h-0 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 aspect-square'></div>

        {/* Center line */}
        <div className='absolute top-1/2 w-full h-0 border-t-2 border-white transform -translate-y-1/2'></div>

        {/* Center circle */}
        <div className='absolute top-1/2 left-1/2 w-[30%] h-18 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 aspect-square'></div>

        {/* Penalty areas */}
        <div className='absolute top-0 left-1/2 w-[60%] h-[20%] border-b-2 border-l-2 border-r-2 border-white transform -translate-x-1/2'></div>
        <div className='absolute bottom-0 left-1/2 w-[60%] h-[20%] border-t-2 border-l-2 border-r-2 border-white transform -translate-x-1/2'></div>

        {/* Goal areas */}
        <div className='absolute top-0 left-1/2 w-[30%] h-[8%] border-b-2 border-l-2 border-r-2 border-white transform -translate-x-1/2'></div>
        <div className='absolute bottom-0 left-1/2 w-[30%] h-[8%] border-t-2 border-l-2 border-r-2 border-white transform -translate-x-1/2'></div>

        {/* Goals */}
        <div className='absolute top-0 left-1/2 w-[15%] h-[2%] bg-white transform -translate-x-1/2'></div>
        <div className='absolute bottom-0 left-1/2 w-[15%] h-[2%] bg-white transform -translate-x-1/2'></div>

        {/* Corner arcs */}
        <div className='absolute top-0 left-0 w-[5%] h-[5%] border-r-2 border-b-2 border-white rounded-br-full'></div>
        <div className='absolute top-0 right-0 w-[5%] h-[5%] border-l-2 border-b-2 border-white rounded-bl-full'></div>
        <div className='absolute bottom-0 left-0 w-[5%] h-[5%] border-r-2 border-t-2 border-white rounded-tr-full'></div>
        <div className='absolute bottom-0 right-0 w-[5%] h-[5%] border-l-2 border-t-2 border-white rounded-tl-full'></div>
      </div>

      {/* Players */}
      {players.map((player) => (
        <div
          key={player.id}
          className='absolute cursor-move'
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
            transform: "translate(-50%, -50%)",
            touchAction: "none",
            zIndex: 10,
          }}
          onMouseDown={(e) => handleMouseDown(e, player.id)}
          onClick={(e) => handleClick(e, player)}
        >
          <PlayerJersey
            number={player.number}
            position={player.position}
            name={player.name}
            isGoalkeeper={player.position === "GK"}
          />
        </div>
      ))}
    </div>
  );
}
