'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Smartphone, Monitor, HardDrive, RefreshCw, Zap, Shield, Search } from 'lucide-react';
import { UserTelemetryProfile } from '@/types';
import { formatBDT } from '@/lib/formatters';

export default function AdminTelemetryPage() {
  const [profiles, setProfiles] = useState<UserTelemetryProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchIp, setSearchIp] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserTelemetryProfile | null>(null);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/telemetry');
      const data = await res.json();
      if (data.success && Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
        if (data.profiles.length > 0 && !selectedProfile) {
          setSelectedProfile(data.profiles[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load telemetry profiles', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(
    (p) =>
      p.ip.toLowerCase().includes(searchIp.toLowerCase()) ||
      p.os.toLowerCase().includes(searchIp.toLowerCase()) ||
      p.deviceType.toLowerCase().includes(searchIp.toLowerCase())
  );

  const mobileCount = profiles.filter((p) => p.deviceType === 'mobile').length;
  const desktopCount = profiles.filter((p) => p.deviceType === 'desktop').length;

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-[#F9FAFB]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#1F2937] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1">
            <Cpu className="w-4 h-4" /> AI Telemetry & Visitor IP Intelligence
          </div>
          <h1 className="text-3xl font-bold font-serif text-gold-gradient">
            Live User IP & Hardware Telemetry
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Real-time breakdown of visitor IP addresses, hardware specs (CPU, RAM, GPU), browsing affinity, and AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProfiles}
            className="flex items-center gap-2 bg-[#111827] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded-xl text-sm font-semibold transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Telemetry
          </button>
          <Link
            href="/admin"
            className="bg-[#1F2937] border border-gray-700 text-[#9CA3AF] hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            ← Admin Dashboard
          </Link>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Tracked IP Profiles</span>
            <Shield className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F9FAFB]">{profiles.length}</div>
          <div className="text-xs text-[#9CA3AF] mt-1">Recorded IP sessions</div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Device Distribution</span>
            <Smartphone className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-[#F9FAFB] flex items-center gap-3">
            <span>📱 {mobileCount} Mobile</span>
            <span>💻 {desktopCount} Desktop</span>
          </div>
          <div className="text-xs text-[#9CA3AF] mt-1">Real-time hardware split</div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Hardware Benchmarking</span>
            <HardDrive className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-[#F9FAFB]">WebGL & Multi-Core</div>
          <div className="text-xs text-[#9CA3AF] mt-1">Active GPU & RAM profiling</div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-2xl">
          <div className="flex items-center justify-between text-[#8B8FA8] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>AI Match Engine</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-[#D4AF37]">98% Avg Match Score</div>
          <div className="text-xs text-[#9CA3AF] mt-1">Personalized scoring engine</div>
        </div>
      </div>

      {/* Main Content: IP List + Selected IP Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: IP List */}
        <div className="lg:col-span-1 bg-[#111827] border border-[#1F2937] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-serif text-[#F9FAFB]">Visitor IP Log</h2>
            <span className="text-xs text-[#D4AF37] font-mono bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
              {filteredProfiles.length} IPs
            </span>
          </div>

          {/* Search Filter Input */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by IP, OS, or Device..."
              value={searchIp}
              onChange={(e) => setSearchIp(e.target.value)}
              className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-[#D4AF37] text-xs text-white pl-9 pr-3 py-2 rounded-xl outline-none"
            />
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-[#9CA3AF]">Loading visitor telemetry...</div>
          ) : filteredProfiles.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#9CA3AF]">No telemetry profiles recorded yet. Visit the shop page to generate live IP telemetry data!</div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredProfiles.map((p) => {
                const isSelected = selectedProfile?.ip === p.ip;
                return (
                  <div
                    key={p.id || p.ip}
                    onClick={() => setSelectedProfile(p)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1F2937] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-[#0B0F19] border-[#1F2937] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#F9FAFB]">{p.ip}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            p.deviceType === 'mobile'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {p.deviceType}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {p.lastSeen ? new Date(p.lastSeen).toLocaleTimeString() : 'Just now'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                      <span>{p.os} • {p.browser}</span>
                      <span className="text-[#D4AF37] font-semibold">{p.totalViews || 1} views</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Deep Hardware & AI Intelligence Inspector for Selected IP */}
        <div className="lg:col-span-2">
          {selectedProfile ? (
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 space-y-6">
              {/* Header Inspector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F2937] pb-5">
                <div>
                  <div className="text-xs text-[#D4AF37] font-mono font-semibold uppercase tracking-wider mb-1">
                    IP Telemetry Inspector
                  </div>
                  <h3 className="text-2xl font-bold font-mono text-[#F9FAFB]">
                    IP: {selectedProfile.ip}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">
                    Last active: {new Date(selectedProfile.lastSeen).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-xl">
                    Target Budget: {formatBDT(selectedProfile.targetBudget || 15000, 'en')}
                  </span>
                </div>
              </div>

              {/* Hardware Profile Specs Grid */}
              <div>
                <h4 className="text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" /> Hardware Fingerprint Details
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">Operating System</div>
                    <div className="text-sm font-bold text-[#F9FAFB] mt-0.5">{selectedProfile.os}</div>
                  </div>
                  <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">Browser</div>
                    <div className="text-sm font-bold text-[#F9FAFB] mt-0.5">{selectedProfile.browser}</div>
                  </div>
                  <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">CPU Cores</div>
                    <div className="text-sm font-bold text-[#D4AF37] mt-0.5">{selectedProfile.cpuCores} Logic Cores</div>
                  </div>
                  <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">System RAM</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedProfile.systemRam}</div>
                  </div>
                  <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">Screen DPI / Res</div>
                    <div className="text-sm font-bold text-[#F9FAFB] mt-0.5">
                      {selectedProfile.screenDpi}x ({selectedProfile.screenResolution})
                    </div>
                  </div>
                  <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                    <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">Network Speed</div>
                    <div className="text-sm font-bold text-blue-400 uppercase mt-0.5">{selectedProfile.connectionSpeed}</div>
                  </div>
                </div>

                <div className="mt-3 bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937]">
                  <div className="text-[10px] text-[#8B8FA8] font-semibold uppercase">WebGL GPU Renderer</div>
                  <div className="text-xs font-mono text-[#D4AF37] mt-1 truncate">{selectedProfile.webglRenderer}</div>
                </div>
              </div>

              {/* AI Watch Recommendations for this IP */}
              <div>
                <h4 className="text-xs font-bold text-[#8B8FA8] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> AI Personalized Recommendations for IP {selectedProfile.ip}
                </h4>
                <div className="space-y-3">
                  {selectedProfile.topRecommendations && selectedProfile.topRecommendations.length > 0 ? (
                    selectedProfile.topRecommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="bg-[#0B0F19] border border-[#1F2937] p-4 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-[#D4AF37] text-[#0B0F19] font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                              {rec.matchPercentage}% MATCH
                            </span>
                            <span className="text-xs font-bold text-[#F9FAFB]">{rec.productTitle}</span>
                          </div>
                          <p className="text-xs text-[#9CA3AF]">{rec.rationale}</p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <div className="text-sm font-bold font-mono text-[#D4AF37]">
                            {formatBDT(rec.price, 'en')}
                          </div>
                          <div className="text-[10px] text-gray-500 uppercase">{rec.brand}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-[#9CA3AF] p-4 bg-[#0B0F19] rounded-xl text-center">
                      No custom recommendations generated yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-12 text-center text-sm text-[#9CA3AF]">
              Select an IP address from the log on the left to inspect detailed hardware specifications and AI recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
