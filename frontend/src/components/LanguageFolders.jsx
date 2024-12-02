import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LanguageFolders.css';
function LanguageFolders() {
    const languages = [
        { name: 'Kannada', image: '/images/lan_img/kan.avif' },
        { name: 'English', image: '/images/lan_img/bg.jpg' },
        { name: 'Hindi', image: '/images/lan_img/hindi.jpg' },
        { name: 'Tamil', image: '/images/lan_img/tamil.webp' },
        { name: 'Telugu', image: '/images/lan_img/telugu.jpg' },
        { name: 'Malayalam', image: '/images/lan_img/malayalam.jpg' }
    ];

    return (
        <div className="language-folders-container">
            <h2 className="upper-text">Language You Love</h2>
            <div className="language-folders">
                {languages.map((lang) => (
                    <Link 
                        key={lang.name} 
                        to={`/language/${lang.name}`} 
                        className="folder" 
                        style={{ backgroundImage: `url(${lang.image})` }}>
                        {lang.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default LanguageFolders;
