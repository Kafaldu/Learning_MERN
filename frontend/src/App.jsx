import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { useColorMode } from '@chakra-ui/react';

function App() {
    const { colorMode } = useColorMode();

    return(
      <>
      <Box minH={"100vh"} bg={colorMode === "light" ? "gray.200" : "gray.800"}> 
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
      </>
    )
}
export default App;
