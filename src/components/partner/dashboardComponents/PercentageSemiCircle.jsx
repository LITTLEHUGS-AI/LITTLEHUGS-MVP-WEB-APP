const PercentageSemiCircle = ({ percentage = 0 }) => {
  const strokeWidth = 8;
  const radius = 50;
  const normalizedRadius = radius - strokeWidth / 2;

  const clampedPercentage = Math.max(0, Math.min(percentage, 100));

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-28 h-16">
        <svg
          width={radius * 2}
          height={radius + strokeWidth}
          viewBox={`0 0 ${radius * 2} ${radius + strokeWidth}`}
        >
          <path
            d={describeArc(radius, radius, normalizedRadius, 180, 0)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          <path
            d={describeArc(radius, radius, normalizedRadius, 180, 180 - (180 * clampedPercentage) / 100)}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute -left-2 inset-0 flex items-center justify-center pt-4">
          <span className="text-3xl font-bold text-gray-800">
            {clampedPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

// Utility to describe an arc using polar coordinates
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy - r * Math.sin(angleInRadians)
  };
}

export default PercentageSemiCircle;