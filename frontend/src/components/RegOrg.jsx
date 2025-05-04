import { useState } from "react";

const INPUT_STYLE = `w-full px-2 py-2 mb-8 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out `;


export const RegOrg = ({callback}) => {
  const [isPrivate, isSetPrivate] = useState(false);
  
const handleOrgName=(e)=>{
    callback({ orgName: e.target.value});
}

const handleOrgNr = (e) => {
  callback({ orgNr: e.target.value });
};

  const toggleState = (e) => {
    isSetPrivate(!isPrivate);
    callback({role:e.target.name});
    
  };
  return (
    <>
      <div className="flex justify-evenly w-full px-16 mt-8 my-8">
        <div className="px-2 flex content-start">
          <div>Personal </div>
          <div className="px-2 flex content-justify">
            <input
              type="radio"
              name="private"
              checked={!isPrivate}
              onChange={toggleState}
              />
          </div>
        </div>
        <div className="px-2 flex content-justify">
          <div>Organization </div>
          <div className="px-2 flex content-justify">
            <input
              type="radio"
              name="organization"
              checked={isPrivate}
              onChange={toggleState}
              />
          </div>
        </div>
      </div>
      {isPrivate && (
    <>
      <div className={`w-full`}>
        <label>Organization name </label>
        <input
          className={INPUT_STYLE}
          type="org-name"
          placeholder="Organization name"
          onChange={handleOrgName}
          required
        ></input>
      </div>
      <div className={`w-full`}>
        <label>Organization number </label>
        <input
          className={INPUT_STYLE}
          type="org-nr"
          placeholder="Organization number"
          onChange={handleOrgNr}
          required
        ></input>
      </div>
    </>
  )}
    </>
  );
};