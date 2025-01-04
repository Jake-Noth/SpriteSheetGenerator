import Home from "./HomePageComponents/Home"
import Generator from "./GeneratorFeature/Generator"
import { usePageStore} from './PageSwitchStore'

function App() {

  const { page } = usePageStore()
  
  switch(page){
    case "home":
      return(<Home/>)
    case "generator":
      return(<Generator/>)
    default:
      return(<Home/>)
  }
}

export default App
