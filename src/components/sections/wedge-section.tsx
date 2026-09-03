import { content } from "@/content";

export function WedgeSection() {
  return (
    <section className="bg-zinc-100 text-zinc-900 dark:bg-zinc-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-300">
        {content.wedge.map((item, i) => (
          <div key={i} className="py-6 md:py-0 md:px-10 flex flex-col items-center md:items-start text-center md:text-left first:pl-0 last:pr-0">
            <h3 className={`text-[18px] font-bold font-mono tracking-tight mb-2 ${item.type === 'brand' ? 'text-brand' : 'text-zinc-900'}`}>{item.title}</h3>
            <p className="text-zinc-600 text-[14px] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
