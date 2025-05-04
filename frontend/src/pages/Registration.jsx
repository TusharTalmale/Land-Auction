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
    <div>
      <form className={FORM_STYLE} onSubmit={handleFormSubmit}>
        <div className={H1}>Register new account</div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Username </label>
          <input
            className={util.input}
            type="username"
            placeholder="Your username"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, userName: e.target.value }));
            }}
            required
          ></input>
        </div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Email </label>
          <input
            className={util.input}
            type="email"
            placeholder="Your email address"
            onChange={handleEmail}
            required
          ></input>
        </div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Password</label>
          <input
            className={util.input}
            type="password"
            placeholder="Your Password"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, pass1: e.target.value }));
            }}
            required
          ></input>
        </div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Confirm Password</label>
          <input
            className={util.input}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, pass2: e.target.value }));
            }}
            required
          ></input>
          {
            //Temp css
            noMatch2() ? (
              <div style={{ color: "red", textAlign: "center" }}>
                Passwords don't match
              </div>
            ) : (
              <div style={{ color: "transparent" }}>""</div>
            )
          }
          {//Temp css
          badCred&&<div style={{textAlign:"center" ,color:"red"}}>Bad Credentials</div>}
        </div>

        <div className={FORM_ELEMENT_SYLE}>
          <label>Account type </label>
          <div className="flex flex-wrap content-center">
            <RegOrg callback={setOrgData} />
          </div>
        </div>

        <div className="flex justify-center items-center pb-8">
          <button type="submit" className={util.btn + util.btnGreen}>
            Create Account
          </button>
        </div>
        <div className="min-h-200">&nbsp;</div>
      </form>
    </div>
  );
};
