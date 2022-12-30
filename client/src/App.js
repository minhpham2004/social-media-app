import { BrowserRouter as Router, Route } from 'react-router-dom'
import PageRender from './PageRender';
import './index.css'

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className='main'>
          <Route path='/:page' component={PageRender} />
          <Route path='/:page/:id' component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
