import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const sampleMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your AI Financial Advisor. I can help you with budgeting, savings goals, expense analysis, and financial planning. What would you like to know?",
    timestamp: "10:30 AM"
  },
];

const suggestedQuestions = [
  "Can I afford a ₹10,000 phone?",
  "How much should I save monthly?",
  "Will I run out of money this year?",
  "What's my biggest expense category?",
  "How can I reduce my spending?",
  "When can I buy a car?",
];

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("afford") && lowerQuestion.includes("phone")) {
      return "Based on your current financial situation:\n\n✅ Yes, you can afford a ₹10,000 phone!\n\nAnalysis:\n• Your current balance: ₹4,85,230\n• Monthly savings: ₹14,000\n• This purchase would use 71% of one month's savings\n\nRecommendation: Since you have healthy savings and this is within your budget, you can proceed with this purchase. However, I suggest looking for deals or offers to save even more!";
    }
    
    if (lowerQuestion.includes("save monthly")) {
      return "Based on your income and expenses:\n\n💡 Recommended Monthly Savings: ₹25,000\n\nBreakdown:\n• Current average savings: ₹14,000/month\n• Recommended increase: ₹11,000/month\n• This represents 29% of your monthly income\n\nStrategies to achieve this:\n1. Reduce dining expenses by 15% → Save ₹3,750\n2. Optimize subscription services → Save ₹2,000\n3. Use public transport 2 days/week → Save ₹1,500\n4. Cook at home more often → Save ₹3,750\n\nWith these changes, you'll reach ₹2.4 lakh in annual savings!";
    }
    
    if (lowerQuestion.includes("run out of money")) {
      return "Financial Security Analysis:\n\n✅ You're in a strong position!\n\nKey Metrics:\n• Current runway: 7.2 months at current spending\n• Emergency fund status: Well-funded\n• Income stability: Excellent\n• Expense trend: Manageable\n\nRisk Assessment: LOW\n\nYour current balance and savings rate indicate you're very unlikely to run out of money this year. In fact, you're projected to increase your savings by ₹1,68,000 by December 2026.\n\nKeep maintaining your current financial discipline!";
    }
    
    return "I've analyzed your question. Based on your spending patterns, income, and financial goals, I recommend focusing on building your emergency fund and diversifying your savings. Would you like me to create a detailed financial plan for you?";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-12rem)]">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">AI Financial Advisor</h1>
        <p className="text-slate-600 dark:text-slate-400">Get personalized financial insights and recommendations</p>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col h-full rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === "user" ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {message.timestamp}
                </p>
              </div>

              {message.role === "user" && (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Try asking:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left text-sm text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                >
                  <Sparkles className="h-4 w-4 inline mr-2 text-indigo-500" />
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-white/20 dark:border-white/10 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about your finances..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
