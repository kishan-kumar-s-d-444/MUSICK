import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';

const LanguagePage = () => {
    const { lang } = useParams();
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Fetch songs on component mount or when `lang` changes
    useEffect(() => {
        axios.get(`http://localhost:5000/songs?lang=${lang}`)
            .then(response => {
                setSongs(response.data);
                if (response.data.length > 0) {
                    setCurrentSongIndex(0);
                    const newAudio = new Audio(`http://localhost:5000/public/${response.data[0].path}`);
                    setAudioElement(newAudio);
                }
            })
            .catch(error => console.error('Error fetching songs:', error));
    }, [lang]);

    const playSong = useCallback((song, index) => {
        if (audioElement) audioElement.pause();
        
        const newAudio = new Audio(`http://localhost:5000/public/${song.path}`);
        newAudio.play();
        setAudioElement(newAudio);
        setIsPlaying(true);
        setCurrentSongIndex(index);
    }, [audioElement]);
    
    const playNextSong = useCallback(() => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        playSong(songs[nextIndex], nextIndex);
    }, [currentSongIndex, songs, playSong]);

    const toggleSongPlayPause = (song, index) => {
        if (currentSongIndex === index && isPlaying) {
            audioElement.pause();
            setIsPlaying(false);
        } else {
            playSong(song, index);
        }
    };

    const togglePlayPause = () => {
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
                setIsPlaying(false);
            } else {
                audioElement.play();
                setIsPlaying(true);
            }
        }
    };

    const playPrevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        playSong(songs[prevIndex], prevIndex);
    };
    
    // element.addEventListener(event, function, useCapture);
    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
        };

        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', () => {
                setDuration(audioElement.duration);
            });
            audioElement.addEventListener('ended', playNextSong);

            return () => {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('ended', playNextSong);
            };
        }
    }, [audioElement, playNextSong]);

    const handleSeekChange = (event) => {
        const newTime = event.target.value;
        audioElement.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <div className="container">
                <div className="songList">
                    <h1>{lang.toUpperCase()} SONGS</h1>
                    <div className="songItemContainer">
                        {songs.map((song, index) => (
                            <div className="songItem" key={song._id} onClick={() => setCurrentSongIndex(index)}>
                                <img src={`http://localhost:5000/public/${song.image}`} alt="Album Cover" />
                                <span className="songName">Song {index + 1}</span>
                                <span className="songArtist"></span>
                                <span className="songlistplay">
                                    <span className="timestamp">
                                        <SongDuration path={song.path} />
                                        <i 
                                            className={`far songItemPlay fa-${currentSongIndex === index && isPlaying ? 'pause' : 'play'}-circle`} 
                                            onClick={(e) => {e.stopPropagation(); toggleSongPlayPause(song, index);}}>
                                        </i>
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {currentSongIndex !== null && songs[currentSongIndex] && (
                    <div className="detailsBox">
                        <img src={`http://localhost:5000/public/${songs[currentSongIndex].image}`} alt="Album Cover" />
                        <div className="songInfo">
                            <span id="masterSongName">{`Song ${currentSongIndex + 1}`}</span>
                            <span>
                                <span id="currentDuration">{formatTime(currentTime)}</span> / 
                                <span id="totalDuration">{formatTime(duration)}</span>
                            </span>
                        </div>
                        <input 
                            type="range" 
                            name="range" 
                            id="myProgressBar" 
                            min="0" 
                            max={duration} 
                            value={currentTime} 
                            onChange={handleSeekChange} 
                        />
                        <div className="icons">
                            <i className="fas fa-3x fa-step-backward" id="previous" onClick={playPrevSong}></i>
                            <i className={`fas fa-3x fa-${isPlaying ? 'pause' : 'play'}-circle`} id="masterPlay" onClick={togglePlayPause}></i>
                            <i className="fas fa-3x fa-step-forward" id="next" onClick={playNextSong}></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SongDuration = ({ path }) => {
    const [duration, setDuration] = useState('00:00');

    const getSongDuration = (songPath) => {
        return new Promise((resolve) => {
            const audio = new Audio(`http://localhost:5000/public/${songPath}`);
            audio.onloadedmetadata = () => {
                const durationInSeconds = audio.duration;
                const minutes = Math.floor(durationInSeconds / 60);
                const seconds = Math.floor(durationInSeconds % 60);
                const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                resolve(duration);
            };
        });
    };

    useEffect(() => {
        getSongDuration(path).then((calculatedDuration) => {
            setDuration(calculatedDuration);
        });
    }, [path]);

    return <span>{duration}</span>;
};

export default LanguagePage;
