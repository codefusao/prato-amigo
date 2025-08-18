import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import type { ComponentType } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  features?: string[];
  icon?: ComponentType<{ className?: string }>;
  highlight?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessTimeline({ steps, className = "" }: ProcessTimelineProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">
              O Processo
            </h2>
            <p className="text-gray-700 mt-2">
              Uma solução simples e eficiente para um problema complexo
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <Card className="flex-1">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{step.description}</p>

                      {step.features && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {step.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                              <p className="text-gray-700">{feature}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.icon && step.highlight && (
                        <div className="flex items-center gap-4 mt-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="text-gray-700">{step.highlight}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
