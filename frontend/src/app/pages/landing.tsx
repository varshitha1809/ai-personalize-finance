import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Brain, TrendingUp, Shield, Zap, Bot } from "lucide-react";
import { motion } from "motion/react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-purple-950/20">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/40 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#A855F7]">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">FinanceAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#A855F7] text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-8">
            <Bot className="h-4 w-4" />
            <span>AI-Powered Financial Intelligence</span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6">
            Your Personal Finance
            <br />
            <span className="bg-gradient-to-r from-[#06FFA5] to-[#10B981] bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Harness the power of AI to track expenses, forecast trends, and make smarter financial decisions.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#A855F7] text-white font-medium hover:shadow-xl hover:shadow-indigo-500/50 transition-all"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/app"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
            >
              View Demo
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Insights</h3>
            <p className="text-slate-400">
              Get intelligent recommendations and predictions based on your spending patterns.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Forecasting</h3>
            <p className="text-slate-400">
              Predict future expenses and savings with advanced machine learning models.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-Time Tracking</h3>
            <p className="text-slate-400">
              Monitor your finances in real-time with voice logging and receipt scanning.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-8 py-24 border-t border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Bank-Level Security</span>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Your financial data is encrypted and secured with industry-leading protocols.
            We never sell your data.
          </p>
        </div>
      </section>
    </div>
  );
}
