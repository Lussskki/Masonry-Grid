import { useState } from 'react'
import './App.css'

function App() {
  const [selectedYear, setSelectedYear] = useState('All');
  // We track the index of the photo instead of just the object
  const [currentIndex, setCurrentIndex] = useState(null);

  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];

  const allPhotos = [
    { id: 1, year: '2026', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345768/scouts_gallery/xihnsdvz89yaim6uy0mq.jpg', title: 'Scouts Gallery 1' },
    { id: 2, year: '2026', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345779/scouts_gallery/bdmgyvbc4u2v84euxevu.jpg', title: 'Scouts Gallery 2' },
    { id: 3, year: '2026', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345785/scouts_gallery/hq7xlxa83oqeue2v7n5f.jpg', title: 'Scouts Gallery 3' },
    { id: 4, year: '2025', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768344314/scouts_gallery/lwlaa6otqrviplveleic.jpg', title: 'Scouts Gallery 4' },
    { id: 5, year: '2025', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345790/scouts_gallery/suwowi2cp8gsjzulots8.jpg', title: 'Scouts Gallery 5' },
    { id: 6, year: '2024', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345795/scouts_gallery/qi1gguz0ixsjy8plnhwf.jpg', title: 'Scouts Gallery 6' },
    { id: 7, year: '2024', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345799/scouts_gallery/lgdufaxatpl96ya3o7mc.jpg', title: 'Scouts Gallery 7' },
    { id: 8, year: '2024', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345804/scouts_gallery/idnuvxc76dalu7mxuwso.jpg', title: 'Scouts Gallery 8' },
    { id: 9, year: '2024', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345810/scouts_gallery/ne49f5mvrmqeqdoekqiw.jpg', title: 'Scouts Gallery 9' },
    { id: 10, year: '2024', type: 'PRODUCT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345815/scouts_gallery/sainsemc72f3ul9teb3l.jpg', title: 'Scouts Gallery 10' }
  ];

  const filteredPhotos = selectedYear === 'All' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.year === selectedYear);

  // Function to move to next photo
  const showNext = (e) => {
    e.stopPropagation(); // Prevents the lightbox from closing
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  // Function to move to previous photo
  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const selectedImg = currentIndex !== null ? filteredPhotos[currentIndex] : null;

  return (
    <div className="portfolio-app">
      <nav className="navbar">
        <div className="nav-links">
          <span>PORTFOLIO</span>
          <span>CONTACT</span>
        </div>
        <div className="nav-logo">Lukaaa</div>
      </nav>

      <main className="container">
        <header className="archive-header">
          <h1>ARCHIVE {selectedYear !== 'All' ? `(${selectedYear})` : ''}</h1>
          <div className="filter-bar">
            {years.map(year => (
              <button 
                key={year} 
                className={selectedYear === year ? 'active' : ''} 
                onClick={() => {
                  setSelectedYear(year);
                  setCurrentIndex(null); 
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </header>

        <div className="masonry-grid">
          {filteredPhotos.map((img, index) => (
            <div key={img.id} className="masonry-item" onClick={() => setCurrentIndex(index)}>
              <img src={img.url} alt={img.title} />
              <div className="item-hover-overlay">
                <div className="overlay-content">
                  <h2 className="overlay-type">{img.type}</h2>
                  <p className="overlay-year">{img.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox with Navigation Arrows */}
      {selectedImg && (
        <div className="lightbox" onClick={() => setCurrentIndex(null)}>
          <button className="close-btn" onClick={() => setCurrentIndex(null)}>&times;</button>
          
          {/* Previous Clicker */}
          <button className="nav-arrow left" onClick={showPrev}>&#10094;</button>
          
          <div className="lightbox-center" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImg.url} alt={selectedImg.title} className="lightbox-img" />
            <div className="lightbox-caption">
              <h3>{selectedImg.title}</h3>
              <p>{selectedImg.year} Portfolio</p>
            </div>
          </div>

          {/* Next Clicker */}
          <button className="nav-arrow right" onClick={showNext}>&#10095;</button>
        </div>
      )}
    </div>
  )
}

export default App