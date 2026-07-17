export default function TeamCard({
  name,
  role,
  bullets,
  photo,
}: {
  name: string;
  role: string;
  bullets: string[];
  photo?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-navy to-blue font-display text-3xl font-semibold text-white">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <h3 className="mt-5 text-lg font-bold text-navy">{name}</h3>
      <div className="mt-1 text-sm tracking-[0.15em] text-blue">{role}</div>
      <ul className="mt-5 space-y-2 text-left text-sm leading-relaxed text-ink-soft">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-blue" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
