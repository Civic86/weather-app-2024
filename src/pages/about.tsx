import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const About = () => {
  interface WeatherData {
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
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [error, setError] = useState('');
  const router = useRouter();
  const { location } = router.query;

  useEffect(() => {
    if (location) {
      const API_KEY = "94cc376cb7e1d14d4733642775cf5059";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`; // Use the same variable name here

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.main) {
            setWeather(data);
          } else {
            setError('Weather data is not available');
          }
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
        {weather ? (
          <>
            <Text>{`Location: ${weather.name}, ${weather.sys.country}`}</Text>
            <Text>{`Temperature: ${Math.ceil(weather.main.temp)}°C`}</Text>
            <Text>{`Weather: ${weather.weather[0].main} (${weather.weather[0].description})`}</Text>
            {weather && (
              <>
                {["Thunderstorm", "Drizzle", "Rain", "Snow"].includes(weather.weather[0].main) && (
                  <Box>
                    <Image src="/rain.png" alt="Rainy Weather" width={100} height={100} />
                  </Box>
                )}
                {["Atmosphere", "Clear"].includes(weather.weather[0].main) && (
                  <Box>
                    <Image src="/sun.png" alt="Sunny Weather" width={100} height={100} />
                  </Box>
                )}
                {weather.weather[0].main === "Clouds" && (
                  <Box>
                    <Image src="/cloud.png" alt="Cloudy Weather" width={100} height={100} />
                  </Box>
                )}
              </>
            )}
            <Text>{`Wind Speed: ${weather.wind.speed} m/s`}</Text>
          </>
        ) : !error && <Text>Loading weather data...</Text>}
      </Box>
    </Flex>
  );
};

export default About;
