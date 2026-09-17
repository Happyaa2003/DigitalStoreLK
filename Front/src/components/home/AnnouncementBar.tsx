import storeConfig from '@/config/storeConfig.json';

export default function AnnouncementBar() {
  if (!storeConfig.announcementBar.enabled) return null;

  const text = storeConfig.announcementBar.text;
  // Duplicate text for seamless infinite scroll
  const items = Array(4).fill(text);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 py-2.5 select-none">
      <div className="flex items-center gap-16 w-max announcement-scroll">
        {items.map((item, i) => (
          <span key={i} className="flex-shrink-0 text-white text-xs font-semibold tracking-wide">
            {item}
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-blue-700 to-transparent pointer-events-none" />
    </div>
  );
}
