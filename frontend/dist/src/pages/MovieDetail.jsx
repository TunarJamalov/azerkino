import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const MovieDetail = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((m) => m._id === id);
  
  // Benzer filmleri bul (aynı kategoriden)
  const similarMovies = movies
    .filter(m => m._id !== id && m.categories?.some(cat => movie?.categories?.includes(cat)))
    .slice(0, 4);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Film tapılmadı</h1>
          <p className="text-gray-400">Axtardığınız film mövcud deyil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Video Player */}
      <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
        <div className="aspect-video">
          <ReactPlayer
            url={movie.youtubeUrl}
            width="100%"
            height="100%"
            controls
            playing
            className="react-player"
          />
        </div>
      </div>

      {/* Movie Info */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-400">{movie.year}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">{movie.categories?.join(', ')}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Haqqında</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Kateqoriyalar</h3>
              <p className="text-gray-400">{movie.categories?.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">İl</h3>
              <p className="text-gray-400">{movie.year}</p>
            </div>
          </div>

          {/* Film Ekibi */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
              Film Ekibi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Baş Rollarda</h3>
                <ul className="space-y-2">
                  {movie.cast?.map((actor, index) => (
                    <li key={index} className="text-gray-300">
                      {typeof actor === 'object' ? `${actor.name} (${actor.role})` : actor}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Yaradıcılar</h3>
                <ul className="space-y-2">
                  {movie.crew?.map((member, index) => (
                    <li key={index} className="text-gray-300">
                      {typeof member === 'object' ? `${member.name} (${member.role})` : member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
                Oxşar Filmlər
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {similarMovies.map((similarMovie) => (
                <Link
                  key={similarMovie._id}
                  to={`/movie/${similarMovie._id}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <div className="relative pb-[56.25%]">
                    <img
                      src={similarMovie.thumbnail}
                      alt={similarMovie.title}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-semibold text-white">{similarMovie.title}</h3>
                        <p className="text-gray-300 text-sm">{similarMovie.year}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail; 