import "./App.css";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AccountBox } from "./components/accountBox";
import MapBox from "./components/Map";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <>
    <AppContainer>
    <Router>
      <Routes>
        <Route path="/" element={<AccountBox />} />
        <Route path="/map" element={<MapBox />} />
      </Routes>
    </Router>
    </AppContainer>
  </>
  );
}

export default App;
