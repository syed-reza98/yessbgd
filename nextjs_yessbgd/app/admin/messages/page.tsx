"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { updateMessageStatusAction } from "@/app/admin/actions";
import {
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  Send,
  Trash2,
} from "lucide-react";

export default function MessagesInboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);
  const [replyNote, setReplyNote] = useState("");
  const [updating, setUpdating] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    if (data && data.length > 0 && !selectedMsg) {
      setSelectedMsg(data[0]);
      setReplyNote(data[0].status_note || "");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedMsg) return;
    setUpdating(true);
    try {
      await updateMessageStatusAction(selectedMsg.id, newStatus, replyNote);
      setSelectedMsg({ ...selectedMsg, status: newStatus, status_note: replyNote });
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selectedMsg.id ? { ...m, status: newStatus, status_note: replyNote } : m
        )
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const filtered = messages.filter((m) => {
    const leadName = (m.name || m.full_name || "").toLowerCase();
    const queryLower = query.toLowerCase();
    const matchesQuery =
      leadName.includes(queryLower) ||
      m.email?.toLowerCase().includes(queryLower) ||
      (m.organization && m.organization.toLowerCase().includes(queryLower)) ||
      (m.subject && m.subject.toLowerCase().includes(queryLower));
    const matchesFilter = statusFilter === "all" || m.status === statusFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            INBOUND CLIENT LEADS & INSTITUTIONAL INQUIRIES
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Inquiries Inbox</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review enterprise briefs, confidential RFPs, and practice consultation requests.
          </p>
        </div>

        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lead or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["all", "new", "read", "replied", "archived"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              statusFilter === st
                ? "bg-teal-700 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Split Inbox View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List (5 cols) */}
        <div className="lg:col-span-5 admin-glass-card rounded-2xl overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Inbound Messages ({filtered.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No messages found matching filter.
              </div>
            ) : (
              filtered.map((msg) => {
                const active = selectedMsg?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setSelectedMsg(msg);
                      setReplyNote(msg.status_note || "");
                    }}
                    className={`w-full p-4 text-left transition-all flex items-start justify-between gap-3 ${
                      active ? "bg-teal-50/80 border-l-4 border-teal-600" : "hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {msg.name || msg.full_name || "Anonymous Lead"}
                      </div>
                      {msg.organization && (
                        <div className="text-[11px] text-slate-500 font-medium">
                          {msg.organization}
                        </div>
                      )}
                      <div className="text-xs text-amber-700 font-medium mt-0.5 truncate max-w-[200px]">
                        {msg.subject || msg.practice_area || "General Inquiry"}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {msg.message}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-700 capitalize">
                        {msg.status}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Message Detail Pane (7 cols) */}
        <div className="lg:col-span-7 admin-glass-card rounded-2xl p-6 flex flex-col h-[700px] overflow-y-auto space-y-6">
          {selectedMsg ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {selectedMsg.subject || selectedMsg.practice_area || "Inbound Contact Brief"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="font-semibold text-slate-900">
                      {selectedMsg.name || selectedMsg.full_name || "Anonymous Lead"}
                    </span>
                    {selectedMsg.organization && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium">
                        {selectedMsg.organization}
                      </span>
                    )}
                    {selectedMsg.request_nda && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3 text-amber-600" />
                        Bilateral NDA Requested
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 font-mono">
                      <Mail className="w-3.5 h-3.5 text-amber-600" />
                      <a href={`mailto:${selectedMsg.email}`} className="hover:underline text-slate-800">{selectedMsg.email}</a>
                    </span>
                    {selectedMsg.phone && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Phone className="w-3.5 h-3.5 text-amber-600" />
                        <span>{selectedMsg.phone}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {["new", "read", "replied", "archived"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(st)}
                      disabled={updating}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        selectedMsg.status === st
                          ? "bg-teal-700 text-white border border-teal-700 shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Inquiry Message Content
                </span>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                  {selectedMsg.message}
                </div>
              </div>

              {/* CRM / Follow-up Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Internal Follow-Up & CRM Notes
                </span>
                <textarea
                  rows={3}
                  value={replyNote}
                  onChange={(e) => setReplyNote(e.target.value)}
                  placeholder="Record call summary, meeting scheduled, or reply status..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
                <button
                  onClick={() => handleUpdateStatus(selectedMsg.status)}
                  disabled={updating}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-all"
                >
                  {updating ? "Saving..." : "Save CRM Note"}
                </button>
              </div>

              {/* Quick Reply Link */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMsg.email}?subject=RE: ${encodeURIComponent(selectedMsg.subject || "YESS Bangladesh Inquiry")}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white text-xs font-bold shadow-md shadow-teal-700/20 hover:opacity-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Compose Direct Reply Email</span>
                </a>
                <span className="text-[10px] text-slate-500 font-mono">
                  Received: {new Date(selectedMsg.created_at).toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <div className="m-auto text-center text-xs text-slate-500">
              Select an inquiry from the left panel to inspect message content.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
