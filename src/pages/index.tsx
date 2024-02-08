import { Flex, Text, Box, Spacer } from '@chakra-ui/react';
import Image from 'next/image';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { SearchBar } from './components/searchBar';

export default function Index(): JSX.Element {
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
            <SearchBar/>
          </Box>
          <Box flex='1' mt={10}>
            <Text color="black">Enter the location and find the city's current weather!</Text>
          </Box>
        </Flex>
        <Box style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
