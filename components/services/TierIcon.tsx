/** Line icon per service tier, matching the design handoff. */
export function TierIcon({
  id,
  color,
  size = 28,
}: {
  id: string;
  color: string;
  size?: number;
}) {
  const c = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...c}>
      {id === "foundation" && (
        <>
          <path d="M21 4 3 11l7 3 2 6 3.5-5" />
          <path d="M21 4 10 14" />
        </>
      )}
      {id === "premier" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12 19 5" />
        </>
      )}
      {id === "private" && (
        <>
          <circle cx="10" cy="8" r="3.2" />
          <path d="M4.5 20c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5" />
          <circle cx="18" cy="7" r="3" />
          <path d="M18 5.8V7l.9.7" />
        </>
      )}
      {id === "sovereign" && (
        <>
          <path d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-3Z" />
          <path d="m12 8 1.2 2.4 2.6.4-1.9 1.9.4 2.6L12 14l-2.3 1.3.4-2.6-1.9-1.9 2.6-.4L12 8Z" />
        </>
      )}
      {id === "apex" && (
        <>
          <path d="M7 4h10l4 5-9 11L3 9l4-5Z" />
          <path d="M3 9h18M9.5 9 12 20 14.5 9M7 4l2.5 5L12 4l2.5 5L17 4" />
        </>
      )}
    </svg>
  );
}
