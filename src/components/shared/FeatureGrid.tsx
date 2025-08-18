import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "react-router";

interface Feature {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

interface FeatureGridProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function FeatureGrid({ 
  features, 
  title, 
  subtitle, 
  className = "" 
}: FeatureGridProps) {
  return (
    <section className={`py-16 bg-green-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-green-800 mb-2">{title}</h2>
            )}
            {subtitle && <p className="text-gray-700">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.subtitle}</p>
                <p className="text-gray-700">{feature.description}</p>
              </div>
              {feature.linkText && feature.linkHref && (
                <div className="px-6 pb-6">
                  <Link
                    to={feature.linkHref}
                    className="text-green-600 hover:underline flex items-center"
                  >
                    {feature.linkText}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
