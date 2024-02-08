import { Flex, Text, Box, Spacer, InputGroup, InputLeftElement, Input, InputRightAddon, Button } from '@chakra-ui/react';
import Image from 'next/image';
import NavBar from './components/navBar';
import Footer from './components/footer';
import { Search2Icon } from '@chakra-ui/icons';

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
            <InputGroup borderRadius={5} size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="gray.600" />}
              />
              <Input type="text" placeholder="Search..." border="1px solid #949494" color="black" />
              <InputRightAddon
                p={0}
                border="none"
              >
                <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
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
