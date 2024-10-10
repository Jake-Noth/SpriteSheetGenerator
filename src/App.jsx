import { useState } from 'react';
import Generator from './components/Generator';
import NavigationBar from './components/NavigationBar';
import './index.css';
import Home from './components/Home';
import Community from './components/Community';
import { VideoProvider } from './Context/VideoContext';


function App() {

  const [page, setPage] = useState('home')

  const pageGetter = () => {

    switch(page){
      case 'home':
        return <Home/>
      case 'community':
        return <Community/>
      case 'generator':
        return <Generator/>
      default:
        return <Home/>
    }
  } 

  return (
    <div id='screen-container'>
      <NavigationBar pageSetter = {setPage}/>
      <VideoProvider>
        {pageGetter()} 
      </VideoProvider>
    </div>
  );
}

export default App;