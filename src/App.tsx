import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import Search from './Components/Search/Search';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/video/:videoId' element={<Video />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
