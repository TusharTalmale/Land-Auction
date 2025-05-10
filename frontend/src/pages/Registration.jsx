import { RegOrg } from "../components/RegOrg";
import {useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import util from "../styles/util"
import { UserContext } from "../contexts/UserContext";


const FORM_STYLE = `flex flex-col justify-center items-center px-8`;
const FORM_ELEMENT_SYLE = `font-myPtext text-lg w-full`;
const H1 = `font-myHtext font-bold text-2xl items-center p-4 mt-8 `;

export const Registration = () => {
  const{setCurrentUser}=useContext(UserContext)
  const history=useHistory()
  const [badCred,setBadCred]=useState(false)
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    pass1: "",
    pass2: "",
    role: "private",
  });

  const setOrgData = (data) => {
    setUserData({ ...userData, ...data });
  };

  const noMatch = () => {
    return (
      !userData.pass2 || !userData.pass1 || userData.pass1 !== userData.pass2
    ); 
  };
  const noMatch2 = () => {
    return userData.pass2.length > 1 && noMatch();
  };


  const handleEmail=(e) => {
    setUserData((prev) => ({ ...prev, email: e.target.value }));
    setBadCred(false)
    }
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!noMatch()) {
      let u = userData;
      let newUser = {
        username: u.userName,
        email: u.email,
        password: u.pass2,
        role: u.role,
        orgName: u.orgName,
        orgNr: u.orgNr,
      };

    try {
      let res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });      
      res = await res.json();
      
      let newUserLogin = {
        email:newUser.email,
        password:newUser.password,
      };

      try {
        let res =await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserLogin),
      })
      res=await res.json()
      setCurrentUser(res)
        
      } catch (error) {
        console.log(error);        
      }

    history.goBack()
    } catch (error) {
      console.log("probably email is already taken",error);
      setBadCred(true)
        }  
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <form 
          className="bg-white shadow-xl rounded-lg px-8 pt-8 pb-6 mb-4 border border-gray-100"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Register New Account
          </h1>
          
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              type="username"
              placeholder="Your Name"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, userName: e.target.value }));
              }}
              required
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              type="email"
              placeholder="your.email@example.com"
              onChange={handleEmail}
              required
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              type="password"
              placeholder="••••••••"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, pass1: e.target.value }));
              }}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              type="password"
              placeholder="••••••••"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, pass2: e.target.value }));
              }}
              required
            />
            {noMatch2() ? (
              <p className="text-red-500 text-xs font-medium text-center mt-2 animate-pulse">
                ⚠️ Passwords don't match
              </p>
            ) : (
              <p className="invisible text-xs italic text-center mt-2">""</p>
            )}
            {badCred && (
              <p className="text-red-500 text-xs font-medium text-center mt-2 animate-pulse">
                ⚠️ Bad Credentials
              </p>
            )}
          </div>
  
          <div className="mb-7">
            <label className="block text-gray-700 text-sm font-semibold mb-3">
              Account Type
            </label>
            <div className="flex flex-wrap content-center">
              <RegOrg callback={setOrgData} />
            </div>
          </div>
  
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </div>
  
         
        </form>
      </div>
    </div>
  );
};
