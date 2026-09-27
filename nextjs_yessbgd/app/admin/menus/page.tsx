"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { saveMenuItemAction, deleteMenuItemAction } from "@/app/admin/actions";
import {
  ListTree,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  ArrowUpDown,
  Navigation,
  SlidersHorizontal,
} from "lucide-react";

export default function MenusManagerPage() {
  const [items, setItems] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<"header" | "footer">("header");
  const [newItem, setNewItem] = useState({
    label: "",
    label_bn: "",
    href: "/",
    location: "header",
    badge: "",
    sort_order: 1,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadItems = async () => {
    const { data } = await supabase
      .from("cms_menu_items")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = items.filter(
    (i) => (i.location || "header").toLowerCase() === selectedLocation
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.label) return;
    setSaving(true);
    try {
      await saveMenuItemAction({
        ...newItem,
        location: selectedLocation,
        sort_order: filteredItems.length + 1,
      });
      setNewItem({
        label: "",
        label_bn: "",
        href: "/",
        location: selectedLocation,
        badge: "",
        sort_order: filteredItems.length + 2,
      });
      setSuccess(true);
      await loadItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || "Failed to add menu item.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this navigation item?")) return;
    try {
      await deleteMenuItemAction(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete item.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          NAVIGATION HIERARCHY
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Menus & Navigation</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize both Header mega-menu links and Footer compliance/governance corridors across the sovereign portal.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Menu item updated and published successfully!</span>
        </div>
      )}

      {/* Location Selector Tabs */}
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
          <span>Header Navigation ({items.filter((i) => (i.location || "header") === "header").length})</span>
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
          <span>Footer Navigation ({items.filter((i) => i.location === "footer").length})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation List (2 cols) */}
        <div className="lg:col-span-2 admin-glass-card rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ListTree className="w-4 h-4 text-amber-600" />
              <span>
                {selectedLocation === "header" ? "Active Header Menu Items" : "Active Footer Menu Items"} (
                {filteredItems.length})
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 text-xs uppercase font-bold">
                  <th className="py-3 px-6">Order</th>
                  <th className="py-3 px-6">Label (English / বাংলা)</th>
                  <th className="py-3 px-6">Target Route</th>
                  <th className="py-3 px-6">Badge</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                      No navigation links found for {selectedLocation}. Add one below!
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-6 font-mono text-xs text-slate-500">
                        #{item.sort_order}
                      </td>
                      <td className="py-3 px-6 font-semibold text-slate-900">
                        <div>{item.label}</div>
                        {item.label_bn && (
                          <div className="text-xs text-amber-600 font-normal">{item.label_bn}</div>
                        )}
                      </td>
                      <td className="py-3 px-6 font-mono text-xs text-teal-700">
                        {item.href}
                      </td>
                      <td className="py-3 px-6">
                        {item.badge ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete navigation item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Form (1 col) */}
        <div className="admin-glass-card rounded-2xl p-6 space-y-4 border border-slate-200">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200 flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-600" />
            <span>Add to {selectedLocation === "header" ? "Header" : "Footer"}</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                English Label
              </label>
              <input
                type="text"
                required
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                placeholder="e.g. Solutions or Privacy Policy"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
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
                placeholder="e.g. সমাধান বা গোপনীয়তা নীতি"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Route / URL
              </label>
              <input
                type="text"
                required
                value={newItem.href}
                onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                placeholder="e.g. /services or /privacy"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
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
                placeholder="e.g. New or 13 Active"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white font-bold text-xs shadow-md shadow-teal-700/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? "Adding..." : `Add to ${selectedLocation === "header" ? "Header" : "Footer"}`}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
