import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = ({ movies, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'movies', 'categories'

  // Tüm kategorileri al ve tekrarları kaldır
  const allCategories = [...new Set(movies.flatMap(movie => movie.categories || []))];

  useEffect(() => {
    let result = movies;
    
    // Kategori filtreleme
    if (selectedCategories.length > 0) {
      result = result.filter(movie => 
        movie.categories?.some(cat => selectedCategories.includes(cat))
      );
    }
    
    // Arama filtreleme
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMovies(result);
  }, [movies, searchTerm, selectedCategories]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Cinema"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center z-20 px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4">
              Azerbaycan Filmləri
            </h1>
            <p className="text-xl text-gray-300">
              Ən yeni və ən yaxşı Azerbaycan filmləri burada
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Film axtar..."
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'all' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setActiveTab('movies')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'movies' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Filmlər
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'categories' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Kateqoriyalar
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedCategories.includes(category)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'categories' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allCategories.map((category) => (
            <div
              key={category}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <p className="text-gray-400">
                {movies.filter(m => m.categories?.includes(category)).length} film
              </p>
              <button
                onClick={() => {
                  setActiveTab('movies');
                  setSelectedCategories([category]);
                }}
                className="mt-4 text-red-500 hover:text-red-400 transition-colors"
              >
                Filmləri gör →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Featured Movies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                {selectedCategories.length > 0 
                  ? `Seçilmiş Kateqoriyalar: ${selectedCategories.join(', ')}` 
                  : 'Önə Çıxan Filmlər'}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredMovies.slice(0, 4).map((movie) => (
                <Link
                  key={movie._id}
                  to={`/movie/${movie._id}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <div className="relative pb-[56.25%]">
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                        <p className="text-gray-300 text-sm">{movie.year}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {movie.categories?.map((cat, index) => (
                            <span key={index} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Movies */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                Bütün Filmlər
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredMovies.map((movie) => (
                <Link
                  key={movie._id}
                  to={`/movie/${movie._id}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <div className="relative pb-[56.25%]">
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                        <p className="text-gray-300 text-sm">{movie.year}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {movie.categories?.map((cat, index) => (
                            <span key={index} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home; 