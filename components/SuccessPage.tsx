import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { green } from '@cloudinary/url-gen/actions/adjust';

const SuccessPage = ({
  successTitle,
  successMessage,
  handleButton1Click,
  button1Text,
  handleButton2Click,
  button2Text,
}: {
  successTitle: string;
  successMessage: string;
  button1Text?: any;
  button2Text?: any;
  handleButton1Click?: any;
  handleButton2Click?: any;
}) => {
  return (
    <Box p={4} h="100vh" mx="auto" bg={'green.100'}>
      <Heading as="h2" size="lg" mb={4} textAlign="center" color="black.600" mt={10}>
        {successTitle}
      </Heading>
      <Text fontSize="lg" textAlign="center" color="gray.600">
        {successMessage}
      </Text>
      <Box mt={6} display="flex" justifyContent="center">
        {handleButton1Click != null && (
          <Button colorScheme="teal" onClick={handleButton1Click} mr={2} px={10} py={2}>
            {button1Text}
          </Button>
        )}
        {handleButton2Click != null && (
          <Button colorScheme="blue" onClick={handleButton2Click} px={10} py={2}>
            {button2Text}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SuccessPage;
