import { useState } from "react";
import { validateEmail, validatePassword } from "./validators";

export function StateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [emailError, setEmailError] = useState([]);
  // const [passwordError, setPasswordError] = useState([]);

  // We are checking if we are after the first submit after every single time the value changes or is updated for the email and password.
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  // We run this check every single time to update the errors, otherwise it will pass along an empty array for the errors.
  const emailError = afterFirstSubmit ? validateEmail(email) : [];
  const passwordError = afterFirstSubmit ? validatePassword(password) : [];

  function handleSubmit(e) {
    e.preventDefault();
    setAfterFirstSubmit(true); // Since we set this to a default false state above, we need to set it here to true.

    const emailResults = validateEmail(email);
    const passwordResults = validatePassword(password);

    // We can remove the following lines of code since we are already checking with the validators above. We are also checking with lines 15 and 16 every time the component rerenders.
    // setEmailError(emailResults);
    // setPasswordError(passwordResults);

    {
      /*Since we are not doing anything with this form, we just provide an alert that credentials entered were successful. */
    }
    if (emailResults.length === 0 && passwordResults.length === 0) {
      alert("Form submitted!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* Logic below is setting the className to a template literal using a ternary statement to render out the error class. */}
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
        {/* We moved the html code for the error msg up into the curly braces in order to join all error messages separated by a comma. */}
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
