'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatBDT } from '@/lib/formatters';
import { getLineTotal } from '@/lib/pricing';

const DRAWER_ID = 'cart-drawer';

export default function CartDrawer() {
  const { language, t } = useLanguage();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    totalItemCount,
    shippingDistrict,
  } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const close = () => setIsCartOpen(false);

  return (
    <div className="fixed inset-0 z-[70]" aria-labelledby="cart-drawer-title">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 h-full w-full cursor-default bg-black/60"
        onClick={close}
      />
      <aside
        id={DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#D4AF37]/30 bg-[#0B0F19] text-[#F9FAFB] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#1F2937] px-5 py-4">
          <h2 id="cart-drawer-title" className="text-lg font-bold font-serif text-[#D4AF37]">
            {t('cart.title')}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-[#9CA3AF] transition hover:bg-[#111827] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-[#8B8FA8]" aria-hidden="true" />
            <p className="mb-6 text-sm text-[#9CA3AF]">{t('cart.empty')}</p>
            <Link href="/shop" onClick={close} className="rounded-lg bg-[#D4AF37] px-5 py-3 font-bold text-[#0B0F19] hover:bg-[#C5A059] focus:outline-none focus:ring-2 focus:ring-white">
              {language === 'bn' ? 'কেনাকাটা শুরু করুন' : 'Browse Collection'}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map((item) => {
                const unitPrice = getLineTotal({ ...item, quantity: 1 });
                const engravingFee = item.engravingFee ?? 0;
                return (
                  <div key={item.id} className="flex gap-3 border-b border-[#1F2937] pb-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#111827]">
                      {item.product.images?.[0] ? (
                        <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">{item.product.brand}</p>
                          <h3 className="text-sm font-semibold leading-snug">{item.product.title[language]}</h3>
                          {item.selectedEngravingText && (
                            <p className="mt-1 text-xs text-[#9CA3AF]">
                              {t('cart.engraving_fee')}: “{item.selectedEngravingText}” (+{formatBDT(engravingFee, language)})
                            </p>
                          )}
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="rounded p-1 text-[#9CA3AF] hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" aria-label={`Remove ${item.product.title[language]}`}>
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded border border-[#2A2F45]" aria-label={`Quantity for ${item.product.title[language]}`}>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10" aria-label={`Decrease quantity of ${item.product.title[language]}`}>
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-7 text-center text-sm" aria-live="polite">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10" aria-label={`Increase quantity of ${item.product.title[language]}`}>
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-bold">{formatBDT(unitPrice * item.quantity, language)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#1F2937] bg-[#111827] px-5 py-5">
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#9CA3AF]"><span>{t('cart.subtotal')} ({totalItemCount})</span><span>{formatBDT(subtotal, language)}</span></div>
                <div className="flex justify-between text-[#9CA3AF]"><span>{t('cart.shipping')} ({shippingDistrict})</span><span>{formatBDT(shippingFee, language)}</span></div>
                <div className="flex justify-between border-t border-[#2A2F45] pt-3 text-base font-bold text-white"><span>{t('cart.total')}</span><span className="text-[#D4AF37]">{formatBDT(total, language)}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={close} className="rounded-lg border border-[#D4AF37]/50 px-3 py-3 text-center text-sm font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]">{language === 'bn' ? 'কার্ট দেখুন' : 'View Cart'}</Link>
                <Link href="/checkout" onClick={close} className="rounded-lg bg-[#D4AF37] px-3 py-3 text-center text-sm font-bold text-[#0B0F19] hover:bg-[#C5A059] focus:outline-none focus:ring-2 focus:ring-white">{t('cart.checkout_cta')}</Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
