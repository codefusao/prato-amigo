import { Link } from "react-router";
import { Button } from "../ui/Button";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "white";
}

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttons: CTAButton[];
  className?: string;
  background?: "gradient" | "solid";
}

export function CTASection({
  title,
  subtitle,
  buttons,
  className = "",
  background = "gradient",
}: CTASectionProps) {
  const bgClasses = background === "gradient" 
    ? "bg-gradient-to-r from-green-600 to-green-700" 
    : "bg-green-600";

  return (
    <section className={`py-16 ${bgClasses} text-white relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button, index) => (
            <Link key={index} to={button.href}>
              <Button 
                className={
                  button.variant === "outline"
                    ? "px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-all"
                    : button.variant === "white"
                    ? "px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100"
                    : "px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                }
              >
                {button.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
