import { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Text, Box, Spacer, InputGroup, InputLeftElement, Input, InputRightAddon, Button } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import NavBar from './components/navBar';
import Footer from './components/footer';

const API_KEY = "94cc376cb7e1d14d4733642775cf5059";

export default function Index(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const fetchWeatherData = async (city: string) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.cod === 200) { // HTTPステータスコードが200の場合、正常にデータを取得
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Weather data could not be fetched. Please try again."); // エラーハンドリング
      return null;
    }
  };

  const handleSearch = async () => {
    const weatherData = await fetchWeatherData(searchTerm);
    if (weatherData) {
      const { main: { temp }, weather } = weatherData;
      router.push({
        pathname: '/about',
        query: { location: searchTerm, temp: temp.toFixed(1), weather: weather[0].main },
      });
    }
  };

  return (
    <>
      <NavBar />
      <Box minHeight="90vh" position="relative">
        <Flex color='white' flexDirection="column" alignItems="center">
          <Box mt={200}>
            <Text color="black" fontWeight="Bold" fontSize="large" textAlign="center">Ask this app to know the weather all over the world! </Text>
          </Box>
          <Spacer />
          <Box mt={10}>
            <InputGroup borderRadius={5} size="sm">
              <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.600" />} />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                border="1px solid #949494"
                color="black"
              />
              <InputRightAddon p={0} border="none">
                <Button onClick={handleSearch} size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
                  Search
                </Button>
              </InputRightAddon>
            </InputGroup>
          </Box>
          <Box flex='1' mt={10}>
            <Text color="black" textAlign="center">Enter the location and find the city's current weather!</Text>
          </Box>
        </Flex>
        <Box style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
