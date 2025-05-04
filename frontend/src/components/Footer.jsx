import { 
    AcademicCapIcon,
    MailIcon,
    UserGroupIcon,
    CodeIcon,
    DatabaseIcon,
    ShieldCheckIcon,
    LinkIcon
  } from "@heroicons/react/solid";
  
  export default function Footer() {
    // Team data
    const teamMembers = [
      { name: "Tushar Talmale", role: "Full Stack Developer" },
      { name: "Sanskruti Rathi", role: "" },
      { name: "Ankita Pawar", role: "" },
      { name: "Vishal Singh", role: "" }
    ];
  
    // Quick links
    const quickLinks = [
      { name: "Create", path: "/create" },
      { name: "Buying", path: "/buying" },
      { name: "Selling", path: "/selling" },
      { name: "Messages", path: "/messages" },
      { name: "About", path: "/about" }
    ];
  
    // Icon component with consistent sizing
    const Icon = ({ icon: IconComponent, className = "" }) => (
      <IconComponent className={`h-5 w-5 ${className}`} />
    );
  
    return (
      <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Project Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center">
                <span className="bg-white text-indigo-700 rounded-lg p-1 mr-2">
                  <Icon icon={AcademicCapIcon} />
                </span>
                LAWA
              </h3>
              <p className="text-indigo-100">
                A secure land auction platform developed with modern web technologies.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b border-indigo-500 pb-2 flex items-center">
                <Icon icon={LinkIcon} className="mr-2" />
                Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.path} 
                      className="text-indigo-100 hover:text-white transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b border-indigo-500 pb-2 flex items-center">
                <Icon icon={CodeIcon} className="mr-2" />
                Technologies
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="text-indigo-300 mr-2">▹</span>
                  React.js + Redux
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-300 mr-2">▹</span>
                  Spring Boot
                </li>
                <li className="flex items-center">
                  <Icon icon={ShieldCheckIcon} className="text-indigo-300 mr-2 h-4 w-4" />
                  JWT Authentication
                </li>
                <li className="flex items-center">
                  <Icon icon={DatabaseIcon} className="text-indigo-300 mr-2 h-4 w-4" />
                  SQLite Database
                </li>
              </ul>
            </div>
  
            {/* Team Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b border-indigo-500 pb-2 flex items-center">
                <Icon icon={UserGroupIcon} className="mr-2" />
                Our Team
              </h3>
              <ul className="space-y-3">
                {teamMembers.map((member) => (
                  <li key={member.name} className="group">
                    <div className="text-indigo-100 group-hover:text-white transition-colors">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-indigo-300 group-hover:text-indigo-200">{member.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center">
                <Icon icon={MailIcon} className="text-indigo-300 mr-2" />
                <span className="text-sm text-indigo-200">Guided by Prof. Gawarle Mam</span>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-indigo-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-indigo-300">
              © {new Date().getFullYear()} LAWA - Government College of Engineering, Yavatmal
            </p>
            <p className="text-xs text-indigo-400 mt-2 md:mt-0">
              Final Year Project - Computer Engineering Department
            </p>
          </div>
        </div>
      </footer>
    );
  }