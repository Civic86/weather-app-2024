import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const About = () => {
  interface WeatherData {
    map(arg0: (weather: WeatherData, index: number) => React.JSX.Element): React.ReactNode;
    windSpeed: any;
    description: any;
    temp: any;
    date: any;
    dt: any;
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind: {
      speed: number;
    };
    lastupdate: {
      value: any;
    }
  }

  const [CurrentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [FiveDaysWeather, setFiveDaysWeather] = useState<WeatherData | null>(null);

  const [error, setError] = useState('');
  const router = useRouter();
  const { location } = router.query;

  useEffect(() => {
    if (location) {
      const API_KEY = "94cc376cb7e1d14d4733642775cf5059";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
      const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;


      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch current weather data');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.main) {
            setCurrentWeather(data);
          } else {
            setError('CurrentWeather data is not available');
          }
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          setError('Weather data could not be fetched. Please try again.');
        });

      fetch(FORECAST_URL)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch 5 days weather data');
          }
          return response.json();
        })
        .then(data => {
          const dailyData = data.list.filter((item: any, index: number) => index % 8 === 0);
          const formattedData = dailyData.map((item: any) => ({
            temp: parseFloat(item.main.temp).toFixed(1),
            main: item.weather[0].main,
            description: item.weather[0].description,
            windSpeed: item.wind.speed,
            date: new Date(item.dt_txt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          }));
          setFiveDaysWeather(formattedData);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          setError('Weather data could not be fetched. Please try again.');
        });
    }
  }, [location]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Box p={4}>
        {error && <Text color="red.500">{error}</Text>}
        {CurrentWeather ? (
          <>
            <Text>Last Updated: {new Date(CurrentWeather.dt * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
            <Text>{`Location: ${CurrentWeather.name}, ${CurrentWeather.sys.country}`}</Text>
            <Text>{`Temperature: ${Math.ceil(CurrentWeather.main.temp)}°C`}</Text>
            <Text>{`Weather: ${CurrentWeather.weather[0].main} (${CurrentWeather.weather[0].description})`}</Text>
            {CurrentWeather && (
              <>
                {["Thunderstorm", "Drizzle", "Rain", "Snow"].includes(CurrentWeather.weather[0].main) && (
                  <Box>
                    <Image src="/rain.png" alt="Rainy Weather" width={100} height={100} />
                  </Box>
                )}
                {["Atmosphere", "Clear"].includes(CurrentWeather.weather[0].main) && (
                  <Box>
                    <Image src="/sun.png" alt="Sunny Weather" width={100} height={100} />
                  </Box>
                )}
                {CurrentWeather.weather[0].main === "Clouds" && (
                  <Box>
                    <Image src="/cloud.png" alt="Cloudy Weather" width={100} height={100} />
                  </Box>
                )}
              </>
            )}
            <Text>{`Wind Speed: ${CurrentWeather.wind.speed} m/s`}</Text>
            <Box p={4}>
              {FiveDaysWeather ? (
                <Flex direction="column" gap="4">
                  {FiveDaysWeather.map((weather: WeatherData, index: number) => (
                    <Box key={index} p={4} shadow="md" borderWidth="1px">
                      <Text>{`Date: ${weather.date}`}</Text>
                      <Text>{`Temperature: ${weather.temp}°C`}</Text>
                      <Text>{`Weather: ${weather.main} (${weather.description})`}</Text>
                      <Text>{`Wind Speed: ${weather.windSpeed} m/s`}</Text>
                    </Box>
                  ))}
                </Flex>
              ) : !error && <Text>Loading 5 days weather data...</Text>}
            </Box>
          </>
        ) : !error && <Text>Loading weather data...</Text>}
      </Box>
    </Flex>
  );
};

export default About;
