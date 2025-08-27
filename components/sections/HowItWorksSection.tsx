'use client';

import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, Target, TrendingUp, Users } from 'lucide-react';

const steps = [
  {
    icon: CheckCircle,
    title: 'Choose Your Version',
    description: 'Select between our Lite (36 questions) or Full (60 questions) versions based on your time and interest level.',
    details: 'Both versions provide comprehensive analysis across all six political dimensions.',
  },
  {
    icon: BarChart3,
    title: 'Answer Questions',
    description: 'Respond to carefully crafted questions using a 7-point scale. Each question targets one or two political dimensions.',
    details: 'Questions cover real UK policy issues with relevant statistics and sources provided.',
  },
  {
    icon: Target,
    title: 'Multi-Axis Scoring',
    description: 'Our algorithm calculates your position across six dimensions, not just left-right politics.',
    details: 'Economic, Social, Authority, Sovereignty, Environment, and Welfare axes provide a comprehensive view.',
  },
  {
    icon: TrendingUp,
    title: 'Confidence & Results',
    description: 'We measure confidence in your results and provide detailed analysis with explanations, tags, and visual charts.',
    details: 'Save your results and track changes over time to see how your views evolve.',
  },
  {
    icon: Users,
    title: 'Party Alignment',
    description: 'See how your views align with major UK political parties using advanced similarity algorithms.',
    details: 'Get percentage matches and detailed breakdowns to understand your political positioning.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our methodology combines political science research with modern technology to provide accurate, meaningful results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {step.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Our Methodology
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Question Design</h4>
                <p className="text-neutral-600 text-sm">
                  Questions are neutral, avoiding loaded language and presenting balanced perspectives on UK political issues.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Scoring System</h4>
                <p className="text-neutral-600 text-sm">
                  Likert scale responses (1-7) are mapped to scores (-3 to +3), weighted by question importance, and normalized to -100 to +100 range.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Confidence Calculation</h4>
                <p className="text-neutral-600 text-sm">
                  We measure data sufficiency per axis and require 60% coverage before showing results. This ensures accuracy and meaningful insights.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Privacy & Ethics</h4>
                <p className="text-neutral-600 text-sm">
                  Your data is protected with Row Level Security. Anonymous sessions are supported, and personal data is only collected with explicit consent.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
