'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Eye, EyeOff, Crown, Mail, User as UserIcon, X } from 'lucide-react';

/* ---------- Page-local translations (en / bn) ---------- */

const enStrings = {
  loginTab: 'Login',
  registerTab: 'Register',
  loginTitle: 'Login to Your Account',
  registerTitle: 'Create Your Account',
  email: 'Email',
  password: 'Password',
  fullName: 'Full Name',
  confirmPassword: 'Confirm Password',
  rememberMe: 'Remember me',
  loginBtn: 'Login',
  registerBtn: 'Register',
  forgotPassword: 'Forgot password?',
  orLoginWith: 'Or login with',
  orRegisterWith: 'Or register with',
  terms: 'I agree to the Terms & Privacy Policy',
  resetTitle: 'Reset Password',
  resetLabel: 'Enter your email address',
  resetBtn: 'Send Reset Link',
  emailPlaceholder: 'you@example.com',
  namePlaceholder: 'John Doe',
  passwordPlaceholder: '••••••••',
  passwordsMismatch: 'Passwords do not match!',
  agreeToTerms: 'Please agree to the Terms & Privacy Policy.',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
};

const bnStrings = {
  loginTab: 'লগইন',
  registerTab: 'রেজিস্টার',
  loginTitle: 'আপনার অ্যাকাউন্টে লগইন করুন',
  registerTitle: 'আপনার অ্যাকাউন্ট তৈরি করুন',
  email: 'ইমেইল',
  password: 'পাসওয়ার্ড',
  fullName: 'পূর্ণ নাম',
  confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
  rememberMe: 'মনে রাখুন',
  loginBtn: 'লগইন',
  registerBtn: 'রেজিস্টার',
  forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
  orLoginWith: 'অথবা এভাবে লগইন করুন',
  orRegisterWith: 'অথবা এভাবে রেজিস্টার করুন',
  terms: 'আমি শর্তাবলীন ও গোপনীয়তা নীতিমালার সাথে একমত',
  resetTitle: 'পাসওয়ার্ড রিসেট',
  resetLabel: 'আপনার ইমেইল ঠিকানা লিখুন',
  resetBtn: 'রিসেট লিংক পাঠান',
  emailPlaceholder: 'you@example.com',
  namePlaceholder: 'John Doe',
  passwordPlaceholder: '••••••••',
  passwordsMismatch: 'পাসওয়ার্ডগুলো মেলছে না!',
  agreeToTerms: 'অনুগ্রহ করে শর্তাবলীন ও গোপনীয়তা নীতিমালায় একমত হন।',
  showPassword: 'পাসওয়ার্ড দেখান',
  hidePassword: 'পাসওয়ার্ড লুকিয়ে রাখুন',
};

/* ---------- Social icon components ---------- */

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M22.54 10.22c0-.66-.06-1.32-.18-1.97h-5.97v3.6h5.77c-.26 1.15-.65 2.2-1.18 3.07.82.64 1.83.99 2.96.99 3.55 0 6.55-2.85 6.55-6.38 0-.41-.01-.82-.02-1.23z"
    />
    <path
      fill="#34A853"
      d="M12.27 23.99c1.68 0 3.08-.55 4.14-1.5l3.08-3.07c-.91-.87-2.08-1.42-3.33-1.71-.97.67-2.19.93-3.47.76-1.32-.17-2.47-.9-3.29-1.96-.93-1.25-1.26-2.85-1.03-4.42l-3.2-2.52c-1.22 1.7-1.87 3.78-1.87 5.99 0 3.85 3.16 7.01 7.29 7.9z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.35c-.18-.55-.28-1.12-.28-1.72 0-.6.1-1.18.28-1.72l-3.2-2.52c-.93 1.7-1.47 3.72-1.47 5.86s.54 4.15 1.47 5.86l3.2-2.52z"
    />
    <path
      fill="#4285F4"
      d="M12.27 4.87c1.42-.17 2.8-.17 4.16.04.95-.72 2.05-1.22 3.24-1.41-1.23-.99-2.8-1.55-4.46-1.55-2.27 0-4.41.97-6.02 2.48l3.08 2.43z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="#1877F2"
      d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24h11.484v-9.294H9.701V11.01h3.108V8.413c0-3.084 1.884-4.77 4.6-4.77 1.315 0 2.443.097 2.766.142v3.196l-1.9.002c-1.484 0-1.776.689-1.776 1.74v2.385h3.553l-.467 3.686h-3.076V24h6.047c.725 0 1.325-.6 1.325-1.325V1.325C24 .6 23.4 0 22.675 0"
    />
  </svg>
);

