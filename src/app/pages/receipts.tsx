import { useState } from "react";
import { Upload, Camera, FileText, CheckCircle, Loader } from "lucide-react";

const receipts = [
  {
    id: 1,
    merchant: "Amazon",
    date: "2026-03-10",
    amount: 2450,
    items: 4,
    confidence: 98,
    status: "verified"
  },
  {
    id: 2,
    merchant: "Domino's Pizza",
    date: "2026-03-09",
    amount: 680,
    items: 2,
    confidence: 95,
    status: "verified"
  },
  {
    id: 3,
    merchant: "Nike Store",
    date: "2026-03-07",
    amount: 4200,
    items: 1,
    confidence: 92,
    status: "processing"
  },
];

export function ReceiptsPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload
    setShowUploadModal(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Receipt Scanner</h1>
        <p className="text-slate-600 dark:text-slate-400">Upload and automatically extract data from receipts</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative p-12 rounded-2xl border-2 border-dashed transition-all ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5"
        } backdrop-blur-xl`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Upload className="h-10 w-10 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Upload Receipt
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Drag and drop your receipt here, or click to browse
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
              >
                <FileText className="h-5 w-5" />
                Browse Files
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all">
                <Camera className="h-5 w-5" />
                Take Photo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Receipts */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Receipts</h3>
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{receipt.merchant}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {receipt.date} • {receipt.items} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                    ₹{receipt.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    {receipt.status === "verified" ? (
                      <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {receipt.confidence}% Verified
                        </span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center gap-1">
                        <Loader className="h-4 w-4 text-orange-600 dark:text-orange-400 animate-spin" />
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                          Processing
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Processing Receipt</h2>
            
            {/* OCR Animation */}
            <div className="mb-6 p-6 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Loader className="h-6 w-6 text-indigo-500 animate-spin" />
                <p className="text-slate-900 dark:text-white font-medium">Scanning receipt...</p>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
              </div>
            </div>

            {/* Extracted Data Preview */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Merchant Name</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Starbucks Coffee</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Date</p>
                  <p className="font-semibold text-slate-900 dark:text-white">March 12, 2026</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Amount</p>
                  <p className="font-semibold text-slate-900 dark:text-white">₹450</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Items</p>
                <ul className="space-y-1 text-sm text-slate-900 dark:text-white">
                  <li>• Caffe Latte - ₹280</li>
                  <li>• Blueberry Muffin - ₹170</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Confidence Score: 97% - High Accuracy
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
              >
                Save Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
