
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-university-dark text-white py-8 mt-auto">
      <div className="uni-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">UniCommunity</h3>
            <p className="text-gray-300 mb-4">
              Connecting students and faculty through a unified platform for academic resources and communication.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/portal" className="text-gray-300 hover:text-white">Student Portal</Link>
              </li>
              <li>
                <Link to="/departments" className="text-gray-300 hover:text-white">Departments</Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-white">Academic Calendar</Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-300 hover:text-white">Resources</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="not-italic text-gray-300">
              <p>University Address</p>
              <p>City, State, ZIP</p>
              <p className="mt-2">Email: info@unicommunity.edu</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {currentYear} UniCommunity. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white mr-4">Terms of Service</Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
