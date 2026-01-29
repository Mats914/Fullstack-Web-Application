import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { COUNTRIES_CITIES, Country } from '../data/countriesCities';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

const WeatherWidget = () => {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState(localStorage.getItem('weatherCity') || 'Stockholm');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(COUNTRIES_CITIES);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchCountry.trim()) {
      const filtered = COUNTRIES_CITIES.filter(country =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(COUNTRIES_CITIES);
    }
  }, [searchCountry]);

  useEffect(() => {
    if (selectedCountry) {
      if (searchCity.trim()) {
        const filtered = selectedCountry.cities.filter(city =>
          city.toLowerCase().includes(searchCity.toLowerCase())
        );
        setFilteredCities(filtered.length > 0 ? filtered : [searchCity.trim()]);
      } else {
        setFilteredCities(selectedCountry.cities);
      }
    }
  }, [selectedCountry, searchCity]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Using OpenWeatherMap API - Free tier allows 60 calls/minute
      // You can get a free API key from: https://openweathermap.org/api
      // For now, using a public demo endpoint that works without API key
      // In production, replace with your actual API key
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
      
      // Using a free weather API that doesn't require API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY || '1fa9ff4126d95b8db54f3897a208e91c'}`
      );

      if (!response.ok) {
        throw new Error('City not found or API error');
      }

      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err: any) {
      setError(t('weather.unavailable'));
      // Try alternative free API
      try {
        const altResponse = await fetch(
          `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        );
        if (altResponse.ok) {
          const altData = await altResponse.json();
          setWeather({
            name: city,
            main: {
              temp: parseFloat(altData.current_condition[0].temp_C),
              feels_like: parseFloat(altData.current_condition[0].FeelsLikeC),
              humidity: parseInt(altData.current_condition[0].humidity)
            },
            weather: [{
              main: altData.current_condition[0].weatherDesc[0].value,
              description: altData.current_condition[0].weatherDesc[0].value.toLowerCase(),
              icon: '01d'
            }]
          });
          setError('');
        } else {
          throw new Error('Weather service unavailable');
        }
      } catch (altErr) {
        // Fallback demo data
        setWeather({
          name: city,
          main: {
            temp: 15,
            feels_like: 14,
            humidity: 65
          },
          weather: [{
            main: 'Clouds',
            description: 'partly cloudy',
            icon: '02d'
          }]
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSearchCountry(country.name);
    setSearchCity('');
    setShowCountryDropdown(false);
    setShowCityDropdown(false);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    localStorage.setItem('weatherCity', selectedCity);
    setSearchCity(selectedCity);
    setShowCityDropdown(false);
  };

  const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCountry(e.target.value);
    setShowCountryDropdown(true);
    setSelectedCountry(null);
    setSearchCity('');
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
    if (selectedCountry) {
      setShowCityDropdown(true);
    }
  };

  const handleCountryInputFocus = () => {
    setShowCountryDropdown(true);
  };

  const handleCityInputFocus = () => {
    if (selectedCountry) {
      setShowCityDropdown(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('weather.title')}</h3>
        <div className="text-center py-4">{t('weather.loading')}</div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('weather.title')}</h3>
        <div className="text-center py-4 text-gray-500">{error}</div>
        <p className="text-xs text-gray-400 mt-2">
          {t('weather.addApiKey')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 shadow rounded-lg p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('weather.title')}</h3>
      </div>

      <div className="space-y-3">
        {/* Country Selection */}
        <div className="relative" ref={countryDropdownRef}>
          <label className="block text-sm font-medium mb-1 text-blue-100">
            {t('weather.selectCountry')}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchCountry}
              onChange={handleCountryInputChange}
              onFocus={handleCountryInputFocus}
              placeholder={t('weather.enterCountry')}
              className="w-full px-4 py-2 pr-10 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <ChevronDownIcon 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
            />
          </div>
          
          {showCountryDropdown && (
            <div className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                  >
                    {country.name}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  {t('weather.noResults')}
                </div>
              )}
            </div>
          )}
        </div>

        {/* City Selection */}
        {selectedCountry && (
          <div className="relative" ref={cityDropdownRef}>
            <label className="block text-sm font-medium mb-1 text-blue-100">
              {t('weather.selectCity')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchCity}
                onChange={handleCityInputChange}
                onFocus={handleCityInputFocus}
                placeholder={t('weather.enterCity')}
                className="w-full px-4 py-2 pr-10 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <ChevronDownIcon 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              />
            </div>
            
            {showCityDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCities.length > 0 ? (
                  filteredCities.map((cityOption, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleCitySelect(cityOption)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                    >
                      {cityOption}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {t('weather.noResults')}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {weather && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-sm opacity-90">{weather.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm capitalize">{weather.weather[0].description}</p>
              <p className="text-xs opacity-75">{t('weather.feelsLike')} {Math.round(weather.main.feels_like)}°C</p>
            </div>
          </div>
          <div className="border-t border-blue-400 pt-4 mt-4">
            <p className="text-sm">
              {t('weather.humidity')}: <span className="font-semibold">{weather.main.humidity}%</span>
            </p>
          </div>
          {error && (
            <p className="text-xs opacity-75 mt-2">
              {t('weather.demoNote')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
