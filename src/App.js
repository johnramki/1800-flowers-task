import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./component/Header";
import { Search } from "./component/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
    </div>
  );
}

export default App;
