import LogIn from "./Views/LogIn";
import MessageEvaluation from "./Views/MessageEvaluation";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import SignUp from "./Views/SignUp";
import Training from "./Views/Training";
import End from "./Views/End";

function App() {
  
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<LogIn/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/message" element={<MessageEvaluation/>}></Route>
            <Route path="/training" element={<Training/>}></Route>
            <Route path="/end" element={<End/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
