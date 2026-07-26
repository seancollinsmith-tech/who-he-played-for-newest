/**
 * An original abstract mark for a team card, built only from that team's
 * colors — never a reproduction of any official NBA logo or artwork.
 *
 * The shape/rotation/color-order is deterministically derived from the
 * team's id, so each of the 30 teams gets a distinct-looking (but stable
 * across renders) mark without hand-authoring 30 separate icons.
 */
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function TeamMark({
  primaryColor,
  secondaryColor,
  seed,
  size = 34
}: {
  primaryColor: string;
  secondaryColor: string;
  seed: string;
  size?: number;
}) {
  const hash = hashSeed(seed);
  const variant = hash % 3;
  const rotation = ((hash % 9) - 4) * 8; // -32..32 degrees, in steps of 8
  const swap = (hash >> 3) % 2 === 1;
  const colorA = swap ? secondaryColor : primaryColor;
  const colorB = swap ? primaryColor : secondaryColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="drop-shadow-sm"
    >
      <g transform={`rotate(${rotation} 24 24)`}>
        {variant === 0 && (
          <>
            <path d="M6 30 L24 10 L42 30 L34 30 L24 19 L14 30 Z" fill={colorA} />
            <path d="M10 34 L24 18 L38 34 L30 34 L24 27 L18 34 Z" fill={colorB} opacity={0.85} />
          </>
        )}
        {variant === 1 && (
          <>
            <path d="M24 6 L40 14 L40 30 L24 42 L8 30 L8 14 Z" fill={colorA} />
            <path d="M24 6 L40 14 L40 30 L24 42 Z" fill={colorB} opacity={0.85} />
          </>
        )}
        {variant === 2 && (
          <>
            <rect x="4" y="21" width="40" height="7" fill={colorA} transform="skewX(-20)" />
            <rect x="4" y="30" width="32" height="5" fill={colorB} opacity={0.9} transform="skewX(-20)" />
            <rect x="4" y="11" width="26" height="5" fill={colorB} opacity={0.6} transform="skewX(-20)" />
          </>
        )}
      </g>
    </svg>
  );
}
