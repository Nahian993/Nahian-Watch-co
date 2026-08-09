'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Eye,
  Filter,
  Heart,
  MessageCircle,
  Pen,
  Search,
  Send,
  SortAsc,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* -------------------------------------------------------------------------- */
/* Types & Helpers                                                            */
/* -------------------------------------------------------------------------- */

type Comment = {
  author: string;
  text: string;
};

export type BlogPost = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  content: string;
  image: string;
  comments: Comment[];
  likes: number;
  views: number;
};

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'news', label: 'News' },
  { value: 'review', label: 'Reviews' },
  { value: 'guide', label: 'Guides' },
  { value: 'interview', label: 'Interviews' },
];

const WRITE_CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Select Category' },
  { value: 'news', label: 'News' },
  { value: 'review', label: 'Review' },
  { value: 'guide', label: 'Guide' },
  { value: 'interview', label: 'Interview' },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'comments', label: 'Most Commented' },
];

const POSTS_PER_PAGE = 3;

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Rolex Submariner: The Iconic Dive Watch',
    category: 'review',
    author: 'A. Rahman',
    date: '2025-05-01',
    content:
      'The Rolex Submariner is a legend among divers\' watches. In this review, we explore its history, features, and why it\'s a must-have for collectors. From its original 1953 design to the modern iterations, the Submariner has defined what a diving watch can be.',
    image:
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80',
    comments: [
      { author: 'Sam', text: 'Great review!' },
      { author: 'Mina', text: 'Love my Submariner.' },
    ],
    likes: 12,
    views: 120,
  },
  {
    id: 2,
    title: 'How to Choose Your First Luxury Watch',
    category: 'guide',
    author: 'S. Chowdhury',
    date: '2025-04-28',
    content:
      'Buying your first luxury watch? Here are the top things to consider, from movement to brand reputation and resale value. We break down the jargon and help you pick a timepiece that fits your wrist and your budget.',
    image:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    comments: [],
    likes: 8,
    views: 95,
  },
  {
    id: 3,
    title: "Interview: Omega's Master Watchmaker",
    category: 'interview',
    author: 'Editor',
    date: '2025-04-20',
    content:
      "We sit down with Omega's master watchmaker to discuss innovation, tradition, and the future of Swiss horology. A rare, insider look at the craft behind the timepieces.",
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    comments: [{ author: 'Ali', text: 'Very insightful!' }],
    likes: 5,
    views: 60,
  },
  {
    id: 4,
    title: "2025 Watch Trends: What's Hot This Year?",
    category: 'news',
    author: 'Crown Watch Team',
    date: '2025-04-10',
    content:
      'From bold colors to vintage revivals, we break down the top watch trends for 2025. Which style will dominate your wrist this year?',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    comments: [],
    likes: 3,
    views: 40,
  },
];

