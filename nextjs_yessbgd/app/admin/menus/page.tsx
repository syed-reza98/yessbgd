"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { saveMenuItemAction, deleteMenuItemAction } from "@/app/admin/actions";
import { ListTree, Plus, Trash2, Edit, Save, CheckCircle2, ArrowUpDown } from "lucide-react";

export default function MenusManagerPage() {
  const [items, setItems] = useState<any[]>([]);
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.label) return;
    setSaving(true);
    try {
      await saveMenuItemAction(newItem);
      setNewItem({ label: "", label_bn: "", href: "/", location: "header", badge: "", sort_order: items.length + 1 });
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
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
          NAVIGATION HIERARCHY
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Menus & Navigation</h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize header mega-menu items, priority orders, and bilingual labels across the portal.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Menu item updated and published successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation List (2 cols) */}
        <div className="lg:col-span-2 admin-glass-card rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ListTree className="w-4 h-4 text-[#d4a359]" />
              <span>Current Header Menu ({items.length})</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase font-bold">
                  <th className="py-3 px-6">Order</th>
                  <th className="py-3 px-6">Label (English / বাংলা)</th>
                  <th className="py-3 px-6">Target Route</th>
                  <th className="py-3 px-6">Badge</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.id} className="admin-table-row transition-colors">
                    <td className="py-3 px-6 font-mono text-xs text-slate-400">
                      #{item.sort_order}
                    </td>
                    <td className="py-3 px-6 font-semibold text-white">
                      <div>{item.label}</div>
                      {item.label_bn && <div className="text-xs text-[#d4a359]">{item.label_bn}</div>}
                    </td>
                    <td className="py-3 px-6 font-mono text-xs text-[#35b0aa]">
                      {item.href}
                    </td>
                    <td className="py-3 px-6">
                      {item.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d4a359]/20 text-[#d4a359] border border-[#d4a359]/30">
                          {item.badge}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Form (1 col) */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#35b0aa]" />
            <span>Add Navigation Item</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                English Label
              </label>
              <input
                type="text"
                required
                value={newItem.label}
                onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                placeholder="e.g. Solutions"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                বাংলা লেবেল
              </label>
              <input
                type="text"
                value={newItem.label_bn}
                onChange={(e) => setNewItem({ ...newItem, label_bn: e.target.value })}
                placeholder="e.g. সমাধান"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Target Route / URL
              </label>
              <input
                type="text"
                required
                value={newItem.href}
                onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                placeholder="e.g. /services"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Badge Chip (Optional)
              </label>
              <input
                type="text"
                value={newItem.badge}
                onChange={(e) => setNewItem({ ...newItem, badge: e.target.value })}
                placeholder="e.g. New or 13 Active"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white font-bold text-xs shadow-md shadow-[#0d6e6e]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? "Adding..." : "Add to Navigation"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
