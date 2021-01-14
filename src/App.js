import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BoxBusqueda from './components/BoxBusqueda/BoxBusqueda';
import InfoActor from './components/InfoActor/InfoActor';



function App() {

  
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <BoxBusqueda />
        </Route>
        <Route exact path="/info">
            <InfoActor />
          </Route>

      </Switch>
    </Router>
  );
}

export default App;
