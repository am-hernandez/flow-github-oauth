import { magic } from "../lib/magic";

const Login = () => {
  const handleSocialLogin = async (provider) => {
    try {
      await magic.oauth2.loginWithRedirect({
        provider,
        redirectURI: new URL("/dashboard", window.location.origin).href,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Magic + GitHub</h1>
      <button onClick={() => handleSocialLogin("github")}>
        Log in with GitHub
      </button>
    </div>
  );
};

export default Login;
