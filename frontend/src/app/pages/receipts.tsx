import { useEffect, useRef, useState } from "react";
import { Upload, FileText, CheckCircle, Loader, Trash2 } from "lucide-react";

const API = "http://127.0.0.1:8000";

export function ReceiptsPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("token");

  const fetchReceipts = () => {
    fetch(`${API}/receipts`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setReceipts(Array.isArray(d) ? d : []))
      .catch(() => setReceipts([]));
  };

  useEffect(() => { fetchReceipts(); }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${API}/upload-receipt`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    setUploading(false);
    fetchReceipts();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const deleteReceipt = async (id: number) => {
    await fetch(`${API}/receipts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReceipts();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Receipt Scanner</h1>
        <p className="text-slate-600 dark:text-slate-400">Upload and store your receipts</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative p-12 rounded-2xl border-2 border-dashed transition-all ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5"
        } backdrop-blur-xl`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            {uploading ? <Loader className="h-10 w-10 text-white animate-spin" /> : <Upload className="h-10 w-10 text-white" />}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {uploading ? "Uploading..." : "Upload Receipt"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Drag and drop your receipt here, or click to browse
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 mx-auto"
            >
              <FileText className="h-5 w-5" />
              Browse Files
            </button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
          </div>
        </div>
      </div>

      {/* Recent Receipts */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Receipts</h3>
        {receipts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-center">
            <p className="text-slate-500">No receipts yet. Upload one above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {receipts.map(receipt => (
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
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{receipt.merchant || receipt.file}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{receipt.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      {receipt.amount > 0 && (
                        <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                          ₹{receipt.amount.toLocaleString()}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        {receipt.status === "verified" ? (
                          <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
                          </div>
                        ) : (
                          <div className="px-3 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center gap-1">
                            <Loader className="h-4 w-4 text-orange-600 dark:text-orange-400 animate-spin" />
                            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Processing</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReceipt(receipt.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
