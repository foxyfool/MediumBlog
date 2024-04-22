import { Link } from "react-router-dom";
import Banner from "../assets/pedro.mp4";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="bg-black py-6 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-gray-50 text-2xl font-bold">
            @foxyfool/Medium
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to={"/signup"} className="text-gray-400 hover:text-gray-200">
              Signup
            </Link>
            <Link to={"/signin"} className="text-gray-400 hover:text-gray-200">
              Signin
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-col overflow-hidden flex-1">
        <section className="bg-black py-20 px-4 md:px-8 flex-1">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-50">
                Elevate Your Digital Presence
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                "FoxyFool power's the digital experiences of the future with a
                cutting-edge tech stack: React, Cloudflare Workers, Zod,
                TypeScript, Prisma, Postgres, JWT and Connection Pooling."
              </p>
            </div>
            <div className="">
              <video className="w-full max-w-[1080px]" autoPlay loop muted>
                <source src={Banner} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black py-8 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center space-x-2 justify-between">
          <p className="text-gray-400 text-sm">© 2024 MediumBlog@FoxyFool</p>
        </div>
      </footer>
    </div>
  );
};
