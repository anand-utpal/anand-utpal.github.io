import { useState, useEffect } from 'react';
import { marked } from 'marked';
import * as p5 from 'p5';
import portfolioData from './data/portfolio.json';
import Sidebar from './components/Sidebar.jsx';
import Simulation from './components/Simulation.jsx';

export default function App() {
  const [chapters, setChapters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Dynamically load markdown files
    const loadChapters = async () => {
      const chapterFiles = import.meta.glob('./content/chapters/*.md', { as: 'raw' });
      const loadedChapters = await Promise.all(
        Object.keys(chapterFiles).map(async (path) => {
          const content = await chapterFiles[path]();
          const title = path.split('/').pop().replace('.md', '');
          return { title, content: marked(content) };
        })
      );
      setChapters(loadedChapters);
    };
    loadChapters();
  }, []);

  const filteredChapters = chapters.filter(ch =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPortfolio = portfolioData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        chapters={chapters}
      />
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 bg-gray-800 text-white fixed top-0 left-0 z-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search chapters or portfolio..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <section id="home" className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Educational Platform</h1>
          <p className="text-lg text-gray-700">
            Explore interactive simulations, educational content, and my portfolio.
          </p>
        </section>
        <section id="chapters" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Chapters & Books</h2>
          {filteredChapters.map((chapter, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
              <h3 className="text-2xl font-semibold mb-4">{chapter.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
            </div>
          ))}
        </section>
        <section id="portfolio" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPortfolio.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <a href={item.link} className="text-blue-500 hover:underline">View Project</a>
              </div>
            ))}
          </div>
        </section>
        <section id="simulations" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Simulations</h2>
          <Simulation />
        </section>
      </div>
    </div>
  );
}