/* ---------- Form field component ---------- */

interface TextFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  rightNode?: React.ReactNode;
  ariaLabel?: string;
}

const TextField = ({
  label,
  type,
  value,
  onChange,
  placeholder = '',
  required = false,
  icon,
  rightNode,
  ariaLabel,
}: TextFieldProps) => (
  <div>
    <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
      />
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{icon}</span>}
      {rightNode && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">{rightNode}</span>}
    </div>
  </div>
);

/* ---------- Main Component ---------- */

export default function LoginPage() {
  const { language } = useLanguage();
  const s = language === 'bn' ? bnStrings : enStrings;

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  /* Login form state */
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false });

  /* Register form state */
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [registerError, setRegisterError] = useState('');

  /* Password visibility toggles */
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  /* Password reset modal state */
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  /* Handlers */

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login successful! (Demo only)');
    setLoginForm({ email: '', password: '', rememberMe: false });
    setShowLoginPassword(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError(s.passwordsMismatch);
      return;
    }
    if (!registerForm.terms) {
      setRegisterError(s.agreeToTerms);
      return;
    }
    setRegisterError('');
    alert('Registration successful! (Demo only)');
    setRegisterForm({ fullName: '', email: '', password: '', confirmPassword: '', terms: false });
    setShowRegisterPassword(false);
    setShowRegisterConfirm(false);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${resetEmail || 'your email'}! (Demo only)`);
    setIsResetModalOpen(false);
    setResetEmail('');
  };

  const handleSocial = (provider: string) => {
    alert(`Social ${provider} login/register is a demo only.`);
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F9FAFB]">
      {/* Header Banner */}
      <div className="bg-[#111827] border-b border-[#1F2937]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-semibold mb-3">
            CROWN WATCH CO.
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Crown className="h-8 w-8 text-[#D4AF37]" />
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-gold-gradient">
              {s.loginTab}
            </h1>
          </div>
          <p className="text-[#9CA3AF] text-sm">
            {language === 'en'
              ? 'Login to your account or create a new one to shop with Crown Watch Co.'
              : 'আপনার অ্যাকাউন্টে লগইন করুন অথবা ক্রাউন ওয়াচ কোং-এর সাথে শপিংয় করার জন্য নতুন অ্যাকাউন্ট তৈরি করুন।'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-[#0B0F19] rounded-lg p-1 border border-[#1F2937]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setRegisterError('');
              }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
                activeTab === 'login'
                  ? 'bg-[#D4AF37] text-[#0B0F19] shadow'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50'
              }`}
            >
              {s.loginTab}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setRegisterError('');
              }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
                activeTab === 'register'
                  ? 'bg-[#D4AF37] text-[#0B0F19] shadow'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50'
              }`}
            >
              {s.registerTab}
            </button>
          </div>

          {/* ---------- Login Form ---------- */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#F9FAFB] mb-4">
                {s.loginTitle}
              </h2>

              <TextField
                label={s.email}
                type="email"
                value={loginForm.email}
                onChange={(val) => setLoginForm({ ...loginForm, email: val })}
                placeholder={s.emailPlaceholder}
                required
                ariaLabel="Email"
                icon={<Mail className="h-4 w-4" />}
              />

              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">{s.password}</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    placeholder={s.passwordPlaceholder}
                    aria-label={s.password}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#D4AF37]"
                    aria-label={showLoginPassword ? s.hidePassword : s.showPassword}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                    className="h-4 w-4 rounded border-[#2A2F45] bg-[#0B0F19] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-[#9CA3AF] cursor-pointer">
                    {s.rememberMe}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="text-sm text-[#D4AF37] hover:underline transition"
                >
                  {s.forgotPassword}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95"
              >
                {s.loginBtn}
              </button>

              {/* Social Login */}
              <div>
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1F2937]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 text-[#9CA3AF] bg-[#111827]">{s.orLoginWith}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocial('Google')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#0B0F19] border border-[#2A2F45] hover:border-[#D4AF37]/50 rounded-lg text-sm font-medium text-[#F9FAFB] hover:text-[#D4AF37] transition"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocial('Facebook')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#0B0F19] border border-[#2A2F45] hover:border-[#D4AF37]/50 rounded-lg text-sm font-medium text-[#F9FAFB] hover:text-[#D4AF37] transition"
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ---------- Register Form ---------- */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#F9FAFB] mb-4">
                {s.registerTitle}
              </h2>

              {registerError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-lg px-3 py-2">
                  {registerError}
                </div>
              )}

              <TextField
                label={s.fullName}
                type="text"
                value={registerForm.fullName}
                onChange={(val) => setRegisterForm({ ...registerForm, fullName: val })}
                placeholder={s.namePlaceholder}
                required
                ariaLabel="Full Name"
                icon={<UserIcon className="h-4 w-4" />}
              />

              <TextField
                label={s.email}
                type="email"
                value={registerForm.email}
                onChange={(val) => setRegisterForm({ ...registerForm, email: val })}
                placeholder={s.emailPlaceholder}
                required
                ariaLabel="Email"
                icon={<Mail className="h-4 w-4" />}
              />

              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">{s.password}</label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                    placeholder={s.passwordPlaceholder}
                    aria-label={s.password}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#D4AF37]"
                    aria-label={showRegisterPassword ? s.hidePassword : s.showPassword}
                  >
                    {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">
                  {s.confirmPassword}
                </label>
                <div className="relative">
                  <input
                    type={showRegisterConfirm ? 'text' : 'password'}
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                    }
                    required
                    placeholder={s.passwordPlaceholder}
                    aria-label={s.confirmPassword}
                    className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 pr-10 text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterConfirm(!showRegisterConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#D4AF37]"
                    aria-label={showRegisterConfirm ? s.hidePassword : s.showPassword}
                  >
                    {showRegisterConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Real-time password match indicator */}
                {registerForm.confirmPassword && registerForm.password === registerForm.confirmPassword && (
                  <p className="mt-1 text-xs text-green-400">✓ {language === 'en' ? 'Passwords match' : 'পাসওয়ার্ড মেলে'}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={registerForm.terms}
                  onChange={(e) => setRegisterForm({ ...registerForm, terms: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-[#2A2F45] bg-[#0B0F19] text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="terms" className="text-sm text-[#9CA3AF] cursor-pointer">
                  {s.terms.split('Terms')[0]}
                  <a href="#" className="text-[#D4AF37] hover:underline">
                    Terms & Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95"
              >
                {s.registerBtn}
              </button>

              {/* Social Register */}
              <div>
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1F2937]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 text-[#9CA3AF] bg-[#111827]">{s.orRegisterWith}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocial('Google')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#0B0F19] border border-[#2A2F45] hover:border-[#D4AF37]/50 rounded-lg text-sm font-medium text-[#F9FAFB] hover:text-[#D4AF37] transition"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocial('Facebook')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#0B0F19] border border-[#2A2F45] hover:border-[#D4AF37]/50 rounded-lg text-sm font-medium text-[#F9FAFB] hover:text-[#D4AF37] transition"
                  >
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ---------- Password Reset Modal ---------- */}
      {isResetModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsResetModalOpen(false)}
        >
          <div
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-serif text-gold-gradient">{s.resetTitle}</h2>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="text-[#9CA3AF] hover:text-[#D4AF37] transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] font-medium mb-1.5">{s.resetLabel}</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  placeholder={s.emailPlaceholder}
                  aria-label="Reset email"
                  className="w-full bg-[#0B0F19] border border-[#2A2F45] focus:border-[#D4AF37] text-[#F9FAFB] rounded-lg px-4 py-2.5 text-sm outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] text-[#0B0F19] font-bold rounded-lg hover:bg-[#C5A059] transition active:scale-95"
              >
                {s.resetBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
