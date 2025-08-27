'use client';

import { motion } from 'framer-motion';
import { Shield, BarChart3, Eye, BookOpen, Users, Zap, Target } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Neutral & Unbiased',
    description: 'Our questions are carefully crafted to avoid loaded language and present balanced perspectives on UK political issues.',
  },
  {
    icon: BarChart3,
    title: 'Six-Dimensional Analysis',
    description: 'Go beyond left-right politics with our comprehensive analysis across economic, social, authority, sovereignty, environment, and welfare dimensions.',
  },
  {
    icon: Target,
    title: 'Party Matching',
    description: 'See how your views align with major UK political parties using advanced similarity algorithms. Get percentage matches and detailed breakdowns.',
  },
  {
    icon: Eye,
    title: 'Privacy-Focused',
    description: 'Your responses are private by default. Sign in optionally to save your results and track changes over time.',
  },
  {
    icon: BookOpen,
    title: 'Evidence-Based',
    description: 'Questions include relevant UK statistics and sources, helping you understand the context behind each issue.',
  },
  {
    icon: Users,
    title: 'UK-Specific',
    description: 'Tailored specifically for UK politics, covering issues relevant to British society, economy, and governance.',
  },
  {
    icon: Zap,
    title: 'Flexible & Engaging',
    description: 'Choose between Lite (36 questions, ~5 min) or Full (60 questions, ~8 min) versions to match your time and interest level.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose AlignUK?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
            Our approach combines academic rigor with user-friendly design to provide meaningful political insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
