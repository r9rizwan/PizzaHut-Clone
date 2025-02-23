import { useState } from "react";
import { Logo } from "../../../components/index";

function RegisterPage() {
  const [fName, setFname] = useState("");
  const [fNameError, setFnameError] = useState("");
  const changeFname = (e) => setFname(e.target.value);

  const [lName, setLname] = useState("");
  const [lNameError, setLnameError] = useState("");
  const changeLname = (e) => setLname(e.target.value);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const changePhone = (e) => setPhone(e.target.value);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const changeEmail = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const changePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValidSubmit = true;

    // Validation for First Name
    if (!fName.trim()) {
      setFnameError("Please Enter your First Name!");
      isValidSubmit = false;
    } else if (!/^[A-Za-z]+$/.test(fName.trim())) {
      setFnameError("First Name should only contain alphabets!");
      isValidSubmit = false;
    } else {
      setFnameError(null);
    }

    // Validation for Last Name
    if (!lName.trim()) {
      setLnameError("Please Enter your Last Name!");
      isValidSubmit = false;
    } else if (!/^[A-Za-z]+$/.test(lName.trim())) {
      setLnameError("Last Name should only contain alphabets!");
      isValidSubmit = false;
    } else {
      setLnameError(null);
    }

    // Validation for Phone Number
    if (!phone.trim()) {
      setPhoneError("Please Enter your Phone Number!");
      isValidSubmit = false;
    } else if (!/^\d{1,11}$/.test(phone.trim())) {
      setPhoneError(
        "Phone Number should only contain digits and be no longer than 11 digits!"
      );
      isValidSubmit = false;
    } else {
      setPhoneError(null);
    }

    // Validation for Email
    if (!email.trim()) {
      setEmailError("Please Enter an Email!");
      isValidSubmit = false;
    } else {
      const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegExp.test(email.trim())) {
        setEmailError("Incorrect Email Format!");
        isValidSubmit = false;
      } else {
        setEmailError(null);
      }
    }

    // Validation for Password
    if (!password.trim()) {
      setPasswordError("Please Enter a Password");
      isValidSubmit = false;
    } else {
      setPasswordError(null);
    }

    if (!isValidSubmit) return;

    const values = {
      fName: fName.trim(),
      lName: lName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    console.log(values);
  };

  return (
    <div className="flex items-center justify-center py-24 min-h-10 bg-gray-100">
      <div className="flex flex-col items-center gap-6">
        <Logo className="w-64 h-64 mb-10" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white w-[36rem] shadow rounded p-8 py-12">
          <h3 className="text-2xl text-gray-600 font-semibold text-center uppercase tracking-wide">
            Register for New User
          </h3>

          <div className="flex flex-col gap-1 mt-2">
            <label
              className="text-gray-700 tracking-wide"
              htmlFor="register-fname">
              First Name:
            </label>
            <input
              type="text"
              placeholder="Enter your first name..."
              value={fName}
              onChange={changeFname}
              className="px-3 py-2 bg-gray-100 rounded ring-1 ring-slate-300 outline-none hover:ring-blue-400 focus:ring-2 focus:ring-blue-400 transition-shadow text-gray-700"
              id="register-fname"
            />
            <span className="text-red-600 text-sm tracking-wide">
              {fNameError}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label
              className="text-gray-700 tracking-wide"
              htmlFor="register-lname">
              Last Name:
            </label>
            <input
              type="text"
              placeholder="Enter your last name..."
              value={lName}
              onChange={changeLname}
              className="px-3 py-2 bg-gray-100 rounded ring-1 ring-slate-300 outline-none hover:ring-blue-400 focus:ring-2 focus:ring-blue-400 transition-shadow text-gray-700"
              id="register-lname"
            />
            <span className="text-red-600 text-sm tracking-wide">
              {lNameError}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label
              className="text-gray-700 tracking-wide"
              htmlFor="register-phone">
              Contact Number:
            </label>
            <input
              type="text"
              placeholder="Enter your contact number..."
              value={phone}
              onChange={changePhone}
              className="px-3 py-2 bg-gray-100 rounded ring-1 ring-slate-300 outline-none hover:ring-blue-400 focus:ring-2 focus:ring-blue-400 transition-shadow text-gray-700"
              id="register-phone"
            />
            <span className="text-red-600 text-sm tracking-wide">
              {phoneError}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label
              className="text-gray-700 tracking-wide"
              htmlFor="login-email">
              Email:
            </label>
            <input
              type="text"
              placeholder="Enter your email..."
              value={email}
              onChange={changeEmail}
              className="px-3 py-2 bg-gray-100 rounded ring-1 ring-slate-300 outline-none hover:ring-blue-400 focus:ring-2 focus:ring-blue-400 transition-shadow text-gray-700"
              id="login-email"
            />
            <span className="text-red-600 text-sm tracking-wide">
              {emailError}
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label
              htmlFor="login-password"
              className="text-gray-700 tracking-wide">
              Password:
            </label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={changePassword}
              placeholder="Enter your password..."
              className="px-3 py-2 bg-gray-100 rounded ring-1 ring-slate-300 outline-none hover:ring-blue-400 focus:ring-2 focus:ring-blue-400 transition-shadow text-gray-700"
            />
            <span className="text-red-600 text-sm tracking-wide">
              {passwordError}
            </span>
          </div>

          <button
            type="submit"
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-indigo-500/85 active:bg-blue-600 w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
