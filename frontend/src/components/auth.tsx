import { ChangeEvent, useState ,} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinInput, SignupInput } from "@foxyfool/medium-blogpost";
import axios from "axios";
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      console.log(response.data);
      const token = response.data.jwt;
      console.log(token);
      localStorage.setItem("token", token); 
      console.log(localStorage.getItem("token"));
      navigate("/blogs")
    }
    catch(e){
      console.log(e)

    }
    
  }
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="flex flex-col p-2 ">
        <Link to={"/"} className="text-gray-400 hover:text-black text-center">
          Medium
        </Link>
        <p className="text-black p-1 mb-1 text-2xl">
          {type === "signup"
            ? "Already Have An Account?"
            : "Dont Have An Account?"}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="text-black underline p-1 space-x-2"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-11/12">
        {type === "signup" && (
          <LabelInput
            label="Your Name"
            placeholder="Enter Your Name"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, name: e.target.value }));
            }}
          />
        )}
        <LabelInput
          label="Your Email"
          placeholder="Enter Your Username"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
        />
        <LabelInput
          label="Your Password"
          type="password"
          placeholder="Enter Your Password(Minimum 6)"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
        />
        <button
          onClick={sendRequest}
          className="bg-black rounded-lg text-white p-2 m-2 w-10/12 text-2xl mt-10"
        >
          {type === "signup" ? "Signup" : "Signin"}
        </button>
      </div>
    </div>
  );
};

interface LabelInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelInput({ label, placeholder, onChange, type }: LabelInputProps) {
  return (
    <div className="flex flex-col w-10/12 ">
      <label className="text-lg">{label}</label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className="p-3 m-2 rounded-lg bg-slate-300 text-xl"
        id="first_name"
        required
      />
    </div>
  );
}
