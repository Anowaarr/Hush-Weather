import { WeatherCodeInfo } from '../types/weather';

interface CodeDefinition {
  label: string;
  dayIcon: string;
  nightIcon: string;
  dayTheme: WeatherCodeInfo['theme'];
  nightTheme: WeatherCodeInfo['theme'];
  isRain?: boolean;
  isSnow?: boolean;
  isThunder?: boolean;
}

const WMO_CODE_MAP: Record<number, CodeDefinition> = {
  0: {
    label: 'Clear',
    dayIcon: 'sun',
    nightIcon: 'moon',
    dayTheme: 'clear-day',
    nightTheme: 'clear-night',
  },
  1: {
    label: 'Mostly Clear',
    dayIcon: 'sun',
    nightIcon: 'moon',
    dayTheme: 'clear-day',
    nightTheme: 'clear-night',
  },
  2: {
    label: 'Partly Cloudy',
    dayIcon: 'cloud-sun',
    nightIcon: 'cloud-moon',
    dayTheme: 'partly-cloudy-day',
    nightTheme: 'partly-cloudy-night',
  },
  3: {
    label: 'Overcast',
    dayIcon: 'cloud',
    nightIcon: 'cloud',
    dayTheme: 'overcast',
    nightTheme: 'overcast',
  },
  45: {
    label: 'Foggy',
    dayIcon: 'cloud-fog',
    nightIcon: 'cloud-fog',
    dayTheme: 'fog',
    nightTheme: 'fog',
  },
  48: {
    label: 'Icy Fog',
    dayIcon: 'cloud-fog',
    nightIcon: 'cloud-fog',
    dayTheme: 'fog',
    nightTheme: 'fog',
  },
  51: {
    label: 'Light Drizzle',
    dayIcon: 'cloud-drizzle',
    nightIcon: 'cloud-drizzle',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  53: {
    label: 'Drizzle',
    dayIcon: 'cloud-drizzle',
    nightIcon: 'cloud-drizzle',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  55: {
    label: 'Heavy Drizzle',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  56: {
    label: 'Freezing Drizzle',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  57: {
    label: 'Heavy Freezing Drizzle',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  61: {
    label: 'Slight Rain',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  63: {
    label: 'Moderate Rain',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  65: {
    label: 'Heavy Rain',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  66: {
    label: 'Freezing Rain',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  67: {
    label: 'Heavy Freezing Rain',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  71: {
    label: 'Slight Snow',
    dayIcon: 'cloud-snow',
    nightIcon: 'cloud-snow',
    dayTheme: 'snow',
    nightTheme: 'snow',
    isSnow: true,
  },
  73: {
    label: 'Moderate Snow',
    dayIcon: 'cloud-snow',
    nightIcon: 'cloud-snow',
    dayTheme: 'snow',
    nightTheme: 'snow',
    isSnow: true,
  },
  75: {
    label: 'Heavy Snow',
    dayIcon: 'cloud-snow',
    nightIcon: 'cloud-snow',
    dayTheme: 'snow',
    nightTheme: 'snow',
    isSnow: true,
  },
  77: {
    label: 'Snow Grains',
    dayIcon: 'cloud-snow',
    nightIcon: 'cloud-snow',
    dayTheme: 'snow',
    nightTheme: 'snow',
    isSnow: true,
  },
  80: {
    label: 'Rain Showers',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  81: {
    label: 'Heavy Showers',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  82: {
    label: 'Violent Showers',
    dayIcon: 'cloud-rain',
    nightIcon: 'cloud-rain',
    dayTheme: 'rain',
    nightTheme: 'rain',
    isRain: true,
  },
  85: {
    label: 'Snow Showers',
    dayIcon: 'cloud-snow',
    nightIcon: 'cloud-snow',
    dayTheme: 'snow',
    nightTheme: 'snow',
    isSnow: true,
  },
  86: {
    label: 'Heavy Snow Showers',
    dayIcon: 'cloud-snow',
    nightIcon: 'cloud-snow',
    dayTheme: 'snow',
    nightTheme: 'snow',
    isSnow: true,
  },
  95: {
    label: 'Thunderstorm',
    dayIcon: 'cloud-lightning',
    nightIcon: 'cloud-lightning',
    dayTheme: 'thunderstorm',
    nightTheme: 'thunderstorm',
    isThunder: true,
  },
  96: {
    label: 'Hail Thunderstorm',
    dayIcon: 'cloud-lightning',
    nightIcon: 'cloud-lightning',
    dayTheme: 'thunderstorm',
    nightTheme: 'thunderstorm',
    isThunder: true,
  },
  99: {
    label: 'Severe Thunderstorm',
    dayIcon: 'cloud-lightning',
    nightIcon: 'cloud-lightning',
    dayTheme: 'thunderstorm',
    nightTheme: 'thunderstorm',
    isThunder: true,
  },
};

const DEFAULT_CODE_INFO: CodeDefinition = {
  label: 'Partly Cloudy',
  dayIcon: 'cloud-sun',
  nightIcon: 'cloud-moon',
  dayTheme: 'partly-cloudy-day',
  nightTheme: 'partly-cloudy-night',
};

export function getWeatherCodeInfo(code: number, isDay: number | boolean = 1): WeatherCodeInfo {
  const isDayBool = typeof isDay === 'boolean' ? isDay : isDay === 1;
  const def = WMO_CODE_MAP[code] ?? DEFAULT_CODE_INFO;

  return {
    code,
    label: def.label,
    theme: isDayBool ? def.dayTheme : def.nightTheme,
    iconName: isDayBool ? def.dayIcon : def.nightIcon,
    isRain: def.isRain,
    isSnow: def.isSnow,
    isThunder: def.isThunder,
  };
}
