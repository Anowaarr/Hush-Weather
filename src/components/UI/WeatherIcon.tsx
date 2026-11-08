import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Compass,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Navigation,
  Search,
  List,
  X,
  Check,
  RotateCw,
  Plus,
  Trash2,
  LucideProps,
} from 'lucide-react';

export interface WeatherIconProps extends LucideProps {
  name: string;
  className?: string;
  size?: number | string;
  ariaLabel?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  name,
  className = '',
  size = 24,
  ariaLabel,
  ...rest
}) => {
  const iconProps = {
    size,
    className,
    'aria-hidden': !ariaLabel,
    'aria-label': ariaLabel,
    ...rest,
  };

  switch (name) {
    case 'sun':
      return <Sun {...iconProps} color="#f5c144" />;
    case 'moon':
      return <Moon {...iconProps} color="#d4e1f5" />;
    case 'cloud':
      return <Cloud {...iconProps} />;
    case 'cloud-sun':
      return <CloudSun {...iconProps} color="#e0f0ff" />;
    case 'cloud-moon':
      return <CloudMoon {...iconProps} color="#d4e1f5" />;
    case 'cloud-rain':
      return <CloudRain {...iconProps} color="#80d0ff" />;
    case 'cloud-drizzle':
      return <CloudDrizzle {...iconProps} color="#99ddff" />;
    case 'cloud-snow':
      return <CloudSnow {...iconProps} color="#e3f3ff" />;
    case 'cloud-lightning':
      return <CloudLightning {...iconProps} color="#ffd466" />;
    case 'cloud-fog':
      return <CloudFog {...iconProps} color="#cbd5e1" />;
    case 'wind':
      return <Wind {...iconProps} />;
    case 'droplets':
      return <Droplets {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;
    case 'gauge':
      return <Gauge {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    case 'sunrise':
      return <Sunrise {...iconProps} color="#ffb74d" />;
    case 'sunset':
      return <Sunset {...iconProps} color="#ff7043" />;
    case 'thermometer':
      return <Thermometer {...iconProps} />;
    case 'umbrella':
      return <Umbrella {...iconProps} />;
    case 'navigation':
      return <Navigation {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'list':
      return <List {...iconProps} />;
    case 'x':
      return <X {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'rotate-cw':
      return <RotateCw {...iconProps} />;
    case 'plus':
      return <Plus {...iconProps} />;
    case 'trash':
      return <Trash2 {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};