function categoryLabel(c: string) {
  const found = CATEGORY_OPTIONS.find((o) => o.value === c);
  return found ? found.label : c.charAt(0).toUpperCase() + c.slice(1);
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/* -------------------------------------------------------------------------- */
/* Reusable Dropdown                                                           */
/* -------------------------------------------------------------------------- */

interface DropdownProps {
  icon: React.ElementType;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function Dropdown({ icon: Icon, label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selected = options.find((o) => o.value === value) ?? options.at(0);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-[#2A2F45] bg-[#111827] px-3.5 py-2 text-sm text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#F9FAFB] transition"
      >
        <Icon size={15} aria-hidden="true" />
        <span>{label}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute top-full left-0 z-30 mt-2 w-48 overflow-hidden rounded-lg border border-[#2A2F45] bg-[#111827] shadow-xl shadow-black/40"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full px-3.5 py-2 text-left text-sm transition ${
                opt.value === value
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium'
                  : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Modal (overlay)                                                            */
/* -------------------------------------------------------------------------- */

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

function Modal({ open, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-xl border border-[#2A2F45] bg-[#111827] p-6 shadow-xl shadow-black/40"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-md p-1.5 text-[#9CA3AF] hover:border hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
        >
          <X size={18} />
        </button>
        {title ? (
          <h2 className="text-lg font-bold font-serif text-gold-gradient mb-4 pr-6">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Page Component                                                         */
/* -------------------------------------------------------------------------- */

export default function BlogPage() {
  const { language } = useLanguage();

  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<'latest' | 'popular' | 'comments'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const [writeOpen, setWriteOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const [writeForm, setWriteForm] = useState({
    title: '',
    category: '',
    content: '',
    author: '',
  });

  const [commentForm, setCommentForm] = useState({ author: '', text: '' });

  /* ---- Filtered + sorted posts ------------------------------------------- */
  const filtered = posts
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === '' || p.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === 'popular') return b.likes - a.likes;
      return b.comments.length - a.comments.length;
    });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

  /* ---- Effects: reset page when filters/search change -------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  /* ---- Handlers ---------------------------------------------------------- */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setSort('latest');
    setCurrentPage(1);
  };

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const openReadModal = (post: BlogPost) => {
    const incremented = { ...post, views: post.views + 1 };
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? incremented : p))
    );
    setActivePost(incremented);
    setReadOpen(true);
  };

  const closeReadModal = () => {
    setReadOpen(false);
    setCommentForm({ author: '', text: '' });
  };

  const handleWriteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWriteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!writeForm.title || !writeForm.category || !writeForm.content || !writeForm.author) {
      return;
    }
    const newPost: BlogPost = {
      id: Date.now(),
      title: writeForm.title,
      category: writeForm.category,
      author: writeForm.author,
      date: new Date().toISOString().slice(0, 10),
      content: writeForm.content,
      image: DEFAULT_IMAGE,
      comments: [],
      likes: 0,
      views: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setWriteForm({ title: '', category: '', content: '', author: '' });
    setWriteOpen(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.author || !commentForm.text || !activePost) return;
    const newComment = { author: commentForm.author, text: commentForm.text };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === activePost.id
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      )
    );
    setActivePost((prev) =>
      prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
    );
    setCommentForm({ author: '', text: '' });
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Hero / Header banner */}
      <section className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">
            Watch World Insights
          </h1>
          <p className="text-[#9CA3AF] text-sm mb-6 max-w-2xl mx-auto">
            Latest news, reviews, and guides from Crown Watch experts.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex justify-center gap-2"
          >
            <div className="relative w-full max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search articles, brands, or topics..."
                className="w-full rounded-lg border border-[#2A2F45] bg-[#0B0F19] pl-10 pr-4 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg border border-transparent bg-gradient-to-r from-[#8a6b1a] to-[#D4AF37] px-4 py-2.5 font-semibold text-[#0B0F19] hover:brightness-110 transition"
              aria-label="Search"
            >
              <Search size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Dropdown
            icon={Filter}
            label="Category"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(v) => setCategory(v)}
          />
          <Dropdown
            icon={SortAsc}
            label="Sort"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(v) => setSort(v as 'latest' | 'popular' | 'comments')}
          />
          <button
            onClick={handleReset}
            className="rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-4 py-2 text-sm text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#F9FAFB] transition"
          >
            Reset
          </button>
          <button
            onClick={() => setWriteOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-gradient-to-r from-[#8a6b1a] to-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0B0F19] hover:brightness-110 transition"
          >
            <Pen size={15} aria-hidden="true" />
            Write Post
          </button>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.length === 0 ? (
            <p className="col-span-full py-10 text-center text-[#9CA3AF]">
              {language === 'bn'
                ? 'কোনো নিবন্ধ পাওয়া যায়নি। অনুসন্ধান বা ফিল্টার পরিবর্তন করুন।'
                : 'No articles found. Try adjusting your search or filters.'}
            </p>
          ) : (
            pagePosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827] transition-all hover:border-[#D4AF37]/30 hover:shadow-[0_0_12px_rgba(212,175,55,0.15)]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center gap-3 text-xs text-[#9CA3AF]">
                    <span className="rounded bg-[#D4AF37]/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[#D4AF37]">
                      {categoryLabel(post.category)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#9CA3AF]">
                      <Calendar size={12} aria-hidden="true" />
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h2 className="mb-2 text-base font-bold font-serif text-[#F9FAFB] line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#9CA3AF] line-clamp-2 mb-3">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#1F2937] pt-3 text-xs text-[#9CA3AF]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <User size={12} aria-hidden="true" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye size={12} aria-hidden="true" />
                        {post.views}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLike(post.id)}
                        aria-label={`Like ${post.title}`}
                        className="inline-flex items-center gap-1 text-[#9CA3AF] hover:text-red-400 transition"
                      >
                        <Heart size={12} aria-hidden="true" />
                        {post.likes}
                      </button>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle size={12} aria-hidden="true" />
                        {post.comments.length}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openReadModal(post)}
                      className="rounded-md border border-transparent bg-gradient-to-r from-[#8a6b1a] to-[#D4AF37] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#0B0F19] hover:brightness-110 transition"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="mt-10 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3 py-1.5 text-sm text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#F9FAFB] disabled:cursor-not-allowed transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg border px-3.5 py-1.5 text-sm transition ${
                  currentPage === page
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'border-[#2A2F45] text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#F9FAFB]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3 py-1.5 text-sm text-[#9CA3AF] hover:border-[#D4AF37]/40 hover:text-[#F9FAFB] disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Write Post Modal */}
      <Modal
        open={writeOpen}
        onClose={() => {
          setWriteOpen(false);
          setWriteForm({ title: '', category: '', content: '', author: '' });
        }}
        title="Write a New Blog Post"
      >
        <form onSubmit={handleWriteSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={writeForm.title}
            onChange={handleWriteChange}
            placeholder="Title"
            required
            className="w-full rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
          <select
            name="category"
            value={writeForm.category}
            onChange={handleWriteChange}
            required
            className="w-full rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          >
            {WRITE_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <textarea
            name="content"
            value={writeForm.content}
            onChange={handleWriteChange}
            placeholder="Write your article..."
            rows={6}
            required
            className="w-full resize-y rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
          <input
            type="text"
            name="author"
            value={writeForm.author}
            onChange={handleWriteChange}
            placeholder="Your Name"
            required
            className="w-full rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            className="w-full rounded-lg border border-transparent bg-gradient-to-r from-[#8a6b1a] to-[#D4AF37] py-2.5 text-sm font-bold uppercase tracking-widest text-[#0B0F19] hover:brightness-110 transition"
          >
            Publish
          </button>
        </form>
      </Modal>

      {/* Read Post Modal */}
      <Modal
        open={readOpen}
        onClose={closeReadModal}
        title={activePost ? activePost.title : undefined}
      >
        {activePost && (
          <div className="space-y-4">
            <img
              src={activePost.image}
              alt={activePost.title}
              className="h-44 w-full rounded-lg object-cover"
            />
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
              <span className="rounded bg-[#D4AF37]/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-[#D4AF37]">
                {categoryLabel(activePost.category)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} aria-hidden="true" />
                {formatDate(activePost.date)}
              </span>
              <span className="inline-flex items-center gap-1">
                <User size={12} aria-hidden="true" />
                {activePost.author}
              </span>
            </div>
            <p className="text-sm text-[#E5E7EB] leading-relaxed">
              {activePost.content}
            </p>
            <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
              <button
                type="button"
                onClick={() => handleLike(activePost.id)}
                className="inline-flex items-center gap-1 text-[#9CA3AF] hover:text-red-400 transition"
                aria-label="Like post"
              >
                <Heart size={16} aria-hidden="true" />
                {activePost.likes} Likes
              </button>
              <span className="inline-flex items-center gap-1">
                <Eye size={16} aria-hidden="true" />
                {activePost.views} Views
              </span>
            </div>
            <div className="border-t border-[#1F2937] pt-4">
              <h3 className="mb-3 text-sm font-bold text-[#F9FAFB]">
                Comments ({activePost.comments.length})
              </h3>
              {activePost.comments.length === 0 ? (
                <p className="text-sm text-[#9CA3AF]">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                <ul className="space-y-2">
                  {activePost.comments.map((c, i) => (
                    <li
                      key={i}
                      className="rounded-lg border border-[#1F2937] bg-[#0B0F19] px-3.5 py-2.5 text-sm"
                    >
                      <span className="font-semibold text-[#D4AF37]">
                        {c.author}:
                      </span>{' '}
                      <span className="text-[#E5E7EB]">{c.text}</span>
                    </li>
                  ))}
                </ul>
              )}
              <form
                onSubmit={handleCommentSubmit}
                className="mt-4 flex flex-col gap-2.5"
              >
                <input
                  type="text"
                  name="author"
                  value={commentForm.author}
                  onChange={handleCommentChange}
                  placeholder="Your Name"
                  required
                  className="w-full rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
                <textarea
                  name="text"
                  value={commentForm.text}
                  onChange={handleCommentChange}
                  placeholder="Write a comment..."
                  rows={3}
                  required
                  className="w-full resize-y rounded-lg border border-[#2A2F45] bg-[#0B0F19] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="self-start rounded-lg border border-transparent bg-gradient-to-r from-[#8a6b1a] to-[#D4AF37] px-4 py-2 text-sm font-bold text-[#0B0F19] hover:brightness-110 transition"
                >
                  <Send size={14} className="inline-block" aria-hidden="true" /> Post Comment
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>

      {/* Blog Footer */}
      <footer className="border-t border-[#1F2937] bg-[#0B0F19] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Find Us */}
            <div>
              <h4 className="mb-3 text-sm font-bold font-serif text-[#D4AF37]">
                Find Us
              </h4>
              <iframe
                title="Crown Watch Co. location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902231727964!2d90.3915633154317!3d23.75090339462556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b894b5e1c6e7%3A0x7e1e3e8e8e8e8e8e!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: 8 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Hours */}
            <div>
              <h4 className="mb-3 text-sm font-bold font-serif text-[#D4AF37]">
                Hours
              </h4>
              <ul className="space-y-1.5 text-sm text-[#9CA3AF]">
                <li>Mon–Fri: 10 AM – 8 PM</li>
                <li>Sat: 11 AM – 6 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
            {/* Links */}
            <div>
              <h4 className="mb-3 text-sm font-bold font-serif text-[#D4AF37]">
                Links
              </h4>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a
                    href="/shop"
                    className="text-[#9CA3AF] hover:text-[#D4AF37] transition"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-[#9CA3AF] hover:text-[#D4AF37] transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-[#9CA3AF] hover:text-[#D4AF37] transition"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-[#9CA3AF] hover:text-[#D4AF37] transition"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-terms"
                    className="text-[#9CA3AF] hover:text-[#D4AF37] transition"
                  >
                    Privacy & Terms
                  </a>
                </li>
              </ul>
            </div>
            {/* Connect */}
            <div>
              <h4 className="mb-3 text-sm font-bold font-serif text-[#D4AF37]">
                Connect
              </h4>
              <p className="mb-3 text-xs text-[#9CA3AF]">
                Follow us for exclusive drops and insights.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#1F2937] text-[#9CA3AF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.316v21.368C0 23.41.59 24 1.325 24h11.485v-9.294H9.692V10.41h3.118V7.897c0-3.095 1.888-4.78 4.64-4.78 1.325 0 2.466.099 2.787.143v3.24l-1.902.001c-1.502 0-1.794.711-1.794 1.737v2.308h3.587l-.465 4.303h-3.122V24h6.186c.737 0 1.325-.59 1.325-1.316V1.316C24 .59 23.41 0 22.675 0z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#1F2937] text-[#9CA3AF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0C8.74 0 8.74 0 6.48 2.26L5.22 3.51C3.5 5.22 3.5 7.82 3.5 12s0 6.78 1.72 8.49l1.26 1.26C8.06 22.68 8.74 22.68 12 22.68s3.94 0 5.52-2.22l1.26-1.26C20.5 18.78 20.5 16.18 20.5 12c0-2.64-.02-2.64-2.26-4.85L16.96 5.9C15.24 4.18 13.18 3.5 12 3.5S8.76 4.18 7.28 5.9L6.02 7.16C4.42 8.76 3.5 11.32 3.5 12" />
                    <path d="M12 5.84C9.13 5.84 6.81 8.14 6.81 11.02c0 2.89 2.31 5.19 5.18 5.19 2.89 0 5.18-2.31 5.18-5.19S14.87 5.84 12 5.84zm0 8.33c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2 3.2 1.43 3.2 3.2-1.43 3.2-3.2 3.2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#1F2937] text-[#9CA3AF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.552-2.005.957-3.127 1.182-.897-.959-2.173-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.162c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.231-.616v.06c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.617-.03-.927-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.115 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.21 7.557 2.21 9.054 0 14-7.503 14-14v-.62c.963-.695 1.8-1.562 2.46-2.548l-.04-.02z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#1F2937] text-[#9CA3AF] hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M19.615 3.354C18.105 3.032 12.074 3 12 3s-6.105.032-7.615.635C2.2 4.618 1 5.72 1 7.242v9.516C1 19.076 2.2 20.18 3.385 20.782 4.895 21.404 10.926 21.45 12 21.45s7.105-.046 8.615-.648C23 20.18 24 19.076 24 16.758V7.242c0-1.522-1.2-2.624-2.385-3.288z" />
                    <path d="M15 11.5L10 15V8l5 3.5z" fill="#0B0F19" />
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-xs text-[#6B7280]">
                © 2026 Crown Watch Co. — All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
