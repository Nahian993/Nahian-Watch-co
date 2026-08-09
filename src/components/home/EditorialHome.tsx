'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, CheckCircle2, Clock3, Compass, Gem, ShieldCheck, Smartphone, Sparkles, Wrench } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/db';
import { formatBDT } from '@/lib/formatters';
import ProductCard from '@/components/storefront/ProductCard';

const copy = {
  en: {
    kicker: 'CROWN WATCH CO. / DHAKA SINCE 1974',
    heroTitle: 'A considered way to keep time.',
    heroBody: 'Original timepieces, useful instruments, and the repair knowledge to keep them in your life for longer.',
    shop: 'Explore the collection',
    finder: 'Take the watch finder quiz',
    featureKicker: 'The edit',
    featureTitle: 'The pieces people come back for.',
    featureBody: 'A small edit of well-loved products from the current Crown Watch catalogue.',
    all: 'View all products',
    categories: 'Find your next essential',
    categoriesBody: 'From a first everyday watch to a calculator for the next exam, start with what you need.',
    editorialKicker: 'Beyond the purchase',
    editorialTitle: 'Good timekeeping is also good care.',
    editorialBody: 'Our showroom is a place to choose with clarity, ask practical questions, and return when a watch needs attention.',
    heritage: '50 years of local knowledge',
    heritageBody: 'Discover the story behind Crown Watch Co. and the craft that has shaped our service.',
    readStory: 'Read our heritage',
    pickKicker: "Editor's pick / This week",
    pickBody: 'A balanced everyday automatic with a legible dial and the character of a watch you can wear often.',
    pickCta: 'See the Seiko 5',
    care: 'A clearer path to care',
    careBody: 'Know what comes next, whether you are buying or bringing a watch back to life.',
    repair: 'Start a repair',
    authenticity: 'Understand authenticity',
    calculator: 'Estimate repair cost',
  },
  bn: {
    kicker: 'ক্রাউন ওয়াচ কো. / ঢাকা, ১৯৭৪ থেকে',
    heroTitle: 'সময়কে দেখার একটি সুন্দর উপায়।',
    heroBody: 'অরিজিনাল টাইমপিস, প্রয়োজনীয় ইন্সট্রুমেন্ট এবং দীর্ঘদিন যত্নে রাখার মেরামত সেবা।',
    shop: 'সংগ্রহ দেখুন',
    finder: 'ওয়াচ ফাইন্ডার কুইজ',
    featureKicker: 'নির্বাচিত সংগ্রহ',
    featureTitle: 'যে পণ্যগুলোর কাছে মানুষ ফিরে আসে।',
    featureBody: 'ক্রাউন ওয়াচের বর্তমান ক্যাটালগ থেকে ভালোবাসার কিছু পণ্য।',
    all: 'সব পণ্য দেখুন',
    categories: 'আপনার প্রয়োজন দিয়ে শুরু করুন',
    categoriesBody: 'প্রতিদিনের ঘড়ি থেকে পরের পরীক্ষার ক্যালকুলেটর—যা দরকার, তা দিয়ে শুরু করুন।',
    editorialKicker: 'কেনার পরেও',
    editorialTitle: 'ভালো সময়জ্ঞান মানে ভালো যত্নও।',
    editorialBody: 'সঠিকভাবে বেছে নেওয়া, ব্যবহারিক প্রশ্ন করা এবং প্রয়োজনে মেরামতের জন্য ফিরে আসা—সবই আমাদের সেবার অংশ।',
    heritage: 'স্থানীয় জ্ঞানের ৫০ বছর',
    heritageBody: 'ক্রাউন ওয়াচ কো.-এর গল্প এবং আমাদের সেবাকে গড়ে তোলা কারিগরি জানুন।',
    readStory: 'ঐতিহ্য জানুন',
    pickKicker: 'সম্পাদকের পছন্দ / এই সপ্তাহ',
    pickBody: 'পরিষ্কার ডায়াল, নির্ভরযোগ্য অটোমেটিক মুভমেন্ট—প্রতিদিন পরার জন্য ভারসাম্যপূর্ণ একটি ঘড়ি।',
    pickCta: 'সেইকো ৫ দেখুন',
    care: 'যত্নের সহজ পথ',
    careBody: 'কিনছেন বা পুরনো ঘড়ি ফিরিয়ে আনছেন—পরের ধাপটি পরিষ্কারভাবে জানুন।',
    repair: 'মেরামত শুরু করুন',
    authenticity: 'অরিজিনালিটি জানুন',
    calculator: 'মেরামতের খরচ দেখুন',
  },
};

