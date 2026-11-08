export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
  capital: string;
  latitude: number;
  longitude: number;
  timezone: string;
  region: 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Middle East';
}

export const COUNTRIES: CountryInfo[] = [
  // Europe
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', capital: 'London', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', region: 'Europe' },
  { name: 'France', code: 'FR', flag: '🇫🇷', capital: 'Paris', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris', region: 'Europe' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', capital: 'Berlin', latitude: 52.52, longitude: 13.405, timezone: 'Europe/Berlin', region: 'Europe' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', capital: 'Rome', latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome', region: 'Europe' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', capital: 'Madrid', latitude: 40.4168, longitude: -3.7038, timezone: 'Europe/Madrid', region: 'Europe' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', capital: 'Amsterdam', latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam', region: 'Europe' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', capital: 'Bern', latitude: 46.948, longitude: 7.4474, timezone: 'Europe/Zurich', region: 'Europe' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', capital: 'Stockholm', latitude: 59.3293, longitude: 18.0686, timezone: 'Europe/Stockholm', region: 'Europe' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴', capital: 'Oslo', latitude: 59.9139, longitude: 10.7522, timezone: 'Europe/Oslo', region: 'Europe' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰', capital: 'Copenhagen', latitude: 55.6761, longitude: 12.5683, timezone: 'Europe/Copenhagen', region: 'Europe' },
  { name: 'Finland', code: 'FI', flag: '🇫🇮', capital: 'Helsinki', latitude: 60.1699, longitude: 24.9384, timezone: 'Europe/Helsinki', region: 'Europe' },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪', capital: 'Brussels', latitude: 50.8503, longitude: 4.3517, timezone: 'Europe/Brussels', region: 'Europe' },
  { name: 'Austria', code: 'AT', flag: '🇦🇹', capital: 'Vienna', latitude: 48.2082, longitude: 16.3738, timezone: 'Europe/Vienna', region: 'Europe' },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹', capital: 'Lisbon', latitude: 38.7223, longitude: -9.1393, timezone: 'Europe/Lisbon', region: 'Europe' },
  { name: 'Greece', code: 'GR', flag: '🇬🇷', capital: 'Athens', latitude: 37.9838, longitude: 23.7275, timezone: 'Europe/Athens', region: 'Europe' },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪', capital: 'Dublin', latitude: 53.3498, longitude: -6.2603, timezone: 'Europe/Dublin', region: 'Europe' },
  { name: 'Poland', code: 'PL', flag: '🇵🇱', capital: 'Warsaw', latitude: 52.2297, longitude: 21.0122, timezone: 'Europe/Warsaw', region: 'Europe' },
  { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿', capital: 'Prague', latitude: 50.0755, longitude: 14.4378, timezone: 'Europe/Prague', region: 'Europe' },
  { name: 'Hungary', code: 'HU', flag: '🇭🇺', capital: 'Budapest', latitude: 47.4979, longitude: 19.0402, timezone: 'Europe/Budapest', region: 'Europe' },
  { name: 'Romania', code: 'RO', flag: '🇷🇴', capital: 'Bucharest', latitude: 44.4268, longitude: 26.1025, timezone: 'Europe/Bucharest', region: 'Europe' },
  { name: 'Iceland', code: 'IS', flag: '🇮🇸', capital: 'Reykjavik', latitude: 64.1466, longitude: -21.9426, timezone: 'Atlantic/Reykjavik', region: 'Europe' },
  { name: 'Ukraine', code: 'UA', flag: '🇺🇦', capital: 'Kyiv', latitude: 50.4501, longitude: 30.5234, timezone: 'Europe/Kyiv', region: 'Europe' },
  { name: 'Croatia', code: 'HR', flag: '🇭🇷', capital: 'Zagreb', latitude: 45.815, longitude: 15.9819, timezone: 'Europe/Zagreb', region: 'Europe' },

  // Asia
  { name: 'Japan', code: 'JP', flag: '🇯🇵', capital: 'Tokyo', latitude: 35.6895, longitude: 139.6917, timezone: 'Asia/Tokyo', region: 'Asia' },
  { name: 'China', code: 'CN', flag: '🇨🇳', capital: 'Beijing', latitude: 39.9042, longitude: 116.4074, timezone: 'Asia/Shanghai', region: 'Asia' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷', capital: 'Seoul', latitude: 37.5665, longitude: 126.978, timezone: 'Asia/Seoul', region: 'Asia' },
  { name: 'India', code: 'IN', flag: '🇮🇳', capital: 'New Delhi', latitude: 28.6139, longitude: 77.209, timezone: 'Asia/Kolkata', region: 'Asia' },
  { name: 'Bangladesh', code: 'BD', flag: '🇧🇩', capital: 'Dhaka', latitude: 23.8103, longitude: 90.4125, timezone: 'Asia/Dhaka', region: 'Asia' },
  { name: 'Pakistan', code: 'PK', flag: '🇵🇰', capital: 'Islamabad', latitude: 33.6844, longitude: 73.0479, timezone: 'Asia/Karachi', region: 'Asia' },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩', capital: 'Jakarta', latitude: -6.2088, longitude: 106.8456, timezone: 'Asia/Jakarta', region: 'Asia' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', capital: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore', region: 'Asia' },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾', capital: 'Kuala Lumpur', latitude: 3.139, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur', region: 'Asia' },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭', capital: 'Bangkok', latitude: 13.7563, longitude: 100.5018, timezone: 'Asia/Bangkok', region: 'Asia' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳', capital: 'Hanoi', latitude: 21.0285, longitude: 105.8542, timezone: 'Asia/Ho_Chi_Minh', region: 'Asia' },
  { name: 'Philippines', code: 'PH', flag: '🇵🇭', capital: 'Manila', latitude: 14.5995, longitude: 120.9842, timezone: 'Asia/Manila', region: 'Asia' },
  { name: 'Taiwan', code: 'TW', flag: '🇹🇼', capital: 'Taipei', latitude: 25.033, longitude: 121.5654, timezone: 'Asia/Taipei', region: 'Asia' },
  { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰', capital: 'Colombo', latitude: 6.9271, longitude: 79.8612, timezone: 'Asia/Colombo', region: 'Asia' },
  { name: 'Nepal', code: 'NP', flag: '🇳🇵', capital: 'Kathmandu', latitude: 27.7172, longitude: 85.324, timezone: 'Asia/Kathmandu', region: 'Asia' },
  { name: 'Maldives', code: 'MV', flag: '🇲🇻', capital: 'Malé', latitude: 4.1755, longitude: 73.5093, timezone: 'Indian/Maldives', region: 'Asia' },

  // Middle East
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', capital: 'Abu Dhabi', latitude: 24.4539, longitude: 54.3773, timezone: 'Asia/Dubai', region: 'Middle East' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', capital: 'Riyadh', latitude: 24.7136, longitude: 46.6753, timezone: 'Asia/Riyadh', region: 'Middle East' },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦', capital: 'Doha', latitude: 25.2854, longitude: 51.531, timezone: 'Asia/Qatar', region: 'Middle East' },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷', capital: 'Ankara', latitude: 39.9334, longitude: 32.8597, timezone: 'Europe/Istanbul', region: 'Middle East' },
  { name: 'Israel', code: 'IL', flag: '🇮🇱', capital: 'Jerusalem', latitude: 31.7683, longitude: 35.2137, timezone: 'Asia/Jerusalem', region: 'Middle East' },
  { name: 'Oman', code: 'OM', flag: '🇴🇲', capital: 'Muscat', latitude: 23.588, longitude: 58.3829, timezone: 'Asia/Muscat', region: 'Middle East' },
  { name: 'Kuwait', code: 'KW', flag: '🇰🇼', capital: 'Kuwait City', latitude: 29.3759, longitude: 47.9774, timezone: 'Asia/Kuwait', region: 'Middle East' },

  // Americas
  { name: 'United States', code: 'US', flag: '🇺🇸', capital: 'Washington D.C.', latitude: 38.9072, longitude: -77.0369, timezone: 'America/New_York', region: 'Americas' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', capital: 'Ottawa', latitude: 45.4215, longitude: -75.6972, timezone: 'America/Toronto', region: 'Americas' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽', capital: 'Mexico City', latitude: 19.4326, longitude: -99.1332, timezone: 'America/Mexico_City', region: 'Americas' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', capital: 'Brasília', latitude: -15.7975, longitude: -47.8919, timezone: 'America/Sao_Paulo', region: 'Americas' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷', capital: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816, timezone: 'America/Argentina/Buenos_Aires', region: 'Americas' },
  { name: 'Chile', code: 'CL', flag: '🇨🇱', capital: 'Santiago', latitude: -33.4489, longitude: -70.6693, timezone: 'America/Santiago', region: 'Americas' },
  { name: 'Colombia', code: 'CO', flag: '🇨🇴', capital: 'Bogotá', latitude: 4.711, longitude: -74.0721, timezone: 'America/Bogota', region: 'Americas' },
  { name: 'Peru', code: 'PE', flag: '🇵🇪', capital: 'Lima', latitude: -12.0464, longitude: -77.0428, timezone: 'America/Lima', region: 'Americas' },
  { name: 'Jamaica', code: 'JM', flag: '🇯🇲', capital: 'Kingston', latitude: 17.9714, longitude: -76.7936, timezone: 'America/Jamaica', region: 'Americas' },
  { name: 'Costa Rica', code: 'CR', flag: '🇨🇷', capital: 'San José', latitude: 9.9281, longitude: -84.0907, timezone: 'America/Costa_Rica', region: 'Americas' },

  // Africa
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', capital: 'Cairo', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo', region: 'Africa' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦', capital: 'Pretoria', latitude: -25.7479, longitude: 28.2293, timezone: 'Africa/Johannesburg', region: 'Africa' },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬', capital: 'Abuja', latitude: 9.0765, longitude: 7.3986, timezone: 'Africa/Lagos', region: 'Africa' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪', capital: 'Nairobi', latitude: -1.2921, longitude: 36.8219, timezone: 'Africa/Nairobi', region: 'Africa' },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦', capital: 'Rabat', latitude: 34.0209, longitude: -6.8416, timezone: 'Africa/Casablanca', region: 'Africa' },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭', capital: 'Accra', latitude: 5.6037, longitude: -0.187, timezone: 'Africa/Accra', region: 'Africa' },
  { name: 'Ethiopia', code: 'ET', flag: '🇪🇹', capital: 'Addis Ababa', latitude: 9.032, longitude: 38.748, timezone: 'Africa/Addis_Ababa', region: 'Africa' },

  // Oceania
  { name: 'Australia', code: 'AU', flag: '🇦🇺', capital: 'Canberra', latitude: -35.2809, longitude: 149.13, timezone: 'Australia/Sydney', region: 'Oceania' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', capital: 'Wellington', latitude: -41.2865, longitude: 174.7762, timezone: 'Pacific/Auckland', region: 'Oceania' },
  { name: 'Fiji', code: 'FJ', flag: '🇫🇯', capital: 'Suva', latitude: -18.1416, longitude: 178.4419, timezone: 'Pacific/Fiji', region: 'Oceania' },
];
