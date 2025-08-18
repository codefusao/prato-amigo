interface Stat {
  value: string;
  description: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className = "" }: StatsGridProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-green-50 flex-1 text-center min-w-[250px] max-w-[350px]"
            >
              <p className="text-4xl font-bold text-green-600">{stat.value}</p>
              <p className="text-gray-700 mt-2">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
