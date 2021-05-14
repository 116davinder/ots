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

    console.log(process.env.REACT_APP_OTS_BACKEND_URL);

    const res = await fetch(
      process.env.REACT_APP_OTS_BACKEND_URL,
      {
        method: "POST",
        body: JSON.stringify({ message, passphrase, "expiration_time": 604800 }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await res.json();

    // console.log(data);
    if(res.status === 200){
      setSecretId(data.id);
    }else{
      alert(data.message)
    }
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
  const [message, setmessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_OTS_BACKEND_URL}/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ passphrase }),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    setmessage(data.message)  
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
          <p className="mb-3">
            Message: {" "}
            <strong className="text-blue-400 font-bold">{message}</strong>
          </p>
        </div>
      )}
    </>
  );
}
