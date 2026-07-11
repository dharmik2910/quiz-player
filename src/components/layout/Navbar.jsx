import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Trophy, Volume2, VolumeX } from 'lucide-react';
import soundManager from '../../utils/soundManager';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load mute preference on mount
    const savedMuteState = localStorage.getItem('soundMuted');
    if (savedMuteState !== null) {
      const muted = JSON.parse(savedMuteState);
      setIsMuted(muted);
      soundManager.setMute(muted);
    }
  }, []);

  const handleSoundToggle = () => {
    const newMuteState = soundManager.toggleMute();
    setIsMuted(newMuteState);
    localStorage.setItem('soundMuted', JSON.stringify(newMuteState));

    if (!newMuteState) {
      soundManager.play('click');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <BookOpen className="text-blue-600 text-2xl group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-gray-900">
              Quiz Player
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              title={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? (
                <VolumeX className="text-gray-600" size={20} />
              ) : (
                <Volume2 className="text-blue-600" size={20} />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="text-gray-600" size={24} />
            ) : (
              <Menu className="text-gray-600" size={24} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} className="text-blue-600" />
              )}

              <span className="font-medium">
                {isMuted ? 'Sound Off' : 'Sound On'}
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;