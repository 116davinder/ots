import React, { useState } from "react";

export default function App() {
  return (
    <>
      <div className="py-20 px-10 bg-green-800 text-green-100">
        {/* create a secret message */}
        <h2 className="text-3xl font-bold mb-2 text-white">Create a Secret</h2>
        <CreateSecretForm />
      </div>
      <div className="py-20 px-10 bg-blue-800 text-blue-100">
        {/* show a secret message */}
        <h2 className="text-3xl font-bold mb-2 text-white">Show a Secret</h2>
        <ShowSecretForm />
      </div>
    </>
  );
}

function CreateSecretForm() {
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [expiration_time, setexpiration_time] = useState(259200); // 3 days default expiration time
  const [secretId, setSecretId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      process.env.REACT_APP_OTS_BACKEND_URL + "/create_secret",
      {
        method: "POST",
        body: JSON.stringify({ message, passphrase, expiration_time }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }
    );

    const data = await res.json();

    if(res.ok){
      setSecretId(data.id);
    }else{
      alert(data.detail);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="font-bold text-xs mb-1">What is Your Secret?</label>
        <textarea
          className="w-full p-2 rounded mb-2 text-gray-800"
          minLength="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          {message}
        </textarea>

        <label className="font-bold text-xs mb-1">Passphrase</label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          maxLength="25"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />

        <label className="font-bold text-xs mb-1">Expiration (Seconds)</label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="number"
          min="60"
          max="604800"
          value={expiration_time}
          onChange={(e) => setexpiration_time(e.target.value)}
        />

        <button className="py-2 px-4 rounded bg-yellow-400 text-yellow-900 text-sm">
          Create My Secret
        </button>
      </form>

      {/* success message */}
      {secretId && (
        <div className="bg-white text-gray-800 p-3 rounded shadow mt-6">
          <p>
            Your secret message ID is{" "}
            <strong className="text-blue-400 font-bold">{secretId}</strong>
          </p>
        </div>
      )}
    </>
  );
}

function ShowSecretForm() {
  const [id, setId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [message, setmessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      process.env.REACT_APP_OTS_BACKEND_URL + "/get_secret",
      {
        method: "POST",
        body: JSON.stringify({ id, passphrase }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
    });

    const data = await res.json();

    if(res.ok){
      setmessage(data.message);
    }else{
      alert(data.detail);
    }
    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="font-bold text-xs mb-1">
          What is your secret ID?
        </label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label className="font-bold text-xs mb-1">
          What is the passphrase?
        </label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />

        <button className="py-2 px-4 rounded bg-blue-400 text-blue-900 text-sm">
          Show My Secret
        </button>
      </form>

      {/* show the message */}
      {message && (
        <div className="bg-white text-gray-800 p-4 rounded shadow mt-10">
          <pre className="mb-3">
            <strong className="text-blue-400 font-bold">{message}</strong>
          </pre>
        </div>
      )}
    </>
  );
}
