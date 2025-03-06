"use client";
import React from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme} variant='outline' size='sm'>
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
};

export default ThemeButton;
