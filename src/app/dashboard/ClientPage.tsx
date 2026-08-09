'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatBDT } from '@/lib/formatters';
import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  MapPin,
  Shield,
  LogOut,
  Eye,
  EyeOff,
  Save,
  Plus,
  Trash2,
  Check,
  Gem,
  Mail,
} from 'lucide-react';

/* ---------- Types ---------- */

type DashboardSection = 'overview' | 'orders' | 'wishlist' | 'profile' | 'address' | 'security' | 'logout';

type OrderStatus = 'Delivered' | 'Shipped' | 'Processing';

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number; // BDT
}

interface WishlistItem {
  id: string;
  name: string;
  price: number; // BDT
  img: string;
}

interface AddressItem {
  id: number;
  text: string;
}

interface UserProfile {
  fullName: string;
  email: string;
  avatar: string;
}

interface MenuItem {
  id: DashboardSection;
  label: string;
  icon: React.ElementType;
  isLogout?: boolean;
}

/* ---------- Translations ---------- */

const enStrings = {
  bannerEyebrow: 'CROWN WATCH CO.',
  title: 'My Account Dashboard',
  subtitle: 'Manage your orders, wishlist, profile, addresses, and security settings.',
  welcome: 'Welcome back',
  statOrders: 'Orders',
  statWishlist: 'Wishlist',
  statMembership: 'Membership',
  quicklinkOrders: 'View Orders',
  quicklinkWishlist: 'Wishlist',
  quicklinkProfile: 'Edit Profile',
  menuOverview: 'Overview',
  menuOrders: 'My Orders',
  menuWishlist: 'Wishlist',
  menuProfile: 'Profile',
  menuAddresses: 'Addresses',
  menuSecurity: 'Security',
  menuLogout: 'Logout',
  sectionOrders: 'My Orders',
  sectionWishlist: 'My Wishlist',
  sectionProfile: 'Edit Profile',
  sectionAddresses: 'My Addresses',
  sectionSecurity: 'Security Settings',
  tableOrderNum: 'Order #',
  tableDate: 'Date',
  tableStatus: 'Status',
  tableTotal: 'Total',
  tableDetails: 'Details',
  btnView: 'View',
  profileName: 'Full Name',
  profileEmail: 'Email',
  profileAvatar: 'Avatar URL',
  btnSave: 'Save Changes',
  addressPlaceholder: 'Add new address...',
  btnAddAddress: 'Add Address',
  currentPassword: 'Current Password',
  newPassword: 'New Password',
  confirmPassword: 'Confirm New Password',
  btnChangePassword: 'Change Password',
  passwordsMismatch: 'Passwords do not match!',
  passwordChanged: 'Password changed! (Demo)',
  profileUpdated: 'Profile updated! (Demo)',
  loggedOut: 'Logged out! (Demo)',
  loggedOutRedirect: 'Logged out! Redirecting to login... (Demo)',
  emptyWishlist: 'Your wishlist is empty.',
  noAddresses: 'No addresses yet.',
  backToLogin: '← Back to Login',
};

const bnStrings = {
  bannerEyebrow: 'ক্রাউন ওয়াচ কোং',
  title: 'আমার অ্যাকাউন্ট ড্যাশবোর্ড',
  subtitle: 'আপনার অর্ডার, উইশলিস্ট, প্রোফাইল, ঠিকানা এবং নিরাপত্তা সেটিংস পরিবর্তন করুন।',
  welcome: 'স্বাগত ফেরত',
  statOrders: 'অর্ডার',
  statWishlist: 'উইশলিস্ট',
  statMembership: 'সদস্যতা',
  quicklinkOrders: 'অর্ডার দেখুন',
  quicklinkWishlist: 'উইশলিস্ট',
  quicklinkProfile: 'প্রোফাইল সম্পাদনা',
  menuOverview: 'ওভারভিউ',
  menuOrders: 'আমার অর্ডার',
  menuWishlist: 'উইশলিস্ট',
  menuProfile: 'প্রোফাইল',
  menuAddresses: 'ঠিকানাগুলো',
  menuSecurity: 'নিରাপত্তা',
  menuLogout: 'লগআউট',
  sectionOrders: 'আমার অর্ডার',
  sectionWishlist: 'আমার উইশলিস্ট',
  sectionProfile: 'প্রোফাইল সম্পাদনা',
  sectionAddresses: 'আমার ঠিকানাগুলো',
  sectionSecurity: 'নিরাপত্তা সেটিংস',
  tableOrderNum: 'অর্ডার #',
  tableDate: 'তারিখ',
  tableStatus: 'অবস্থা',
  tableTotal: 'মোট',
  tableDetails: 'বিস্তারিত',
  btnView: 'দেখুন',
  profileName: 'পূর্ণ নাম',
  profileEmail: 'ইমেইল',
  profileAvatar: 'অ্যাভাটার URL',
  btnSave: 'সংরক্ষণ করুন',
  addressPlaceholder: 'নতুন ঠিকানা যুক্ত করুন...',
  btnAddAddress: 'ঠিকানা যুক্ত করুন',
  currentPassword: 'বর্তমান পাসওয়ার্ড',
  newPassword: 'নতুন পাসওয়ার্ড',
  confirmPassword: 'নতুন পাসওয়ার্ড নিশ্চিত করুন',
  btnChangePassword: 'পাসওয়ার্ড পরিবর্তন',
  passwordsMismatch: 'পাসওয়ার্ডগুলো মেলছে না!',
  passwordChanged: 'পাসওয়ার্ড পরিবর্তন হয়েছে! (ডেমো)',
  profileUpdated: 'প্রোফাইল আপডেটেড! (ডেমো)',
  loggedOut: 'লগআউট করা হয়েছে! (ডেমো)',
  loggedOutRedirect: 'লগআউট করা হয়েছে! রিডাইরেক্ট করা হচ্ছে... (ডেমো)',
  emptyWishlist: 'আপনার উইশলিস্ট খালি।',
  noAddresses: 'কোনও ঠিকানা নেই।',
  backToLogin: '← লগইন পৃষ্ঠায় ফিরে',
};

