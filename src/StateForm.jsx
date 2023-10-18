import { useState } from "react";
import { validateEmail, validatePassword } from "./validators";

export function StateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const emailResults = validateEmail(email);
    const passwordResults = validatePassword(password);

    setEmailError(emailResults);
    setPasswordError(passwordResults);

    {
      /*Since we are not doing anything with this form, we just provide an alert that credentials entered were successful. */
    }
    if (emailResults.length === 0 && passwordResults.length === 0) {
      alert("Form submitted!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* Logic to handle error rendering. */}
      <div className={`form-group ${emailError.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError.length > 0 && (
          <div className="msg">{emailError.join(", ")}</div>
        )}
        {/* <div className="msg">Must end in @webdevsimplified.com</div>{" "} */}
        {/* Only want to show this if we have errors, so copy and pasted into line 28. */}
      </div>
      <div className={`form-group ${passwordError.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError.length > 0 && (
          <div className="msg">{passwordError.join(", ")}</div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
