import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// Keep MUI Icons, they are handy
import { School, Groups, Code, Security, Storage } from "@mui/icons-material";

// *** Import your group photo ***
// Make sure the path is correct relative to this file
// If the image is in the public folder, use src="/path/in/public/folder/group-photo.jpg" directly
import groupPhoto from '../images/auction.jpg'; // Adjust path as needed

export default function AboutPage() {
  const history = useHistory();

  useEffect(() => {
    document.title = "About | LAWA";
  }, []);

  // Helper data for team members (easier to map)
  const teamMembers = [
    { name: "Tushar Talmale", initials: "TT", color: "bg-blue-500" },
    { name: "Sanskruti Rathi", initials: "SR", color: "bg-pink-500" },
    { name: "Ankita Pawar", initials: "AP", color: "bg-purple-500" },
    { name: "Vishal Singh", initials: "VS", color: "bg-green-500" },
  ];

  // Helper data for project purpose
  const projectPurposes = [
    { Icon: Security, title: "Secure Transactions", text: "Implemented JWT and Spring Security to ensure safe and authenticated land auction transactions.", iconColor: "text-indigo-500" },
    { Icon: Storage, title: "Efficient Data Management", text: "Utilized SQLite database for reliable data storage and management of auction listings and user data.", iconColor: "text-green-500" },
    { Icon: Code, title: "Modern Web Technologies", text: "Combined React.js with Material UI and Tailwind CSS to create a responsive and user-friendly interface.", iconColor: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 " style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('src/images/createback.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}
    >
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header Section */}
        <header className="text-center  bg-gray-800 text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text while text-slate-900 mb-4">
            About LAWA
          </h1>
          <p className="text-lg sm:text-xl text while text-slate-600"  >
            Learn more about the Land Auction Web Application, a final year project by Group 7 from the Government College of Engineering, Yavatmal.
          </p>
        </header>

        {/* Project & Team Section */}
        <section className="bg-gray-800 text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Column 1: Project Details & Team Info */}
            <div className="space-y-8">
              {/* Project Details */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center">
                  <Code className="w-6 h-6 mr-2 text-indigo-600" /> Project Details
                </h2>
                <div className="space-y-4 text-slate-700">
                  <p><strong className="font-semibold text-slate-800">LAWA:</strong> A full-stack web application for land auctions featuring secure authentication and real-time bidding.</p>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Frontend Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React.js", "Redux Toolkit", "Axios", "Tailwind CSS", "Material UI"].map(tech => (
                        <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Backend Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Spring Boot", "JWT", "Spring Security", "SQLite"].map(tech => (
                        <span key={tech} className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className=" border-slate-200" />

              {/* Team Info */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center">
                   <Groups className="w-6 h-6 mr-2 text-teal-600" /> Team Information
                </h2>
                <div className="space-y-4 text-slate-700">
                   <div className="flex items-center space-x-2">
                       <School className="w-5 h-5 text-slate-500"/>
                       <p><strong className="font-semibold text-slate-800">Institution:</strong> Government College of Engineering, Yavatmal</p>
                   </div>
                    <p><strong className="font-semibold text-slate-800">Project Guide:</strong> Prof. Gawarle Mam</p>
                   <div>
                       <h3 className="font-semibold text-slate-800 mb-3">Team Members:</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {teamMembers.map(member => (
                               <div key={member.name} className="bg-slate-100 p-3 rounded-lg flex items-center space-x-3 shadow-sm">
                                   <div className={`w-9 h-9 rounded-full ${member.color} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                                       {member.initials}
                                   </div>
                                   <span className="text-sm font-medium text-slate-800">{member.name}</span>
                               </div>
                           ))}
                       </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Column 2: Group Photo */}
            <div className="mt-8 md:mt-0">
               <h2 className="text-2xl font-bold text-slate-900 mb-5 text-center md:text-left">
                 Meet the Team
               </h2>
               <div className="rounded-lg overflow-hidden shadow-xl aspect-w-4 aspect-h-3">
                 {/* Use aspect ratio classes if you want a fixed ratio, otherwise adjust */}
                 <img
                   src={groupPhoto}
                   alt="Group 7 Team Photo"
                   className="object-cover w-full h-full" // object-cover ensures the image covers the area without distortion
                 />
               </div>
               {/* Optional caption for the photo */}
               <p className="text-center text-sm text-slate-500 mt-3">Group 7 - Final Year Project</p>
            </div>

          </div>
        </section>

        {/* Project Purpose Section */}
        <section className="bg-gray-800 text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg">
           <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
             Project Purpose
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             {projectPurposes.map(purpose => (
               <div key={purpose.title} className="flex flex-col items-center space-y-3">
                 <div className={`bg-gray-800 p-3 rounded-full shadow-md ${purpose.iconColor}`}>
                   <purpose.Icon style={{ fontSize: '2rem' }} /> {/* Adjust icon size if needed */}
                 </div>
                 <h3 className="text-xl font-semibold text-slate-800">{purpose.title}</h3>
                 <p className="text-slate-600 text-base">{purpose.text}</p>
               </div>
             ))}
           </div>
         </section>


        {/* Back Button Section */}
        <footer className="text-center">
          <button
            onClick={() => history.goBack()}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Back to Home
          </button>
        </footer>

      </div>
    </div>
  );
}