import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import Search from './Components/Search/Search';

function App() {

  const [sidebar, setSidebar] = useState(true);
  const [input, setInput] = useState("");
  const [category,setCategory] = useState(0);

  return (
    <div>
      <Navbar setSidebar={setSidebar} setInput={setInput} input={input}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} category={category} setCategory={setCategory}/>}></Route>
        <Route path='/video/:videoId' element={<Video/>}></Route>
        {/* <Route path='/video/:categoryId/:videoId' element={<Video/>}></Route> */}
        <Route path='/search' element={<Search input={input} sidebar={sidebar} category={category} setCategory={setCategory}></Search>}></Route>
      </Routes>
    </div>
  )
}

export default App
