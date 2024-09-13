import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [ques, setQues] = useState("");
  const [load, setLoad] = useState(false);
  const [ans, setAnswer] = useState("");

  const generateAnswer = async () => {
    console.log("QUES : ", ques);
    setLoad(false);
    setAnswer("Thinking...");
    console.log("loading....");
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAPPEU_P0uVM2sx2S29EmexjHX6jsoxTWQ", 
      method: "post",
      data: {
        "contents": [{ "parts": [{ "text": `${ques}` }] }]
      },
    })
    setAnswer(res['data']['candidates'][0]['content']['parts'][0]['text'])
    console.log(res['data']['candidates'][0]['content']['parts'][0]['text']);
    console.log(res);
    setLoad(true);
  }

  return (
    <div className="App">
      <h1>Test Gemini API</h1>
      <textarea
        cols="30"
        rows="10"
        value={ques}
        onChange={(e) => setQues(e.target.value)}
        placeholder="Enter your question..."
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 5,
          border: '1px solid #ccc',
          width: '80%',
          marginBottom: 20,
        }}
      />
      <button
        onClick={generateAnswer}
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 5,
          border: 'none',
          backgroundColor: '#4CAF50',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Generate Answer
      </button>
      <div style={{ marginTop: 20 }}>
        <h2>Here's your answer:</h2>
        <p style={{ fontSize: 18, color: '#666' }}>
          {load ? ans : "Loading..."}
        </p>
      </div>
    </div>
  );
}

export default App;