import "./App.css";
import AddNew from "./components/AddNew";
import Posts from "./components/Posts";

function App() {
  return (
    <div className="App w-full">
      <h1 className="text-3xl m-5">Create Post:</h1>
      <AddNew />
      <h1 className="text-3xl m-5">Posts:</h1>

      <Posts />
    </div>
  );
}

export default App;
