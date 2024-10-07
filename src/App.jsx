import { useState } from 'react';
import Generator from './components/Generator';
import NavigationBar from './components/NavigationBar';
import './index.css';
import Home from './components/Home';
import Community from './components/Community';


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
        <Home/>
    }
  } 

  return (
    <div id='screen-container'>
      <NavigationBar pageSetter = {setPage}/>
      {pageGetter()}
    </div>
  );
}

export default App;