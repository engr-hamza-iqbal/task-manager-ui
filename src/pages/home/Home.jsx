import { useAuth } from "../../context/AuthContext.jsx";
function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="min-h-screen bg-gray-100 text-center mt-20">
      <section>
        <span className="font-bold text-blue-600">Stay Organized</span>
        <h1 className="text-4xl mt-2 font-bold text-gray-900">Manage Your Tasks. Master Your Day.</h1>
        <p className="mt-2 text-lg text-gray-600">
          Organize your work, stay focused, and get more done with a simple task
          management experience.
        </p>
        <a href={isAuthenticated ? "/tasks" : "/login"} className="mt-4 inline-block rounded-xl bg-blue-600 px-12 py-3 text-md font-semibold text-white shadow hover:bg-blue-700">{ isAuthenticated ? "Your Tasks" : "Get Started"}</a>
      </section>
    </main>
  );
}

export default Home;
