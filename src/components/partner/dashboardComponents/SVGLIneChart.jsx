import React from "react";

const SVGLineChart = ({ data }) => {
  const chartWidth = 400;
  const chartHeight = 180;
  const padding = 40;
  const maxY = 100;

  // Calculate spacing and scaling
  const pointGap = (chartWidth - padding * 2) / (data.length - 1);
  const scaleY = (chartHeight - padding * 2) / maxY;

  // Generate polyline points
  const getPoints = (key, scale) =>
    data
      .map((d, i) => {
        const x = padding + i * pointGap;
        const y = chartHeight - padding - d[key] * scale;
        return `${x},${y}`;
      })
      .join(" ");

  const participationPoints = getPoints("participation", scaleY);
  const engagementPoints = getPoints("engagement", scaleY);

  return (
    <div className="relative">
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + i * 25}
            x2={chartWidth - padding}
            y2={padding + i * 25}
            stroke="#f3f4f6"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels (left side) */}
        {[0, 25, 50, 75, 100].map((val, i) => (
          <text
            key={i}
            x={padding - 15}
            y={chartHeight - padding - i * (chartHeight - padding * 2) / 4}
            fill="#555"
            fontSize="10"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {val}
          </text>
        ))}

        {/* X-axis labels (bottom) */}
        {data.map((point, i) => {
          const x = padding + i * pointGap;
          return (
            <text
              key={i}
              x={x}
              y={chartHeight - padding + 15}
              fill="#555"
              fontSize="8"
              textAnchor="middle"
            >
              {point.label}
            </text>
          );
        })}

        {/* Participation Line */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          points={participationPoints}
          className="drop-shadow-sm"
        />

        {/* Engagement Line */}
        <polyline
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
          points={engagementPoints}
          className="drop-shadow-sm"
        />

        {/* Data Points */}
        {data.map((point, i) => {
          const x = padding + i * pointGap;
          const yPart = chartHeight - padding - point.participation * scaleY;
          const yEng = chartHeight - padding - point.engagement * scaleY;

          return (
            <g key={i}>
              {/* Participation Point */}
              <circle
                cx={x}
                cy={yPart}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all cursor-pointer"
              />
              {/* Engagement Point */}
              <circle
                cx={x}
                cy={yEng}
                r="4"
                fill="#f97316"
                className="hover:r-6 transition-all cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* Legends */}
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="text-sm">Participation</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
          <span className="text-sm">Engagement</span>
        </div>
      </div>
    </div>
  );
};

export default SVGLineChart;