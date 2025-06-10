export default function Sidebar({ isOpen, toggle, chapters }) {
  return (
    <div
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed md:static transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">EduPortfolio</h2>
      <nav>
        <ul>
          <li><a href="#home" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</a></li>
          <li>
            <a href="#chapters" className="block py-2 px-4 hover:bg-gray-700 rounded">Chapters</a>
            <ul className="pl-4">
              {chapters.map((chapter, index) => (
                <li key={index}>
                  <a href={`#chapter-${index}`} className="block py-1 px-2 hover:bg-gray-600 rounded">
                    {chapter.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li><a href="#portfolio" className="block py-2 px-4 hover:bg-gray-700 rounded">Portfolio</a></li>
          <li><a href="#simulations" className="block py-2 px-4 hover:bg-gray-700 rounded">Simulations</a></li>
        </ul>
      </nav>
    </div>
  );
}
