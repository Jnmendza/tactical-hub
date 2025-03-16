import { motion, useMotionValue } from "framer-motion";

type DraggableCircleProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export default function DraggableCircle({
  startX,
  startY,
  endX,
  endY,
  color = "white",
  size = 48,
  strokeWidth = 4,
}: DraggableCircleProps) {
  // Motion values for X and Y positions
  const x = useMotionValue(startX);
  const y = useMotionValue(startY);

  // Function to constrain dragging along the solid line
  const handleDrag = (event: any, info: { point: { x: number } }) => {
    const progress = Math.max(
      0,
      Math.min(1, (info.point.x - startX) / (endX - startX))
    );
    const newY = startY + progress * (endY - startY); // Interpolate Y position

    x.set(startX + progress * (endX - startX));
    y.set(newY);
  };

  return (
    <div className='relative w-full h-64'>
      {/* Solid Line for Path */}
      <svg className='absolute inset-0 w-full h-full'>
        <defs>
          <marker
            id='arrowhead'
            markerWidth='10'
            markerHeight='7'
            refX='9'
            refY='3.5'
            orient='auto'
          >
            <polygon points='0 0, 10 3.5, 0 7' fill={color} />
          </marker>
        </defs>
        <path
          d={`M ${startX} ${startY} L ${endX} ${endY}`}
          fill='none'
          stroke={color}
          strokeWidth={strokeWidth}
          markerEnd='url(#arrowhead)'
        />
      </svg>

      {/* Draggable Circle */}
      <motion.div
        className='absolute cursor-pointer z-10'
        style={{
          x,
          y,
          width: size,
          height: size,
          backgroundColor: `${color}20`, // Transparent version
          borderRadius: "50%",
        }}
        drag='x' // Restrict to horizontal movement
        dragConstraints={{ left: startX, right: endX }}
        dragElastic={0}
        onDrag={handleDrag}
      />
    </div>
  );
}
