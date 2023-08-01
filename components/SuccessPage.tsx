import { Box, Button, Heading, Text } from '@chakra-ui/react';

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
  handleButton1Click?: any,
  handleButton2Click?: any
}) => {
  return (
    <Box p={4} maxW="400px" mx="auto" mt={10}>
      <Heading as="h2" size="lg" mb={4} textAlign="center" color="green.600">
        {successTitle}
      </Heading>
      <Text fontSize="lg" textAlign="center" color="gray.600">
        {successMessage}
      </Text>
      <Box mt={6} display="flex" justifyContent="center">
        {handleButton1Click != null && (
          <Button colorScheme="teal" onClick={handleButton1Click} mr={2}>
            {button1Text}
          </Button>
        )}
        {handleButton2Click != null && (
          <Button colorScheme="blue" onClick={handleButton2Click}>
            {button2Text}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SuccessPage;
