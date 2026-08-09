/**
 * API Client Helper for Opaque REST API Testing
 */

export interface APIResponse<T = any> {
  status: number;
  data: T;
  headers: Headers;
}

/**
 * Makes an opaque REST API request to Next.js route handlers or test endpoints.
 * 
 * @param baseUrl Base URL of application (e.g. "http://localhost:3000")
 * @param endpoint Relative API endpoint (e.g. "/api/products")
 * @param options Standard fetch RequestInit options
 */
export async function makeAPIRequest<T = any>(
  baseUrl: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl.replace(/\/$/, '')}${cleanEndpoint}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data: any = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  return {
    status: response.status,
    data,
    headers: response.headers,
  };
}
