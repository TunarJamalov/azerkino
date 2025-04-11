import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hakkında */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
              Azərkino
            </h3>
            <p className="text-gray-400">
              Azərbaycan filmlərinin ən böyük platforması. Ən yeni və klassik filmlər burada.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sürətli Keçidlər</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Ana Səhifə
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-400 hover:text-white transition-colors">
                  Bütün Filmlər
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kateqoriyalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/drama" className="text-gray-400 hover:text-white transition-colors">
                  Dram
                </Link>
              </li>
              <li>
                <Link to="/category/comedy" className="text-gray-400 hover:text-white transition-colors">
                  Komediya
                </Link>
              </li>
              <li>
                <Link to="/category/action" className="text-gray-400 hover:text-white transition-colors">
                  Döyüş
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Əlaqə</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">info@azerkino.az</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">+994 12 345 67 89</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Azərkino. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 