'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Product } from '@/types';
import { formatBDT } from '@/lib/formatters';

const EMPTY: Omit<Product, 'id'> = {
  sku: '', title: { en: '', bn: '' }, slug: '', brand: 'Casio', category: 'Watches' as any,
  subcategory: '', price: 0, stockQuantity: 0, isAuthentic: true,
  warrantyInfo: { en: '', bn: '' }, images: [], description: { en: '', bn: '' },
  specifications: {}, rating: 0, reviewCount: 0, allowEngraving: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<any>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const load = () => setProducts(db.getProducts());
  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openCreate = () => { setEditing(null); setForm({ ...EMPTY }); setShowModal(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ ...p }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); };

  const handleSave = () => {
    setSaving(true);
    try {
      if (editing) {
        db.updateProduct(editing.id, form);
        showToast('Product updated successfully');
      } else {
        db.createProduct(form);
        showToast('Product created successfully');
      }
      load(); closeModal();
    } finally { setSaving(false); }
  };

  const handleDelete = (id: string) => {
    db.deleteProduct(id); load();
    setDeleteConfirm(null);
    showToast('Product deleted');
  };

  const handleStock = (id: string, qty: number) => {
    db.updateProduct(id, { stockQuantity: Math.max(0, qty) });
    load();
  };

  const upd = (key: string, val: any) => setForm((f: any) => ({ ...f, [key]: val }));
  const updNested = (outer: string, inner: string, val: string) =>
    setForm((f: any) => ({ ...f, [outer]: { ...f[outer], [inner]: val } }));

  const filtered = products.filter(p =>
    !search || p.title.en.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg animate-pulse">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[#8B8FA8] hover:text-[#D4AF37] text-sm transition">← Dashboard</Link>
          <span className="text-[#2A2F45]">|</span>
          <h1 className="text-base font-bold text-[#D4AF37]">Product Management</h1>
        </div>
        <button onClick={openCreate} className="px-4 py-2 bg-[#D4AF37] text-[#0B0F19] font-bold text-sm rounded-lg hover:bg-[#C5A059] transition">
          + Add Product
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, SKU, or brand..."
            className="flex-1 bg-[#111827] border border-[#1F2937] focus:border-[#D4AF37] text-[#F9FAFB] rounded-xl px-4 py-2.5 text-sm outline-none transition" />
          <div className="flex items-center gap-2 text-sm text-[#8B8FA8] bg-[#111827] border border-[#1F2937] px-4 rounded-xl">
            <span className="font-semibold text-[#F9FAFB]">{filtered.length}</span> products
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1F2937] text-xs text-[#8B8FA8] uppercase tracking-widest">
                  <th className="text-left px-5 py-3.5">Product</th>
                  <th className="text-left px-5 py-3.5">SKU</th>
                  <th className="text-left px-5 py-3.5">Brand</th>
                  <th className="text-right px-5 py-3.5">Price</th>
                  <th className="text-center px-5 py-3.5">Stock</th>
                  <th className="text-center px-5 py-3.5">Status</th>
                  <th className="text-right px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} className={`border-b border-[#1F2937]/50 hover:bg-[#0d1120] transition ${i % 2 === 0 ? '' : 'bg-[#0d1120]/30'}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0B0F19] rounded-lg overflow-hidden shrink-0 border border-[#2A2F45]">
                          {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-[#2A2F45] text-lg">⌚</div>}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#F9FAFB] line-clamp-1">{p.title.en}</p>
                          <p className="text-xs text-[#8B8FA8]">{p.subcategory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#8B8FA8] font-mono">{p.sku}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-md">{p.brand}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <p className="text-sm font-bold text-[#F9FAFB]">{formatBDT(p.salePrice ?? p.price)}</p>
                      {p.salePrice != null && <p className="text-xs text-[#8B8FA8] line-through">{formatBDT(p.price)}</p>}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleStock(p.id, p.stockQuantity - 1)} className="w-6 h-6 rounded bg-[#2A2F45] hover:bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold transition">−</button>
                        <span className={`w-10 text-center text-sm font-bold ${p.stockQuantity === 0 ? 'text-red-400' : p.stockQuantity <= 5 ? 'text-orange-400' : 'text-green-400'}`}>{p.stockQuantity}</span>
                        <button onClick={() => handleStock(p.id, p.stockQuantity + 1)} className="w-6 h-6 rounded bg-[#2A2F45] hover:bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold transition">+</button>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.stockQuantity === 0 ? 'bg-red-500/10 text-red-400 border-red-500/30' : p.stockQuantity <= 5 ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
                        {p.stockQuantity === 0 ? 'Out of Stock' : p.stockQuantity <= 5 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="text-xs px-3 py-1.5 border border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] rounded-lg transition">Edit</button>
                        {deleteConfirm === p.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1.5 border border-[#2A2F45] text-[#9CA3AF] rounded-lg">✕</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(p.id)} className="text-xs px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg transition">Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-[#8B8FA8] text-sm">No products found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2937] sticky top-0 bg-[#111827]">
              <h2 className="text-base font-bold text-[#D4AF37]">{editing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closeModal} className="text-[#8B8FA8] hover:text-[#F9FAFB] text-xl transition">✕</button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Title (English) *</label>
                  <input value={form.title?.en ?? ''} onChange={e => updNested('title', 'en', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Title (Bangla)</label>
                  <input value={form.title?.bn ?? ''} onChange={e => updNested('title', 'bn', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition font-[var(--font-noto-bengali)]" />
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">SKU</label>
                  <input value={form.sku ?? ''} onChange={e => upd('sku', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Slug</label>
                  <input value={form.slug ?? ''} onChange={e => upd('slug', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Brand</label>
                  <select value={form.brand ?? 'Casio'} onChange={e => upd('brand', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition">
                    {['Casio','Seiko','Citizen','Smartwatch','Other'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Category</label>
                  <select value={form.category ?? 'Watches'} onChange={e => upd('category', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition">
                    {['Watches','Smartwatches','Calculators','Accessories','Couple Sets'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Price (BDT) *</label>
                  <input type="number" value={form.price ?? 0} onChange={e => upd('price', Number(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Sale Price (BDT, optional)</label>
                  <input type="number" value={form.salePrice ?? ''} onChange={e => upd('salePrice', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Stock Quantity</label>
                  <input type="number" value={form.stockQuantity ?? 0} onChange={e => upd('stockQuantity', Number(e.target.value))}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Subcategory</label>
                  <input value={form.subcategory ?? ''} onChange={e => upd('subcategory', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#8B8FA8] font-medium mb-1.5">Description (English)</label>
                  <textarea rows={3} value={form.description?.en ?? ''} onChange={e => updNested('description', 'en', e.target.value)}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="authentic" checked={form.isAuthentic ?? false} onChange={e => upd('isAuthentic', e.target.checked)} className="accent-[#D4AF37]" />
                  <label htmlFor="authentic" className="text-sm text-[#9CA3AF]">Mark as Authentic</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="engraving" checked={form.allowEngraving ?? false} onChange={e => upd('allowEngraving', e.target.checked)} className="accent-[#D4AF37]" />
                  <label htmlFor="engraving" className="text-sm text-[#9CA3AF]">Allow Engraving</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-[#1F2937]">
                <button onClick={closeModal} className="flex-1 py-3 border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] rounded-lg text-sm font-medium transition">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition disabled:opacity-60">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
