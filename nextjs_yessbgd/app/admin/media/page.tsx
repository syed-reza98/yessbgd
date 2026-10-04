"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  uploadMediaAction,
  getAdminMediaItemsAction,
  deleteMediaAction,
} from "@/app/admin/actions";
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  Folder,
  Search,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function MediaGalleryPage() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [query, setQuery] = useState("");

  const loadMedia = async () => {
    try {
      const data = await getAdminMediaItemsAction();
      setMediaItems(data || []);
    } catch (err) {
      console.error("Failed to load media items:", err);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", selectedFolder === "all" ? "general" : selectedFolder);

      const res = await uploadMediaAction(formData);
      if (!res.success) throw new Error("Upload failed.");

      await loadMedia();
    } catch (err: any) {
      alert(err.message || "Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    try {
      await deleteMediaAction(id);
      await loadMedia();
    } catch (err: any) {
      alert(err.message || "Failed to delete asset.");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const filtered = mediaItems.filter(
    (item) =>
      item.file_name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedFolder === "all" || item.folder === selectedFolder)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
            DIGITAL ASSET MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Media Library</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload images, diagrams, and corporate documents to server storage with instant web URLs.
          </p>
        </div>

        <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white text-xs font-bold shadow-md shadow-teal-700/20 hover:opacity-95 transition-all cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload New Asset"}</span>
          <input
            type="file"
            accept="image/*,.pdf,.docx"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["all", "general", "logos", "ventures", "teams", "demos"].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedFolder === f
                  ? "bg-teal-700 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-xs"
          />
        </div>
      </div>

      {/* Grid of media */}
      {filtered.length === 0 ? (
        <div className="admin-glass-card rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-sm font-bold text-slate-700">No media assets found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload images or files using the button above to begin populating your media library.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="admin-glass-card group rounded-xl border border-slate-200 p-2.5 flex flex-col justify-between hover:border-teal-600/50 transition-all shadow-xs"
            >
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                {item.mime_type?.startsWith("image/") ? (
                  <Image
                    src={item.url}
                    alt={item.alt_text || item.file_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="text-center p-2">
                    <Folder className="w-8 h-8 text-teal-700 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-500 uppercase font-mono">
                      {item.file_name.split(".").pop()}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-1 right-1 p-1.5 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                  title="Delete File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2.5">
                <p className="text-xs font-semibold text-slate-800 truncate" title={item.file_name}>
                  {item.file_name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                  <span className="capitalize">{item.folder}</span>
                  {item.size_bytes ? `${Math.round(item.size_bytes / 1024)} KB` : "Asset"}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="flex items-center gap-1 text-[11px] text-teal-700 hover:text-teal-800 font-medium hover:underline cursor-pointer"
                  title="Copy Link"
                >
                  {copiedUrl === item.url ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                  title="Open file"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