const categories = [
  { href: '/shop', icon: Clock3, label: { en: 'Watches', bn: 'ঘড়ি' }, text: { en: 'Mechanical, quartz, and solar timepieces.', bn: 'মেকানিক্যাল, কোয়ার্টজ ও সোলার টাইমপিস।' } },
  { href: '/shop/smartwatches', icon: Smartphone, label: { en: 'Smartwatches', bn: 'স্মার্টওয়াচ' }, text: { en: 'Connected tools for an active day.', bn: 'সক্রিয় দিনের জন্য কানেক্টেড টুল।' } },
  { href: '/shop/calculators', icon: Calculator, label: { en: 'Calculators', bn: 'ক্যালকুলেটর' }, text: { en: 'Dependable instruments for study and work.', bn: 'পড়াশোনা ও কাজের নির্ভরযোগ্য ইন্সট্রুমেন্ট।' } },
  { href: '/repair', icon: Wrench, label: { en: 'Repair', bn: 'মেরামত' }, text: { en: 'A practical next step for your watch.', bn: 'আপনার ঘড়ির জন্য ব্যবহারিক পরের ধাপ।' } },
];

export default function EditorialHome() {
  const { language } = useLanguage();
  const text = copy[language];
  const products = db.getProducts();
  const featured = products.filter((product) => product.isFeatured || product.isBestSeller).sort((a, b) => b.rating - a.rating).slice(0, 4);
  const editorPick = products.find((product) => product.slug === 'seiko-5-automatic-military-canvas-black-snk809') ?? featured[0];

  return (
    <main className="bg-crown-canvas">
      <section className="relative isolate overflow-hidden border-b border-crown-border">
        <div className="absolute inset-0 crown-hero-glow" aria-hidden="true" />
        <div className="container relative grid min-h-[620px] items-center gap-12 py-20 lg:grid-cols-[1.04fr_.96fr] lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2"><Sparkles className="h-4 w-4" aria-hidden="true" /> {text.kicker}</p>
            <h1 className="display-xl mt-6 text-crown-primary">{text.heroTitle}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-crown-secondary">{text.heroBody}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="button-primary">{text.shop} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/quiz" className="button-secondary"><Compass className="h-4 w-4" aria-hidden="true" /> {text.finder}</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-crown-muted">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-crown-brand" /> {language === 'en' ? 'Authenticity guide available' : 'অরিজিনালিটি গাইড আছে'}</span>
              <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-crown-brand" /> {language === 'en' ? 'Repair support in Dhaka' : 'ঢাকায় মেরামত সেবা'}</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-6 rounded-full bg-crown-brand/10 blur-3xl" aria-hidden="true" />
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-crown-border-strong bg-crown-surface shadow-crown-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,.2),transparent_28%),linear-gradient(145deg,#182237,#0b0f19_72%)]" />
              <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-crown-brand/50 bg-[#101827] shadow-[0_0_0_14px_rgba(212,175,55,.06),0_0_80px_rgba(212,175,55,.16)]">
                <div className="absolute left-1/2 top-1/2 h-[42%] w-px origin-bottom -translate-x-1/2 -translate-y-full rotate-[25deg] bg-crown-brand" />
                <div className="absolute left-1/2 top-1/2 h-[32%] w-px origin-bottom -translate-x-1/2 -translate-y-full -rotate-[55deg] bg-crown-primary" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crown-brand" />
                <div className="absolute inset-5 rounded-full border border-crown-brand/20" />
                <span className="absolute left-1/2 top-8 -translate-x-1/2 text-[10px] font-semibold tracking-[.28em] text-crown-brand">CROWN</span>
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[.22em] text-crown-muted">EST. 1974</span>
              </div>
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between"><div><p className="eyebrow">CWC / 01</p><p className="mt-2 text-sm text-crown-secondary">Dhaka · Bangladesh</p></div><Gem className="h-7 w-7 text-crown-brand" aria-hidden="true" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container crown-section-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">{text.featureKicker}</p><h2 className="heading-xl mt-3 text-crown-primary">{text.featureTitle}</h2><p className="mt-3 max-w-xl text-crown-secondary">{text.featureBody}</p></div><Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-crown-brand">{text.all} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="border-y border-crown-border bg-crown-surface/60"><div className="container crown-section-sm"><p className="eyebrow">{text.categories}</p><h2 className="heading-xl mt-3 text-crown-primary">{text.categoriesBody}</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map(({ href, icon: Icon, label, text: categoryText }) => <Link key={href} href={href} className="group rounded-2xl border border-crown-border bg-crown-surface p-6 transition hover:-translate-y-1 hover:border-crown-border-strong"><Icon className="h-6 w-6 text-crown-brand" aria-hidden="true" /><h3 className="heading-lg mt-7 text-crown-primary">{label[language]}</h3><p className="mt-3 text-sm leading-6 text-crown-secondary">{categoryText[language]}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-crown-brand">{language === 'en' ? 'Explore' : 'দেখুন'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>

      <section className="container crown-section grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]"><div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-crown-border-strong bg-crown-surface p-8 sm:p-12"><div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-crown-brand/10 blur-3xl" /><p className="eyebrow relative">{text.editorialKicker}</p><h2 className="heading-xl relative mt-5 max-w-md text-crown-primary">{text.editorialTitle}</h2><p className="relative mt-5 max-w-md leading-7 text-crown-secondary">{text.editorialBody}</p><Link href="/heritage" className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-crown-brand">{text.readStory} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div><div><p className="eyebrow">{text.pickKicker}</p><h2 className="heading-xl mt-4 text-crown-primary">{editorPick?.title[language]}</h2><p className="mt-5 max-w-xl leading-7 text-crown-secondary">{text.pickBody}</p>{editorPick && <div className="mt-7 flex flex-wrap items-baseline gap-4"><span className="text-2xl font-bold text-crown-primary">{formatBDT(editorPick.salePrice ?? editorPick.price, language)}</span><span className="text-sm text-crown-muted">{editorPick.brand} · {editorPick.subcategory}</span></div>}<Link href={editorPick ? `/shop/${editorPick.slug}` : '/shop'} className="button-secondary mt-8">{text.pickCta} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>

      <section className="bg-crown-surface"><div className="container crown-section-sm"><div className="max-w-2xl"><p className="eyebrow">{text.care}</p><h2 className="heading-xl mt-3 text-crown-primary">{text.careBody}</h2></div><div className="mt-8 grid gap-4 md:grid-cols-3"><Link href="/repair" className="rounded-2xl border border-crown-border bg-crown-canvas p-6 hover:border-crown-border-strong"><Wrench className="h-5 w-5 text-crown-brand" /><h3 className="mt-5 font-semibold text-crown-primary">{text.repair}</h3></Link><Link href="/authenticity" className="rounded-2xl border border-crown-border bg-crown-canvas p-6 hover:border-crown-border-strong"><CheckCircle2 className="h-5 w-5 text-crown-brand" /><h3 className="mt-5 font-semibold text-crown-primary">{text.authenticity}</h3></Link><Link href="/repair/calculator" className="rounded-2xl border border-crown-border bg-crown-canvas p-6 hover:border-crown-border-strong"><Calculator className="h-5 w-5 text-crown-brand" /><h3 className="mt-5 font-semibold text-crown-primary">{text.calculator}</h3></Link></div></div></section>
    </main>
  );
}
