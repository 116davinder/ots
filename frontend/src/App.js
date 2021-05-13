import React, { useState } from "react";

export default function App() {
  return (
    <>
      <div className="py-20 px-10 bg-green-800 text-green-100">
        {/* create a secret message */}
        {/* input: secret message */}
        {/* input: passphrase */}
        <h2 className="text-3xl font-bold mb-2 text-white">Create a Secret</h2>
        <CreateSecretForm />
      </div>
      <div className="py-20 px-10 bg-blue-800 text-blue-100">
        {/* input: hash */}
        {/* input: passphrase */}
        {/* show: secret message */}
        <h2 className="text-3xl font-bold mb-2 text-white">Show a Secret</h2>
        <ShowSecretForm />
      </div>
    </>
  );
}

function CreateSecretForm() {
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [secretId, setSecretId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/secrets",
      {
        method: "POST",
        data: JSON.stringify({ message, passphrase })
      }
    );
    const data = await res.json();

    // TODO: replace with real data
    // const data = {
    //   id: "9b2d48af1f04474fb00bfa3357eb5ede",
    //   success: "True"
    // };

    // now we have a hash/id from the api
    // display that to the user so they can give that to friends
    console.log(data);

    setSecretId(data.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="font-bold text-xs mb-1">What's Your Secret?</label>
        <textarea
          className="w-full p-2 rounded mb-2 text-gray-800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          {message}
        </textarea>

        <label className="font-bold text-xs mb-1">Passphrase</label>
        <input
          className="w-full p-2 rounded mb-4 text-gray-800"
          type="text"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />

        <button className="py-2 px-4 rounded bg-yellow-400 text-yellow-900 text-sm">
          Create My Secret
        </button>
      </form>

      {/* success message */}
      {secretId && (
        <div className="bg-white text-gray-800 p-4 rounded shadow mt-10">
          <p>
            Your secret message ID is{" "}
            <strong className="text-blue-400 font-bold">{secretId}</strong>.
          </p>
        </div>
      )}
    </>
  );
}

function ShowSecretForm() {
  const [id, setId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [secretMessage, setSecretMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/secrets/${id}`, {
      method: "POST",
      data: JSON.stringify({ id, passphrase })
    });
    const data = await res.json();

    // TODO: replace with real data!
    // const data = {};

    // now we have a hash/id from the api
    // display that to the user so they can give that to friends
    alert(data);
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

      {/* show the secret message */}
      {secretMessage && (
        <div className="bg-white text-gray-800 p-4 rounded shadow mt-10">
          <p className="mb-3">
            Your secret message is{" "}
            <strong className="text-blue-400 font-bold">{secretMessage}</strong>
            .
          </p>
        </div>
      )}
    </>
  );
}
