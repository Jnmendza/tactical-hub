"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
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
import { getCategories } from "@/data/sanity";
import { SimpleBlogCard } from "@/lib/types";
import { fetchBlogPosts } from "@/lib/posts";
import { BlogPostCard } from "./BlogPostCard";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import { Skeleton } from "./ui/skeleton";
import { urlFor } from "@/lib/sanity";

export default function FormationDesigner() {
  const [players, setPlayers] = useState<Player[]>(formations["4-4-2"]);
  const [currentFormation, setCurrentFormation] = useState<string>("4-4-2");
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [posts, setPosts] = useState<SimpleBlogCard[]>([]);
  console.log("POSTS", posts);
  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      const postsData = (await fetchBlogPosts()).filter(
        (post) => post.categoryTags[0] === currentFormation
      );
      setPosts(postsData);
    };

    fetchData();
  }, [currentFormation]);

  // Selected player for editing
  const selectedPlayer = players.find((p) => p.id === selectedPlayerId) || null;

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

  if (!posts)
    <div>
      <Skeleton />
    </div>;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
      {/* Related posts */}
      <div className='lg:col-span-1 border-2 border-white/80 rounded-lg p-4 max-h-[500px] overflow-auto no-scrollbar'>
        <h2 className='text-2xl font-bold'>Related Posts</h2>
        {posts.map((post, index) => (
          <motion.div
            key={index}
            animate={index === 0 && posts.length > 1 ? { y: [0, -5, 0] } : {}}
            transition={
              index == 0 && posts.length > 1
                ? {
                    duration: 1.5,
                    repeat: 5,
                    repeatDelay: 6,
                    ease: "easeInOut",
                  }
                : {}
            }
          >
            <BlogPostCard
              key={index}
              imageUrl={urlFor(post.coverImage).url()}
              title={post.title}
              smallDesc={post.smallDescription}
              slug={post.currentSlug}
              className='mt-4'
            />
          </motion.div>
        ))}
      </div>

      <Card className='lg:col-span-2'>
        <CardContent className='p-6 h-full'>
          <div ref={fieldRef} className='relative w-full h-full'>
            <FootballField
              players={players}
              onPlayerMove={handlePlayerPositionChange}
              onPlayerSelect={handlePlayerSelect}
            />
          </div>
        </CardContent>
      </Card>

      <div className='space-y-6'>
        {/* Instructions  */}
        <Accordion
          className=' rounded-md bg-black px-6 py-4'
          type='single'
          // defaultValue='intructions'
          collapsible
        >
          <AccordionItem value='intructions'>
            <AccordionTrigger className='text-2xl font-bold'>
              Instructions
            </AccordionTrigger>
            <AccordionContent>
              <ul className='list-disc pl-5 space-y-2'>
                <li>Select a formation from the dropdown menu</li>
                <li>Drag players to adjust their positions</li>
                <li>
                  Click a player or use the dropdown to edit their name and
                  number
                </li>
                <li>Click Export to download your formation as an image</li>
                <li>
                  Click Reset Formation to revert to the default positions
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
                    {categories.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
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
      </div>
    </div>
  );
}
