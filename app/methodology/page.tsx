'use client';

import { motion } from 'framer-motion';
import { BarChart3, Target, Calculator, Shield, BookOpen, Users, TrendingUp, Zap } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Our Methodology
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A detailed explanation of how AlignUK analyzes political views and provides accurate, meaningful results.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Methodology Overview</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            AlignUK uses a multi-dimensional approach to political analysis, combining established political science 
            frameworks with modern computational methods. Our methodology is designed to provide nuanced, accurate 
            insights while maintaining neutrality and educational value.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            We analyze political views across six key dimensions rather than relying on simple left-right categorization, 
            recognizing that political ideology is complex and multi-faceted.
          </p>
        </motion.div>

        {/* Six Dimensions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Six Dimensions of Political Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Economic</h3>
              <p className="text-blue-800 text-sm mb-2">
                Measures views on the role of government in the economy, from state-led intervention to market-led approaches.
              </p>
              <p className="text-blue-700 text-xs">
                <strong>Range:</strong> -100 (State-led) to +100 (Market-led)
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Social</h3>
              <p className="text-purple-800 text-sm mb-2">
                Assesses attitudes toward social change and traditional values, from progressive to traditional.
              </p>
              <p className="text-purple-700 text-xs">
                <strong>Range:</strong> -100 (Progressive) to +100 (Traditional)
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Authority</h3>
              <p className="text-red-800 text-sm mb-2">
                Evaluates preference for individual freedom vs collective control, from libertarian to authoritarian.
              </p>
              <p className="text-red-700 text-xs">
                <strong>Range:</strong> -100 (Libertarian) to +100 (Authoritarian)
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">Sovereignty</h3>
              <p className="text-amber-800 text-sm mb-2">
                Measures views on national independence vs international cooperation, from nationalist to globalist.
              </p>
              <p className="text-amber-700 text-xs">
                <strong>Range:</strong> -100 (Globalist) to +100 (Nationalist)
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Environment</h3>
              <p className="text-green-800 text-sm mb-2">
                Assesses priority between environmental protection and economic growth.
              </p>
              <p className="text-green-700 text-xs">
                <strong>Range:</strong> -100 (Environmental) to +100 (Growth-focused)
              </p>
            </div>
            
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="font-semibold text-cyan-900 mb-2">Welfare</h3>
              <p className="text-cyan-800 text-sm mb-2">
                Evaluates approach to social support and public services, from universalist to conditionalist.
              </p>
              <p className="text-cyan-700 text-xs">
                <strong>Range:</strong> -100 (Universalist) to +100 (Conditionalist)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Question Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Question Design & Validation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary-600" />
                Research-Based Development
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Our questions are developed based on established political science research, including work on political 
                ideology measurement, policy preference analysis, and UK-specific political studies. Each question 
                targets specific dimensions and is validated for clarity and neutrality.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                Neutrality Standards
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Questions are carefully crafted to avoid loaded language, partisan bias, and leading phrasing. 
                We use balanced language that presents multiple perspectives fairly and avoids suggesting 
                "correct" or "preferred" answers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary-600" />
                UK-Specific Context
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                All questions are tailored to UK political context, including relevant statistics, current policy 
                debates, and British institutions. We include source citations and contextual information to 
                help users understand the issues being discussed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scoring System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Scoring Algorithm</h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Likert Scale Mapping
              </h3>
              <p className="text-blue-800 text-sm mb-2">
                User responses on a 1-7 scale are mapped to numerical values: 1 = -3, 2 = -2, 3 = -1, 4 = 0, 5 = +1, 6 = +2, 7 = +3
              </p>
              <p className="text-blue-700 text-xs">
                This creates a balanced scale where neutral responses (4) map to 0, and extreme responses map to ±3
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Question Weighting</h3>
              <p className="text-green-800 text-sm mb-2">
                Questions are weighted based on their relevance to each dimension. Primary questions (targeting one dimension) 
                have full weight, while secondary questions (targeting two dimensions) are weighted proportionally.
              </p>
              <p className="text-green-700 text-xs">
                This ensures that each dimension receives appropriate representation in the final score
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Normalization</h3>
              <p className="text-purple-800 text-sm mb-2">
                Raw scores are normalized to a -100 to +100 scale using statistical normalization techniques. 
                This ensures consistent interpretation across all dimensions and allows for meaningful comparisons.
              </p>
              <p className="text-purple-700 text-xs">
                The normalization accounts for the number of questions answered and their relative importance
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">Confidence Calculation</h3>
              <p className="text-amber-800 text-sm mb-2">
                We calculate confidence levels based on data sufficiency per dimension. A minimum of 60% coverage 
                is required before showing results, ensuring accuracy and meaningful insights.
              </p>
              <p className="text-amber-700 text-xs">
                Confidence scores range from 0-100% and indicate the reliability of each dimension's score
              </p>
            </div>
          </div>
        </motion.div>

        {/* Party Matching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Party Matching Algorithm</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Vector-Based Comparison
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                User results are converted to six-dimensional vectors and compared with party position vectors 
                using cosine similarity. This measures the angle between vectors, providing a similarity score 
                from -1 (opposite) to +1 (identical).
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                Softmax Normalization
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Raw similarity scores are converted to percentage weights using softmax normalization with temperature 
                control. This creates a probability-like distribution that sums to 100% across all parties.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary-600" />
                Party Position Data
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Party positions are estimated from recent manifestos, voting records, and policy statements. 
                These are updated regularly to reflect current party positions and policy changes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data Quality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Data Quality & Validation</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Response Validation</h3>
                <p className="text-neutral-600 text-sm">
                  We validate responses for consistency and completeness. Users must answer a minimum number of 
                  questions per dimension to ensure reliable results.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Statistical Reliability</h3>
                <p className="text-neutral-600 text-sm">
                  Our scoring system is tested for statistical reliability and validity. We use established 
                  psychometric principles to ensure accurate measurement of political views.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Continuous Improvement</h3>
                <p className="text-neutral-600 text-sm">
                  We continuously monitor and improve our methodology based on user feedback, academic research, 
                  and changes in political discourse.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Transparency</h3>
                <p className="text-neutral-600 text-sm">
                  We are transparent about our methodology and provide detailed explanations of how results 
                  are calculated and what they mean.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Methodological Limitations</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Complexity of Political Views</h3>
              <p className="text-red-800 text-sm">
                Political ideology is inherently complex and cannot be fully captured by any single assessment. 
                Our results provide one perspective among many possible interpretations.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">Self-Reported Data</h3>
              <p className="text-amber-800 text-sm">
                Results are based on self-reported responses, which may be influenced by social desirability bias, 
                misunderstanding of questions, or changes in views over time.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Party Position Estimates</h3>
              <p className="text-blue-800 text-sm">
                Party matching is based on estimated positions that may not reflect individual candidate views 
                or recent policy changes. Always research candidates independently.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Educational Purpose</h3>
              <p className="text-green-800 text-sm">
                This tool is designed for educational and self-reflection purposes, not as voting advice 
                or political endorsement. Use results as a starting point for further research and discussion.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center"
        >
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Questions About Our Methodology?
            </h2>
            <p className="text-neutral-600 mb-6">
              If you have questions about our methodology, scoring system, or technical approach, 
              please don't hesitate to contact us.
            </p>
            <a 
              href="mailto:methodology@alignuk.com" 
              className="btn-primary"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-neutral-500">
            Last Updated: {new Date().toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
