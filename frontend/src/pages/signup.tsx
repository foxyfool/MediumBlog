import { Quote } from "../components/quote";
import { Auth } from "../components/auth";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 font-title items-center text-3xl ">
      <div>
        <Auth type="signup" />
      </div>

      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
