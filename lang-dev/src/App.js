import {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Library from './components/Library/Library';

function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  console.log(library)

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/library'>
          <Library library={library} setLibrary={setLibrary} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