/* ---------- Constants ---------- */

const STATUS_CONFIG: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
  Delivered: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400' },
  Shipped: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' },
  Processing: { bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-400' },
};

const DEMO_ORDERS: Order[] = [
  { id: 'CW-1001', date: '2025-05-01', status: 'Delivered', total: 1200 },
  { id: 'CW-1002', date: '2025-04-18', status: 'Shipped', total: 950 },
  { id: 'CW-1003', date: '2025-03-22', status: 'Processing', total: 420 },
];

const DEMO_WISHLIST: WishlistItem[] = [
  {
    id: 'wish-1',
    name: 'Rolex Submariner',
    price: 1200,
    img: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'wish-2',
    name: 'Omega Seamaster',
    price: 950,
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
];

const INITIAL_PROFILE: UserProfile = {
  fullName: 'Arif Rahman',
  email: 'arif@email.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const INITIAL_ADDRESSES: AddressItem[] = [
  { id: 1, text: '123 Main St, Dhaka, Bangladesh' },
  { id: 2, text: '456 Park Ave, Chittagong, Bangladesh' },
];

/* ---------- Components ---------- */

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  valueClassName?: string;
}

const StatCard = ({ icon, value, label, valueClassName }: StatCardProps) => (
  <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex items-center gap-4 transition-all hover:border-[#D4AF37]/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.08)]">
    <div className="flex-shrink-0 w-12 h-12 bg-[#0B0F19] rounded-lg flex items-center justify-center border border-[#1F2937]">
      {icon}
    </div>
    <div>
      <div className={`text-3xl font-bold text-[#F9FAFB] ${valueClassName ?? ''}`}>{value}</div>
      <div className="text-xs text-[#9CA3AF] uppercase tracking-wider">{label}</div>
    </div>
  </div>
);

/* ---------- Main Component ---------- */

export default function DashboardPage() {
  const { language, formatNumber } = useLanguage();
  const s = language === 'bn' ? bnStrings : enStrings;

  /* State */
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');

  const [orders] = useState<Order[]>(DEMO_ORDERS);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(DEMO_WISHLIST);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);
  const [addressInput, setAddressInput] = useState('');

  /* Password form state */
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  /* Profile form state */
  const [profileForm, setProfileForm] = useState({ fullName: profile.fullName, email: profile.email, avatar: profile.avatar });

  /* Derived data */
  const firstName = profile.fullName.split(' ')[0] || profile.fullName;
  const orderCount = orders.length;
  const wishlistCount = wishlist.length;

  const menuItems: MenuItem[] = [
    { id: 'overview', label: s.menuOverview, icon: LayoutDashboard },
    { id: 'orders', label: s.menuOrders, icon: Package },
    { id: 'wishlist', label: s.menuWishlist, icon: Heart },
    { id: 'profile', label: s.menuProfile, icon: User },
    { id: 'address', label: s.menuAddresses, icon: MapPin },
    { id: 'security', label: s.menuSecurity, icon: Shield },
    { id: 'logout', label: s.menuLogout, icon: LogOut, isLogout: true },
  ];

  /* Handlers */

  const handleMenuClick = (item: MenuItem) => {
    if (item.isLogout) {
      alert(s.loggedOut);
      setActiveSection('overview');
      return;
    }
    setActiveSection(item.id);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      fullName: profileForm.fullName,
      email: profileForm.email,
      avatar: profileForm.avatar,
    });
    alert(s.profileUpdated);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    setAddresses([...addresses, { id: Date.now(), text: addressInput.trim() }]);
    setAddressInput('');
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const removeWishlistItem = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError(s.passwordsMismatch);
      return;
    }
    setPasswordError('');
    alert(s.passwordChanged);
    setPasswordForm({ current: '', new: '', confirm: '' });
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  /* Render helpers */

  const renderStatCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <StatCard
        icon={<Package className="h-6 w-6 text-[#4A94D4]" />}
        value={formatNumber(orderCount)}
        label={s.statOrders}
      />
      <StatCard
        icon={<Heart className="h-6 w-6 text-red-400" />}
        value={formatNumber(wishlistCount)}
        label={s.statWishlist}
      />
      <StatCard
        icon={<Gem className="h-6 w-6 text-[#D4AF37]" />}
        value="Gold"
        label={s.statMembership}
        valueClassName="text-[#D4AF37]"
      />
    </div>
  );

  const renderQuicklinks = () => {
    const links: { label: string; icon: React.ElementType; section: DashboardSection }[] = [
      { label: s.quicklinkOrders, icon: Package, section: 'orders' },
      { label: s.quicklinkWishlist, icon: Heart, section: 'wishlist' },
      { label: s.quicklinkProfile, icon: User, section: 'profile' },
    ];
    return (
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={() => setActiveSection(link.section)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B0F19] border border-[#2A2F45] hover:border-[#D4AF37]/50 rounded-lg text-sm font-medium text-[#F9FAFB] hover:text-[#D4AF37] transition"
          >
            <link.icon className="h-4 w-4" />
            <span>{link.label}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Header Banner */}
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">
            {s.bannerEyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient mb-3">
            {s.title}
          </h1>
          <p className="text-[#9CA3AF] text-sm">{s.subtitle}</p>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ---------- Sidebar ---------- */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            {/* Desktop sidebar: profile + vertical menu */}
            <div className="hidden lg:block">
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 mb-6">
                {/* Profile in sidebar */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#1F2937] mb-4">
                  <img
                    src={profile.avatar}
                    alt={profile.fullName}
                    className="w-12 h-12 rounded-full object-cover border border-[#2A2F45]"
                  />
                  <div>
                    <h3 className="font-semibold text-[#F9FAFB]">{profile.fullName}</h3>
                    <p className="text-xs text-[#9CA3AF]">{profile.email}</p>
                  </div>
                </div>
                {/* Menu */}
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleMenuClick(item)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                          activeSection === item.id
                            ? 'bg-[#D4AF37] text-[#0B0F19] shadow'
                            : item.isLogout
                            ? 'text-[#9CA3AF] hover:text-red-300 hover:bg-red-500/10'
                            : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile top bar: horizontal scrollable menu */}
            <div className="lg:hidden mb-6">
              <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMenuClick(item)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                      activeSection === item.id
                        ? 'bg-[#D4AF37] text-[#0B0F19] shadow'
                        : item.isLogout
                        ? 'bg-[#111827] border border-[#1F2937] text-[#9CA3AF] hover:text-red-300 hover:border-red-500/50'
                        : 'bg-[#111827] border border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4AF37]/50'
                    }}`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ---------- Main Content ---------- */}
          <section className="flex-1">
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 sm:p-8">
              {/* Overview */}
              {activeSection === 'overview' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold font-serif text-[#F9FAFB]">
                    {s.welcome}, {firstName}!
                  </h2>
                  {renderStatCards()}
                  <div>
                    <h3 className="text-sm text-[#9CA3AF] uppercase tracking-wider mb-3">
                      {language === 'en' ? 'Quick Links' : 'দ্রুত লিংক'}
                    </h3>
                    {renderQuicklinks()}
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeSection === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-gold-gradient">
                    {s.sectionOrders}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#1F2937]">
                          <th className="text-left py-3 text-xs text-[#9CA3AF] uppercase tracking-wider">
                            {s.tableOrderNum}
                          </th>
                          <th className="text-left py-3 text-xs text-[#9CA3AF] uppercase tracking-wider">
                            {s.tableDate}
                          </th>
                          <th className="text-left py-3 text-xs text-[#9CA3AF] uppercase tracking-wider">
                            {s.tableStatus}
                          </th>
                          <th className="text-right py-3 text-xs text-[#9CA3AF] uppercase tracking-wider">
                            {s.tableTotal}
                          </th>
                          <th className="text-center py-3 text-xs text-[#9CA3AF] uppercase tracking-wider">
                            {s.tableDetails}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => {
                          const cfg = STATUS_CONFIG[order.status];
                          return (
                            <tr
                              key={order.id}
                              className="border-b border-[#1F2937]/50 last:border-0"
                            >
                              <td className="py-3 text-[#F9FAFB] font-medium">{order.id}</td>
                              <td className="py-3 text-[#9CA3AF]">{order.date}</td>
                              <td className="py-3">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 text-right text-[#F9FAFB] font-semibold">
                                {formatBDT(order.total, language)}
                              </td>
                              <td className="py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => alert(`Order ${order.id} details — (Demo only)`)}
                                  className="px-3 py-1 text-xs font-medium text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg border border-[#1F2937] transition"
                                >
                                  {s.btnView}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Wishlist */}
              {activeSection === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-gold-gradient">
                    {s.sectionWishlist}
                  </h2>
                  {wishlist.length === 0 ? (
                    <p className="text-[#9CA3AF] py-8 text-center">{s.emptyWishlist}</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#0B0F19] border border-[#1F2937] rounded-xl overflow-hidden group transition-all hover:border-[#D4AF37]/30"
                        >
                          <div className="h-32 overflow-hidden">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-[#F9FAFB] text-sm">{item.name}</h3>
                            <p className="text-[#D4AF37] font-bold my-2">
                              {formatBDT(item.price, language)}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeWishlistItem(item.id)}
                              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#F9FAFB] hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-[#2A2F45] transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-gold-gradient">
                    {s.sectionProfile}
                  </h2>
                  <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                        {s.profileName}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                          required
                          placeholder={s.profileName}
                          aria-label={s.profileName}
                          className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pl-10 text-sm outline-none transition"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                        {s.profileEmail}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          required
                          placeholder={s.profileEmail}
                          aria-label={s.profileEmail}
                          className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pl-10 text-sm outline-none transition"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                        {s.profileAvatar}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profileForm.avatar}
                          onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                          required
                          placeholder={s.profileAvatar}
                          aria-label={s.profileAvatar}
                          className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pl-10 text-sm outline-none transition"
                        />
                        <img
                          src={profileForm.avatar}
                          alt="Avatar preview"
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95"
                    >
                      <Save className="h-4 w-4" />
                      <span>{s.btnSave}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Addresses */}
              {activeSection === 'address' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-gold-gradient">
                    {s.sectionAddresses}
                  </h2>

                  {/* Address list */}
                  {addresses.length === 0 ? (
                    <p className="text-[#9CA3AF] py-4">{s.noAddresses}</p>
                  ) : (
                    <ul className="space-y-2 mb-4">
                      {addresses.map((addr) => (
                        <li
                          key={addr.id}
                          className="flex items-center justify-between bg-[#0B0F19] border border-[#1F2937] rounded-lg px-4 py-3"
                        >
                          <span className="text-sm text-[#F9FAFB] flex-1">{addr.text}</span>
                          <button
                            type="button"
                            onClick={() => removeAddress(addr.id)}
                            className="ml-3 text-[#9CA3AF] hover:text-red-300 transition"
                            aria-label={`Remove address ${addr.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add address form */}
                  <form onSubmit={handleAddressSubmit} className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      required
                      placeholder={s.addressPlaceholder}
                      aria-label="New address"
                      className="flex-1 bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{s.btnAddAddress}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Security */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold font-serif text-gold-gradient">
                    {s.sectionSecurity}
                  </h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                    {passwordError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-lg px-3 py-2">
                        {passwordError}
                      </div>
                    )}

                    {/* Current Password */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                        {s.currentPassword}
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrent ? 'text' : 'password'}
                          value={passwordForm.current}
                          onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                          required
                          placeholder="••••••••"
                          aria-label={s.currentPassword}
                          className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#D4AF37]"
                          aria-label={showCurrent ? 'Hide' : 'Show'}
                        >
                          {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                        {s.newPassword}
                      </label>
                      <div className="relative">
                        <input
                          type={showNew ? 'text' : 'password'}
                          value={passwordForm.new}
                          onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                          required
                          placeholder="••••••••"
                          aria-label={s.newPassword}
                          className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#D4AF37]"
                          aria-label={showNew ? 'Hide' : 'Show'}
                        >
                          {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password with real-time match */}
                    <div>
                      <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                        {s.confirmPassword}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          required
                          placeholder="••••••••"
                          aria-label={s.confirmPassword}
                          className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#D4AF37]"
                          aria-label={showConfirm ? 'Hide' : 'Show'}
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwordForm.confirm && passwordForm.new === passwordForm.confirm && (
                        <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                          <Check className="h-3 w-3" />{' '}
                          {language === 'en' ? 'Passwords match' : 'পাসওয়ার্ড মেলে'}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95"
                    >
                      <Shield className="h-4 w-4" />
                      <span>{s.btnChangePassword}</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
