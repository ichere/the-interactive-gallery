import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import ImageDetailsPage from "./page/ImageDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/image/:id" element={<ImageDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
