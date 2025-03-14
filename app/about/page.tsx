"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { justAnotherHand } from "@/lib/fonts";

export default function About() {
  // Refs for scroll detection
  const introRef = useRef(null);
  const whyRef = useRef(null);
  const whoRef = useRef(null);
  const meRef = useRef(null);

  const introInView = useInView(introRef, { once: true, amount: 0.5 });
  const whyInView = useInView(whyRef, { once: true, amount: 0.5 });
  const whoInView = useInView(whoRef, { once: true, amount: 0.5 });
  const meInView = useInView(meRef, { once: true, amount: 0.5 });

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Fixed positions for circles and arrows in each section
  const plays = [
    {
      // Intro section
      circle1: { top: "30%", left: "20%" },
      circle2: { top: "30%", left: "80%" },
      arrow1: { d: "M 20 30 L 80 30" }, // Horizontal arrow
      arrow2: { d: "M 20 30 L 80 30" }, // Horizontal arrow
    },
    {
      // Why section
      circle1: { top: "50%", left: "50%" },
      circle2: { top: "70%", left: "30%" },
      arrow1: { d: "M 50 50 Q 60 70 30 70" }, // Curved arrow
      arrow2: { d: "M 50 50 Q 60 70 30 70" }, // Curved arrow
    },
    {
      // Who section
      circle1: { top: "40%", left: "40%" },
      circle2: { top: "60%", left: "60%" },
      arrow1: { d: "M 40 40 L 60 60" }, // Diagonal arrow
      arrow2: { d: "M 40 40 L 60 60" }, // Diagonal arrow
    },
    {
      // Me section
      circle1: { top: "20%", left: "50%" },
      circle2: { top: "80%", left: "50%" },
      arrow1: { d: "M 400 40 L 100 230" }, // Vertical arrow
      arrow2: { d: "M 420 235 L 50 230" }, // Vertical arrow
    },
  ];
  const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" };
  return (
    <div className='relative min-h-screen bg-green-600 overflow-hidden'>
      {/* Whiteboard Texture (optional gradient) */}
      <div className='absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-700/90 opacity-50'></div>

      {/* Whiteboard Frame */}
      <div className='relative text-mint-green min-h-screen border-2 border-white/80 m-4 rounded-lg p-6 flex flex-col justify-center items-center text-center'>
        {/* Header */}
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-12'>
          About Tactical Hub
        </h1>

        {/* Intro Section */}
        <div className='w-full flex flex-col md:flex-row items-center justify-between mb-16'>
          {/* Draggable Play (Left) */}
          <motion.div
            className='w-full md:w-1/2 h-64 relative'
            initial='hidden'
            animate={introInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className='absolute inset-0'>
              {/* Circle 1 (Fixed) */}
              <div
                className='absolute w-12 h-12 rounded-full bg-white/20'
                style={{
                  top: plays[0].circle1.top,
                  left: plays[0].circle1.left,
                }}
              />

              {/* Circle 2 (Draggable) */}
              <motion.div
                className='absolute w-12 h-12 rounded-full bg-white/20 cursor-pointer z-10'
                style={{
                  top: plays[0].circle2.top,
                  left: plays[0].circle2.left,
                }}
                drag='x' // Only allow horizontal drag
                dragConstraints={{ left: 20, right: 80 }} // Constrain to arrow length
                dragElastic={0}
              />

              {/* Dotted Arrow */}
              <svg className='absolute inset-0 w-full h-full opacity-20'>
                <defs>
                  <marker
                    id='arrowhead-intro'
                    markerWidth='10'
                    markerHeight='7'
                    refX='9'
                    refY='3.5'
                    orient='auto'
                  >
                    <polygon points='0 0, 10 3.5, 0 7' fill='white' />
                  </marker>
                </defs>
                <path
                  d={plays[0].arrow2.d}
                  fill='none'
                  stroke='white'
                  strokeWidth='4'
                  strokeDasharray='10 10'
                  markerEnd='url(#arrowhead-intro)'
                />
              </svg>
            </div>
          </motion.div>

          {/* Content (Right) */}
          <motion.section
            ref={introRef}
            initial='hidden'
            animate={introInView ? "visible" : "hidden"}
            variants={textVariants}
            className='w-full md:w-1/2 text-left'
          >
            <h1
              className={`${justAnotherHand.className} text-7xl font-bold text-secondary-green`}
            >
              Hey, welcome to Tactical Hub
            </h1>
            <p className='text-xl md:text-2xl font-bold text-shadow-md'>
              —your dugout to channel Pep, Klopp, or Mourinho without a
              clipboard or a $100m budget. I’m Jonathan, a football nut who
              built this to turn tactics into something you can touch, drag, and
              play with.
            </p>
          </motion.section>
        </div>

        {/* Why I Built It Section */}
        <div className='w-full flex flex-col md:flex-row items-center justify-between mb-16'>
          {/* Content (Left) */}
          <motion.section
            ref={whyRef}
            initial='hidden'
            animate={whyInView ? "visible" : "hidden"}
            variants={textVariants}
            className='w-full md:w-1/2 text-left'
          >
            <h1
              className={`${justAnotherHand.className} text-7xl font-bold text-secondary-green`}
            >
              Why’d I build this?
            </h1>
            <p className='text-xl md:text-2xl font-bold text-shadow-md'>
              I’ve been hooked on football since the ‘90s, cheering for Mexico
              through Cuauhtémoc Blanco’s stepovers and Jorge Campos’ neon
              kits—those wild El Tri days. This app’s my mashup of that passion
              with Next.js, Tailwind, Sanity, and a dash of
              Prisma/Supabase—proof I can code a pitch as fierce as Blanco’s
              flair.
            </p>
          </motion.section>

          {/* Draggable Play (Right) */}
          <motion.div
            className='w-full md:w-1/2 h-64 relative'
            initial='hidden'
            animate={whyInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className='absolute inset-0'>
              {/* Circle 1 (Fixed) */}
              <div
                className='absolute w-12 h-12 rounded-full bg-white/20'
                style={{
                  top: plays[1].circle1.top,
                  left: plays[1].circle1.left,
                }}
              />

              {/* Circle 2 (Draggable) */}
              <motion.div
                className='absolute w-12 h-12 rounded-full bg-white/20 cursor-pointer z-10'
                style={{
                  top: plays[1].circle2.top,
                  left: plays[1].circle2.left,
                }}
                drag='x' // Only allow horizontal drag
                dragConstraints={{ left: 30, right: 70 }} // Constrain to arrow length
                dragElastic={0}
              />

              {/* Dotted Arrow */}
              <svg className='absolute inset-0 w-full h-full opacity-20'>
                <defs>
                  <marker
                    id='arrowhead-why'
                    markerWidth='10'
                    markerHeight='7'
                    refX='9'
                    refY='3.5'
                    orient='auto'
                  >
                    <polygon points='0 0, 10 3.5, 0 7' fill='white' />
                  </marker>
                </defs>
                <path
                  d={plays[1].arrow2.d}
                  fill='none'
                  stroke='white'
                  strokeWidth='4'
                  strokeDasharray='10 10'
                  markerEnd='url(#arrowhead-why)'
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Who It’s For Section */}
        <div className='w-full flex flex-col md:flex-row items-center justify-between mb-16'>
          {/* Draggable Play (Left) */}
          <motion.div
            className='w-full md:w-1/2 h-64 relative'
            initial='hidden'
            animate={whoInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className='absolute inset-0'>
              {/* Circle 1 (Fixed) */}
              <div
                className='absolute w-12 h-12 rounded-full bg-white/20'
                style={{
                  top: plays[2].circle1.top,
                  left: plays[2].circle1.left,
                }}
              />

              {/* Circle 2 (Draggable) */}
              <motion.div
                className='absolute w-12 h-12 rounded-full bg-white/20 cursor-pointer z-10'
                style={{
                  top: plays[2].circle2.top,
                  left: plays[2].circle2.left,
                }}
                drag='x' // Only allow horizontal drag
                dragConstraints={{ left: 40, right: 60 }} // Constrain to arrow length
                dragElastic={0}
              />

              {/* Dotted Arrow */}
              <svg className='absolute inset-0 w-full h-full opacity-20'>
                <defs>
                  <marker
                    id='arrowhead-who'
                    markerWidth='10'
                    markerHeight='7'
                    refX='9'
                    refY='3.5'
                    orient='auto'
                  >
                    <polygon points='0 0, 10 3.5, 0 7' fill='white' />
                  </marker>
                </defs>
                <path
                  d={plays[2].arrow2.d}
                  fill='none'
                  stroke='white'
                  strokeWidth='4'
                  strokeDasharray='10 10'
                  markerEnd='url(#arrowhead-who)'
                />
              </svg>
            </div>
          </motion.div>

          {/* Content (Right) */}
          <motion.section
            ref={whoRef}
            initial='hidden'
            animate={whoInView ? "visible" : "hidden"}
            variants={textVariants}
            className='w-full md:w-1/2 text-left'
          >
            <h1
              className={`${justAnotherHand.className} text-7xl font-bold text-secondary-green`}
            >
              Who’s this for?
            </h1>
            <p className='text-xl md:text-2xl font-bold text-shadow-md'>
              You—the fan yelling about formations at halftime, the coach
              plotting Sunday league wins, or the dreamer scripting a CONCACAF
              upset. It’s not about subscriptions (it’s fake, duh)—it’s about
              sharing the football buzz.
            </p>
          </motion.section>
        </div>

        {/* About Me Section */}
        <div className='w-full flex flex-col md:flex-row items-center justify-between'>
          {/* Content (Left) */}
          <motion.section
            ref={meRef}
            initial='hidden'
            animate={meInView ? "visible" : "hidden"}
            variants={textVariants}
            className='w-full md:w-1/2 text-left'
          >
            <h1
              className={`${justAnotherHand.className} text-7xl font-bold text-secondary-green`}
            >
              Me?
            </h1>
            <p className='text-xl md:text-2xl font-bold'>
              A San Diego-based dev who’d rather dissect Mexico’s ‘98 World Cup
              run than chat about rain. When I’m not coding or reliving Campos’
              saves, I’m here—building this for the love of the game. Hit me up
              at @TacticalHubDev on X!
            </p>
          </motion.section>

          {/* Draggable Play (Right) */}
          <motion.div
            className='w-full md:w-1/2 h-64 relative'
            initial='hidden'
            animate={meInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className='absolute inset-0'>
              {/* Circle 1 (Now Moves Along the Solid Arrow Path) */}
              <motion.div
                className='absolute w-12 h-12 rounded-full bg-red-600 cursor-pointer z-10'
                style={{
                  top: 0,
                  left: 0,
                  offsetPath: `path('${plays[3].arrow1.d}')`,
                  offsetDistance: "0%",
                }}
                animate={{
                  offsetDistance: ["0%", "100%", "0%"],
                }} // Smoothly increasing increments
                transition={{
                  duration: 6, // Slow and natural movement
                  ease: "easeInOut",
                  repeat: Infinity, // Infinite loop
                  repeatType: "reverse", // Smoothly moves back
                  repeatDelay: 1.5, // Small pause before reversing
                }}
              />

              {/* Circle 2 (Draggable) */}
              <motion.div
                className='absolute w-12 h-12 rounded-full bg-blue-600 cursor-pointer z-10'
                style={{
                  top: plays[3].circle2.top,
                  left: plays[3].circle2.left,
                }}
                drag='x' // Only allow horizontal drag
                dragConstraints={{ left: -100, right: 50 }} // Constrain to arrow length
                dragElastic={0.3}
                dragDirectionLock={true}
              />

              <svg className='absolute inset-0 w-full h-full'>
                <defs>
                  {/* Marker for Dotted Arrow (Circle 2) */}
                  <marker
                    id='arrowhead-dotted'
                    markerWidth='10'
                    markerHeight='7'
                    refX='9'
                    refY='3.5'
                    orient='auto'
                  >
                    <polygon points='0 0, 10 3.5, 0 7' fill='white' />
                  </marker>

                  {/* Marker for Solid Arrow (Circle 1) */}
                  <marker
                    id='arrowhead-solid'
                    markerWidth='10'
                    markerHeight='7'
                    refX='9'
                    refY='3.5'
                    orient='auto'
                  >
                    <polygon points='0 0, 10 3.5, 0 7' fill='white' />
                  </marker>
                </defs>

                {/* Dotted Line for Circle 2 (Draggable) */}
                <motion.path
                  d={plays[3].arrow2.d}
                  fill='none'
                  stroke='white'
                  strokeWidth='4'
                  strokeDasharray='10 10' // Dotted effect
                  markerEnd='url(#arrowhead-dotted)'
                />

                {/* Solid Line for Circle 1 (Fixed) */}
                <motion.path
                  d={plays[3].arrow1.d} // Change coordinates for new solid arrow
                  fill='none'
                  stroke='white'
                  strokeWidth='4' // Solid line (no dash effect)
                  markerEnd='url(#arrowhead-solid)'
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
