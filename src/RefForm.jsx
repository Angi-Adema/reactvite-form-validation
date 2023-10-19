import { useState, useRef } from "react";
import { validateEmail, validatePassword } from "./validators";

export function RefForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // This state below is what we are keeping because we need to be able to rerender our component in order to show these messages. State is the best way to do this.
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);

  // Track if we have already submitted the form once and in order to do this, we use state.
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setAfterFirstSubmit(true);

    // Here in order to use Refs we need to add emailRef.current.value rather than just passing in email like we did for state.
    const emailResults = validateEmail(emailRef.current.value);
    const passwordResults = validatePassword(passwordRef.current.value);

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
      {/* Logic below is setting the className to a template literal using a ternary statement to render out the error class. */}
      <div className={`form-group ${emailError.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          // Only after the first submit does the onChange call this function. All this function does is take the current value of the input, check it for any errors and set the errors for the form to that value.

          className="input"
          type="email"
          id="email"
          ref={emailRef}
          onChange={
            afterFirstSubmit
              ? (e) => setEmailError(validateEmail(e.target.value))
              : undefined
          }
          // When using Refs, we can delete the following that is only used in state.
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          id="password"
          ref={passwordRef}
          onChange={
            afterFirstSubmit
              ? (e) => setPasswordError(validatePassword(e.target.value))
              : undefined
          }
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
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
