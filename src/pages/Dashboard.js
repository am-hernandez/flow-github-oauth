import { useEffect, useState } from "react";
import { magic } from "../lib/magic";
import { useLocation, useNavigate } from "react-router-dom";
import { sendTransaction } from "../lib/sendTransaction";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [ oauthReturnData, setOauthReturnData ] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const finishSocialLogin = async () => {
    try {
      const result = await magic.oauth2.getRedirectResult();
      const useInfo = await magic.user.getInfo();
      setOauthReturnData(result);
      setUser(useInfo);
      console.log("result:::", result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTransaction = async () => {
    console.clear();
    await sendTransaction();
  };
  
  const logout = async () => {
    try {
      await magic.user.logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    user && console.log("User:", user);

    const queryString = location.search;
    console.log("Query String:", queryString, queryString ? true : false);

    queryString && finishSocialLogin();
  }, [location, user]);

  useEffect(() => {
    !user && magic.user.isLoggedIn().then(() => {
      magic.user.getInfo().then(userInfo => setUser(userInfo));
    });
  }, [user]);


  return (
    <div className="container">
      {!user && <div className="loading">Loading...</div>}

      {user && (
        <>
          <div>
            {user && <h1>{user.publicAddress}</h1>}
            <h1>Data returned:</h1>
            <pre className="user-info">{JSON.stringify(oauthReturnData || user, null, 3)}</pre>
          </div>

          <button className="logout-button" onClick={handleSendTransaction}>
          Send Trx
          </button>
        </>
      )}
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
