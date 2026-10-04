"use client";

import { useEffect, useState } from "react";
import {
  saveMenuItemAction,
  deleteMenuItemAction,
  reorderMenuItemsAction,
  getAdminMenuItemsAction,
} from "@/app/admin/actions";
import {
  ListTree,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Navigation,
  SlidersHorizontal,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  Hash,
} from "lucide-react";

interface MenuItem {
  id: string;
  location: string;
  parent_id?: string | null;
  depth?: number;
  label: string;
  label_bn?: string | null;
  href: string;
  badge?: string | null;
  sort_order: number;
  is_published?: boolean;
}

export default function MenusManagerPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<"header" | "footer">("header");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // New item form state
  const [newItem, setNewItem] = useState({
    label: "",
    label_bn: "",
    href: "/",
    badge: "",
    is_published: true,
  });

  // Edit item modal state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const loadItems = async () => {
    try {
      const data = await getAdminMenuItemsAction();
      setItems((data as MenuItem[]) || []);
    } catch (err: any) {
      console.error("Error loading menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Filter items by active tab (Header vs Footer) sorted by sort_order
  const filteredItems = items
    .filter((i) => (i.location || "header").toLowerCase() === selectedLocation)
    .sort((a, b) => a.sort_order - b.sort_order);

  // ── CREATE ───────────────────────────────────────────────────────────────
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.label.trim()) return;

    setSaving(true);
    try {
      const nextOrder = filteredItems.length > 0
        ? Math.max(...filteredItems.map((i) => i.sort_order || 0)) + 1
        : 1;

      await saveMenuItemAction({
        label: newItem.label.trim(),
        label_bn: newItem.label_bn.trim() || null,
        href: newItem.href.trim(),
        badge: newItem.badge.trim() || null,
        location: selectedLocation,
        sort_order: nextOrder,
        is_published: newItem.is_published,
      });

      setNewItem({
        label: "",
        label_bn: "",
        href: "/",
        badge: "",
        is_published: true,
      });

      showFeedback("success", `Added "${newItem.label}" to ${selectedLocation} navigation.`);
      await loadItems();
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to add navigation item.");
    } finally {
      setSaving(false);
    }
  };

  // ── UPDATE ───────────────────────────────────────────────────────────────
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.label.trim()) return;

    setSaving(true);
    try {
      await saveMenuItemAction({
        id: editingItem.id,
        label: editingItem.label.trim(),
        label_bn: editingItem.label_bn?.trim() || null,
        href: editingItem.href.trim(),
        badge: editingItem.badge?.trim() || null,
        location: editingItem.location || selectedLocation,
        sort_order: Number(editingItem.sort_order) || 1,
        is_published: editingItem.is_published ?? true,
      });

      showFeedback("success", `Updated "${editingItem.label}" successfully.`);
      setEditingItem(null);
      await loadItems();
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to update item.");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to remove "${label}" from navigation?`)) return;

    try {
      await deleteMenuItemAction(id);
      showFeedback("success", `Removed "${label}" from navigation.`);
      await loadItems();
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to delete item.");
    }
  };

  // ── TOGGLE VISIBILITY ───────────────────────────────────────────────────
  const handleTogglePublished = async (item: MenuItem) => {
    try {
      await saveMenuItemAction({
        ...item,
        is_published: !item.is_published,
      });
      showFeedback(
        "success",
        `Item "${item.label}" is now ${!item.is_published ? "live" : "hidden"}.`
      );
      await loadItems();
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to toggle visibility.");
    }
  };

  // ── SERIALIZE & REORDER (SWAP) ───────────────────────────────────────────
  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredItems.length) return;

    const currentItem = filteredItems[index];
    const targetItem = filteredItems[targetIndex];

    // Swap their sort orders
    const updatedPayload = [
      { id: currentItem.id, sort_order: targetItem.sort_order },
      { id: targetItem.id, sort_order: currentItem.sort_order },
    ];

    try {
      await reorderMenuItemsAction(updatedPayload);
      showFeedback("success", `Reordered "${currentItem.label}" ${direction}.`);
      await loadItems();
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to reorder items.");
    }
  };

  // ── SERIALIZE 1..N SEQUENTIAL RE-INDEXING ────────────────────────────────
  const handleReserializeAll = async () => {
    const serializedPayload = filteredItems.map((item, idx) => ({
      id: item.id,
      sort_order: idx + 1,
    }));

    try {
      await reorderMenuItemsAction(serializedPayload);
      showFeedback("success", `Serialized ${filteredItems.length} items with clean 1..N order.`);
      await loadItems();
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to serialize items.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            NAVIGATION HIERARCHY & SERIALIZATION
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Menus & Navigation</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage links, bilingual labels, badges, and exact serialized order for the Header nav bar and Footer corridors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReserializeAll}
            title="Cleanly re-index items sequentially 1, 2, 3..."
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Hash className="w-3.5 h-3.5 text-teal-700" />
            <span>Re-Index 1..N</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold animate-in fade-in ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Location Switcher */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSelectedLocation("header")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedLocation === "header"
              ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
              : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>
            Header Nav Bar ({items.filter((i) => (i.location || "header") === "header").length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedLocation("footer")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            selectedLocation === "footer"
              ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
              : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>
            Footer Navigation ({items.filter((i) => i.location === "footer").length})
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Items List & Ordering (2 Cols) */}
        <div className="lg:col-span-2 admin-glass-card rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ListTree className="w-4 h-4 text-teal-700" />
              <span>
                {selectedLocation === "header" ? "Header Nav Menu (Serialized)" : "Footer Compliance Menu"} (
                {filteredItems.length})
              </span>
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              Use ▲ ▼ to change order live on the landing page
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 text-xs uppercase font-bold">
                  <th className="py-3 px-4 w-24 text-center">Order</th>
                  <th className="py-3 px-6">Label (EN / বাংলা)</th>
                  <th className="py-3 px-6">Route</th>
                  <th className="py-3 px-4">Badge</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                      No items configured in {selectedLocation}. Use the form on the right to add links!
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Order Controls */}
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMove(index, "up")}
                            title="Move Up"
                            className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold text-teal-800 w-5 text-center">
                            #{item.sort_order}
                          </span>
                          <button
                            type="button"
                            disabled={index === filteredItems.length - 1}
                            onClick={() => handleMove(index, "down")}
                            title="Move Down"
                            className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Labels */}
                      <td className="py-3 px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.href === "/ventures" && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Mega-Menu
                            </span>
                          )}
                        </div>
                        {item.label_bn && (
                          <div className="text-xs text-amber-600 font-normal mt-0.5">{item.label_bn}</div>
                        )}
                      </td>

                      {/* Route */}
                      <td className="py-3 px-6 font-mono text-xs text-teal-700">
                        {item.href}
                      </td>

                      {/* Badge */}
                      <td className="py-3 px-4">
                        {item.badge ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>

                      {/* Published State */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(item)}
                          title={item.is_published !== false ? "Live (Click to Hide)" : "Hidden (Click to Publish)"}
                          className="inline-flex items-center cursor-pointer"
                        >
                          {item.is_published !== false ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <Eye className="w-3 h-3" />
                              <span>Live</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                              <EyeOff className="w-3 h-3" />
                              <span>Hidden</span>
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingItem({ ...item })}
                            className="p-1.5 text-slate-500 hover:text-teal-700 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer"
                            title="Edit menu item"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.label)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete menu item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Card (1 Col) */}
        <div className="admin-glass-card rounded-2xl p-6 space-y-4 border border-slate-200 shadow-xs h-fit">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200 flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-600" />
            <span>Add to {selectedLocation === "header" ? "Header" : "Footer"}</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                English Label *
              </label>
              <input
                type="text"
                required
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                placeholder="e.g. Platform"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                বাংলা লেবেল
              </label>
              <input
                type="text"
                value={newItem.label_bn}
                onChange={(e) => setNewItem({ ...newItem, label_bn: e.target.value })}
                placeholder="e.g. প্ল্যাটফর্ম"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Route / URL *
              </label>
              <input
                type="text"
                required
                value={newItem.href}
                onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                placeholder="e.g. /services or /platform"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Badge Chip (Optional)
              </label>
              <input
                type="text"
                value={newItem.badge}
                onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                placeholder="e.g. New, 13 Active, Hiring"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-slate-700">Publish Immediately</span>
              <input
                type="checkbox"
                checked={newItem.is_published}
                onChange={(e) => setNewItem({ ...newItem, is_published: e.target.checked })}
                className="w-4 h-4 accent-teal-700 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white font-bold text-xs shadow-md shadow-teal-700/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? "Adding Item..." : `Add to ${selectedLocation === "header" ? "Header" : "Footer"}`}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-700" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Edit Navigation Item
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  English Label *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                  বাংলা লেবেল
                </label>
                <input
                  type="text"
                  value={editingItem.label_bn || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, label_bn: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Route / URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.href}
                  onChange={(e) => setEditingItem({ ...editingItem, href: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Badge Chip
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="e.g. 13 Active"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Sort Order #
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingItem.sort_order}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <select
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:border-teal-600 focus:outline-none cursor-pointer"
                  >
                    <option value="header">Header Navigation</option>
                    <option value="footer">Footer Navigation</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <span className="text-xs font-bold text-slate-700">Published Live</span>
                  <input
                    type="checkbox"
                    checked={editingItem.is_published !== false}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_published: e.target.checked })
                    }
                    className="w-5 h-5 accent-teal-700 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
