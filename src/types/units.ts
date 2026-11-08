export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';
export type PressureUnit = 'hPa' | 'inHg';
export type DistanceUnit = 'km' | 'mi';
export type AppearanceMode = 'auto' | 'dark' | 'light';

export interface UnitsConfig {
  temperature: TemperatureUnit;
  speed: SpeedUnit;
  precipitation: PrecipitationUnit;
  pressure: PressureUnit;
  distance: DistanceUnit;
  appearance: AppearanceMode;
}
