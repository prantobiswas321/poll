import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Polls from "./Pages/Polls/Polls";
import Votes from "./Pages/Votes/Votes";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Polls />}></Route>
        <Route exact path="/polls" element={<Polls />}></Route>
        <Route exact path="/polls/:userId" element={<Votes />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
