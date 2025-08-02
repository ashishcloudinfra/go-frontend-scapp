import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-white text-2xl font-bold flex">
          <img src="/images/logolight.png" className="h-8 w-auto mr-2" alt="Logo" /><Link to='/'>SimplifyControl</Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link to='/' className="hover:text-gray-300 scale-light">Home</Link>
          <button className="hover:text-gray-300 scale-light" onClick={() => navigate('/')}>About Us</button>
          <a href="https://merchant.razorpay.com/policy/PraXYZfh8ABOhW/contact_us" target="_blank" className="hover:text-gray-300 scale-light ">Contact Us</a>
        </div>
        
        {/* Right-side buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to='/auth/login' className="px-4 py-2 text-sm text-white border border-white rounded-lg hover:bg-white hover:text-primary transition">Login</Link>
          <Link to='/signup' className="px-4 py-2 text-sm bg-white text-primary rounded-lg scale-light">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleSidePanel} className="text-white p-2 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Side Panel */}
      <div className={`fixed top-0 right-0 h-full bg-primary text-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} w-64 z-50 transition-transform`}> 
        <div className="p-6 flex flex-col h-full">
          <button onClick={toggleSidePanel} className="self-end text-white p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="mt-6 space-y-4 ">
            <Link to='/' className="block px-4 py-2 hover:bg-primary rounded">Home</Link>
            <button className="block px-4 py-2 hover:bg-primary rounded" onClick={() => navigate('/')}>About Us</button>
            <button className="block px-4 py-2 hover:bg-primary rounded" onClick={() => navigate('/')}>Contact Us</button>
          </nav>
          <div className="mt-auto">
            <Link to='/auth/login' className="block px-4 py-2 text-center border border-white rounded-lg hover:bg-white hover:text-primary transition">Login</Link>
            <Link to='/auth/signup' className="block mt-2 px-4 py-2 text-center bg-white text-primary rounded-lg hover:bg-primary hover:text-white transition">Sign Up</Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidePanel}></div>}
    </nav>
  );
};

export default Navbar;
