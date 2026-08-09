/**
 * Deep Client Hardware & Environment Fingerprinter
 * Extracts hardware capabilities, GPU info, screen metrics, and connection specs.
 */

export interface HardwareMetrics {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  os: string;
  browser: string;
  cpuCores: number;
  systemRam: string;
  webglRenderer: string;
  screenDpi: number;
  screenResolution: string;
  connectionSpeed: string;
}

export function extractHardwareMetrics(): HardwareMetrics {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'desktop',
      os: 'Server',
      browser: 'Node.js',
      cpuCores: 8,
      systemRam: '8GB+',
      webglRenderer: 'Server Canvas',
      screenDpi: 1,
      screenResolution: '1920x1080',
      connectionSpeed: '4g',
    };
  }

  const ua = navigator.userAgent;

  // 1. Device Type & OS Detection
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/iPad|tablet|(android(?!.*mobile))/i.test(ua)) {
    deviceType = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle/i.test(ua)) {
    deviceType = 'mobile';
  }

  let os = 'Unknown OS';
  if (/Win/i.test(ua)) os = 'Windows';
  else if (/Mac/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';

  // 2. Browser Detection
  let browser = 'Chrome/Safari';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/Safari/i.test(ua)) browser = 'Safari';

  // 3. Hardware Concurrency & RAM
  const cpuCores = navigator.hardwareConcurrency || 4;
  const navMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  const systemRam = navMemory ? `${navMemory}GB` : '4GB+';

  // 4. WebGL GPU Renderer Detection
  let webglRenderer = 'Standard WebGL';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        webglRenderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'WebGL Renderer';
      }
    }
  } catch (e) {
    webglRenderer = 'Canvas Renderer';
  }

  // 5. Screen DPI & Resolution
  const screenDpi = window.devicePixelRatio || 1;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;

  // 6. Network Speed API
  let connectionSpeed = '4g';
  const navConn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
  if (navConn && navConn.effectiveType) {
    connectionSpeed = navConn.effectiveType;
  }

  return {
    deviceType,
    os,
    browser,
    cpuCores,
    systemRam,
    webglRenderer,
    screenDpi,
    screenResolution,
    connectionSpeed,
  };
}
