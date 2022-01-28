import "./App.css";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const search = async () => {
    const results = await getImages(query);
    setImages(results);
  };

  function updateQuery(event) {
    setQuery(event.target.value);
  }

  async function getImages() {
    const url = "https://serverless-api-worker.immanent.dev";
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "cont-type": "application/json" },
    });

    return resp.json();
  }
  return (
    <div className="App">
      <div className="form">
        <input
          type="text"
          id="query"
          onChange={updateQuery}
          placeholder="Search for images 📷"
        />
        <button onClick={search}>Search</button>
      </div>
      {images.map((image) => (
        <a key={image.id} href={image.link} target="_blank" rel="noreferrer">
          <img src={image.image} alt={query} />
        </a>
      ))}
    </div>
  );
}

export default App;
