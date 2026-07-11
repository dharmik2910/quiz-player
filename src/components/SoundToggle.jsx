import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import soundManager from '../utils/soundManager';

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load mute preference from localStorage
    const savedMuteState = localStorage.getItem('soundMuted');
    if (savedMuteState !== null) {
      const muted = JSON.parse(savedMuteState);
      setIsMuted(muted);
      soundManager.setMute(muted);
    }
  }, []);

  const handleToggle = () => {
    const newMuteState = soundManager.toggleMute()  ;
    setIsMuted(newMuteState);
    localStorage.setItem('soundMuted', JSON.stringify(newMuteState));
    
    // Play click sound when unmuting
    if (!newMuteState) {
      soundManager.play('click');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
      title={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        <VolumeX size={24} className="text-gray-600" />
      ) : (
        <Volume2 size={24} className="text-blue-600" />
      )}
    </motion.button>
  );
};

export default SoundToggle;