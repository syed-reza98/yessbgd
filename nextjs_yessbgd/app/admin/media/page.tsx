"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
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
    const { data } = await supabase
      .from("cms_media")
      .select("*")
      .order("created_at", { ascending: false });
    setMediaItems(data || []);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage bucket 'cms-media'
      const { error: uploadError } = await supabase.storage
        .from("cms-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("cms-media")
        .getPublicUrl(filePath);

      // Record in cms_media table
      const { error: dbError } = await supabase.from("cms_media").insert({
        file_name: file.name,
        url: publicUrl,
        path: filePath,
        mime_type: file.type,
        size_bytes: file.size,
        folder: selectedFolder === "all" ? "general" : selectedFolder,
      });

      if (dbError) throw dbError;

      await loadMedia();
    } catch (err: any) {
      alert(err.message || "Failed to upload file.");
    } finally {
      setUploading(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            DIGITAL ASSET MANAGEMENT
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Media Gallery</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload images, diagrams, and corporate documents to Supabase Storage with instant CDN links.
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
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Grid of Media Assets */}
      {filtered.length === 0 ? (
        <div className="admin-glass-card rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <ImageIcon className="w-12 h-12 text-slate-400 mb-3 opacity-60" />
          <h3 className="text-sm font-bold text-slate-900">No uploaded media found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Upload images or company documents to populate your digital asset library. Local images in `/assets` remain accessible directly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="admin-glass-card rounded-xl p-3 flex flex-col justify-between group hover:border-teal-500 hover:shadow-md transition-all"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center mb-2">
                {item.mime_type?.startsWith("image/") ? (
                  <img
                    src={item.url}
                    alt={item.file_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-900 truncate" title={item.file_name}>
                  {item.file_name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {item.size_bytes ? `${Math.round(item.size_bytes / 1024)} KB` : "Asset"}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="flex items-center gap-1 text-[11px] text-teal-700 hover:text-teal-800 font-medium hover:underline"
                  title="Copy CDN Link"
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
