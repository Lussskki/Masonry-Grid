import { useState } from 'react'
import './App.css'

function App() {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedImg, setSelectedImg] = useState(null);

  // Archive years from 2026 down to 2014 as seen in your screenshot
  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];

  const allPhotos = [
    { id: 1, year: '2026', type: 'PRODUCT', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800', title: 'Gourmet Burger' },
    { id: 2, year: '2026', type: 'PRODUCT', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800', title: 'Wine Selection' },
    { id: 3, year: '2026', type: 'PORTRAIT', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800', title: 'Studio Session' },
    { id: 4, year: '2025', type: 'PRODUCT', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800', title: 'Cocktail Art' },
    { id: 5, year: '2024', type: 'PRODUCT', url: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800', title: 'Italian Pasta' },
    { id: 6, year: '2026', type: 'PRODUCT', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800', title: 'Beverage Design' },
  ];

  const filteredPhotos = selectedYear === 'All' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.year === selectedYear);

  return (
    <div className="portfolio-app">
      {/* Navigation Header like your screenshot */}
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
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </header>

        {/* Masonry Grid with Hover Theme Overlay */}
        <div className="masonry-grid">
          {filteredPhotos.map((img) => (
            <div key={img.id} className="masonry-item" onClick={() => setSelectedImg(img)}>
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

      {/* Lightbox / Full-screen View */}
      {selectedImg && (
        <div className="lightbox" onClick={() => setSelectedImg(null)}>
          <button className="close-btn">&times;</button>
          <img src={selectedImg.url} alt={selectedImg.title} className="lightbox-img" />
          <div className="lightbox-caption">
            <h3>{selectedImg.title}</h3>
            <p>{selectedImg.year} Portfolio</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App