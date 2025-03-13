"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  // Refs for scroll detection
  const introRef = useRef(null);
  const whyRef = useRef(null);
  const whoRef = useRef(null);
  const meRef = useRef(null);

  const introInView = useInView(introRef, { once: false, amount: 0.5 });
  const whyInView = useInView(whyRef, { once: false, amount: 0.5 });
  const whoInView = useInView(whoRef, { once: false, amount: 0.5 });
  const meInView = useInView(meRef, { once: false, amount: 0.5 });

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className='relative min-h-screen bg-green-600 overflow-hidden'>
      {/* Whiteboard Texture (optional gradient) */}
      <div className='absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-700/90 opacity-50'></div>

      {/* Tactical Overlay - Circles and Arrows */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Circles (Players) */}
        <div className='absolute top-[20%] left-[30%] w-12 h-12 rounded-full bg-white/20'></div>
        <div className='absolute top-[40%] left-[60%] w-12 h-12 rounded-full bg-white/20'></div>
        <div className='absolute top-[60%] left-[20%] w-12 h-12 rounded-full bg-white/20'></div>
        <div className='absolute top-[80%] left-[50%] w-12 h-12 rounded-full bg-white/20'></div>

        {/* Arrows (Movement) */}
        <svg className='absolute inset-0 w-full h-full opacity-20'>
          <path
            d='M 200 200 Q 300 250 400 200'
            fill='none'
            stroke='white'
            strokeWidth='4'
            strokeDasharray='10 10'
          />
          <path
            d='M 500 400 L 600 500'
            fill='none'
            stroke='white'
            strokeWidth='4'
            strokeDasharray='10 10'
          />
          <path
            d='M 150 600 Q 200 650 250 600'
            fill='none'
            stroke='white'
            strokeWidth='4'
            strokeDasharray='10 10'
          />
        </svg>
      </div>

      {/* Whiteboard Frame */}
      <div className='relative min-h-screen border-2 border-white/80 m-4 rounded-lg p-6 flex flex-col justify-center items-center text-center'>
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 font-['Permanent_Marker']">
          About Tactical Hub
        </h1>

        {/* Intro */}
        <motion.section
          ref={introRef}
          initial='hidden'
          animate={introInView ? "visible" : "hidden"}
          variants={textVariants}
          className='max-w-2xl mb-16'
        >
          <p className='text-red-600 text-2xl md:text-3xl font-bold text-shadow-md'>
            Hey, welcome to Tactical Hub—your dugout to channel Pep, Klopp, or
            Mourinho without a clipboard or a £100m budget. I’m [Your Name], a
            football nut who built this to turn tactics into something you can
            touch, drag, and play with.
          </p>
        </motion.section>

        {/* Why I Built It */}
        <motion.section
          ref={whyRef}
          initial='hidden'
          animate={whyInView ? "visible" : "hidden"}
          variants={textVariants}
          className='max-w-2xl mb-16'
        >
          <p className='text-red-600 text-2xl md:text-3xl font-bold text-shadow-md'>
            Why’d I build this? I’ve been hooked on football since the ‘90s,
            cheering for Mexico through Cuauhtémoc Blanco’s stepovers and Jorge
            Campos’ neon kits—those wild El Tri days. This app’s my mashup of
            that passion with Next.js, Tailwind, Sanity, and a dash of
            Prisma/Supabase—proof I can code a pitch as fierce as Blanco’s
            flair.
          </p>
        </motion.section>

        {/* Who It’s For */}
        <motion.section
          ref={whoRef}
          initial='hidden'
          animate={whoInView ? "visible" : "hidden"}
          variants={textVariants}
          className='max-w-2xl mb-16'
        >
          <p className='text-red-600 text-2xl md:text-3xl font-bold text-shadow-md'>
            Who’s this for? You—the fan yelling about formations at halftime,
            the coach plotting Sunday league wins, or the dreamer scripting a
            CONCACAF upset. It’s not about subscriptions (it’s fake, duh)—it’s
            about sharing the football buzz.
          </p>
        </motion.section>

        {/* About Me */}
        <motion.section
          ref={meRef}
          initial='hidden'
          animate={meInView ? "visible" : "hidden"}
          variants={textVariants}
          className='max-w-2xl'
        >
          <p className='text-red-600 text-2xl md:text-3xl font-bold text-shadow-md'>
            Me? A [Your City]-based dev who’d rather dissect Mexico’s ‘98 World
            Cup run than chat about rain. When I’m not coding or reliving
            Campos’ saves, I’m here—building this for the love of the game. Hit
            me up at @TacticalHubDev on X!
          </p>
        </motion.section>
      </div>
    </div>
  );
}
