import { supabase } from '../utils/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchWithAuth = async (endpoint, options = {}) => {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error?.message || 'API request failed');
  }

  return response.json();
};

export const api = {
  getLots: () => fetchWithAuth('/lots'),
  createLot: (lotData) => fetchWithAuth('/lots', {
    method: 'POST',
    body: JSON.stringify(lotData)
  }),
  getNearbyMarkets: (lat, lng) => fetchWithAuth(`/markets/nearby?lat=${lat}&lng=${lng}`),
  getDashboard: () => fetchWithAuth('/analytics/dashboard'),
};
