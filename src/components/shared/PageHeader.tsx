interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-green-50 to-white ${className}`}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-700">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
