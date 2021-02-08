import "./App.css";
import Number from "./Number.js";

function App() {
  const loopNumberComponents = () => {
    let numberComponents = [];
    for (let i = 0; i < 10; i++) {
      numberComponents.push(<Number displayNumber={i} />);
    }
    return numberComponents;
  };

  return <div className="App">{loopNumberComponents()}</div>;
}

export default App;
