import React, { useState } from "react";
function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const loginData = { email: emailAddress, password: password, };
    console.log(loginData);
    const apiUrl = "http://16.171.33.238:4000/login";
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };
    const response = fetch(apiUrl, requestOption);
    response
      .then((res) => res.json())
      .then((data) => {
        setResponseMessage(data.message);
        if (data.status === "success") {
          
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <div className="notice">
        <h2>{responseMessage}</h2>
      </div>
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
 <br />
 <br />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 <br />
 <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
