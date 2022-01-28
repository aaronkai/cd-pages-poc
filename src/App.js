import "./App.css";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const devUrl = "https://serverless-api.immanent.workers.dev";
  const prodUrl = "https://serverless-api-worker.immanent.dev";

  const searchDev = async () => {
    const results = await getImages(devUrl);
    setImages(results);
  };

  const searchProd = async () => {
    const results = await getImages(prodUrl);
    setImages(results);
  };

  function updateQuery(event) {
    setQuery(event.target.value);
  }

  async function getImages(url) {
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
        <button onClick={searchDev}>Search Dev</button>
        <button onClick={searchDev}>Search Prod</button>
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
