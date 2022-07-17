import Navbar from './components/Navbar';
import './App.css';
import Background from './components/Background';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import CreateCampaign from './components/CreateCampaign';
import Campaigns from './components/Campaigns';
import Donate from './components/Donate';
import DashBoard from './components/DashBoard';


function App() {
  return (
    <div className="App" >
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Background /> <Campaigns /> </>} />
          <Route path='/createCampaign' element={<CreateCampaign/>} />
          <Route path='/campaigns' element={<> <Campaigns /> </>} />
          <Route path='/campaigns/:id' element={<> <Donate /> </>}  />
          <Route path='/dashBoard' element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
