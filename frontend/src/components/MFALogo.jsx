export function MFALogo({ height = 60, className = "" }) {
  return (
    <svg
      className={className}
      style={{ height, width: "auto" }}
      viewBox="0 0 560 280" // Increased height for better spacing
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mercy For Animals"
    >
      {/* Icon Group */}
      <g transform="translate(0, 5)">
        {/* Left Parenthesis - Thinned out by adjusting the inner curve and width */}
        <path
          d="M222 26
             C185 52, 185 128, 222 154
             L238 140
             C210 120, 210 60, 238 40
             Z"
          fill="#FF9831"
        />
        {/* Right Parenthesis - Mirror of the thinned left side */}
        <path
          d="M338 26
             C375 52, 375 128, 338 154
             L322 140
             C350 120, 350 60, 322 40
             Z"
          fill="#FF9831"
        />
        {/* Blue circle */}
        <circle cx="280" cy="90" r="46" fill="#1D66FF" />
      </g>

      {/* Text - Shifted down for more breathing room */}
      <g 
        fill="#000000" 
        fontFamily="Inter, system-ui, -apple-system, sans-serif" 
        fontWeight="700" 
        style={{ letterSpacing: '1px' }}
      >
        <text x="280" y="220" fontSize="38" textAnchor="middle">
          MERCY FOR
        </text>
        <text x="280" y="260" fontSize="38" textAnchor="middle">
          ANIMALS
        </text>
      </g>
    </svg>
  );
}