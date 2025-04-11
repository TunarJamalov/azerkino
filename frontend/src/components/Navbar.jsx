import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
              AzerKino
            </span>
          </Link>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
              Ana Səhifə
            </Link>
            <Link 
              to="/movies" 
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
              Filmlər
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
            >
              Kateqoriyalar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 