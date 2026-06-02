import { useState } from "react";

const categories = [
  {
    section: "Development",
    items: [
      { icon: "💻", label: "Web Development" },
      { icon: "📱", label: "Mobile Development" },
      { icon: "📊", label: "Data Science" },
    ],
  },
  {
    section: "Business",
    items: [
      { icon: "📈", label: "Finance & Accounting" },
      { icon: "💼", label: "Entrepreneurship" },
    ],
  },
  {
    section: "Design",
    items: [
      { icon: "🎨", label: "Graphic Design" },
      { icon: "📷", label: "Photography & Video" },
      { icon: "🖌️", label: "UI/UX Design" },
    ],
  },
];

const languages = [
  "🇺🇸 English",
  "🇪🇸 Español",
  "🇵🇹 Português",
  "🇩🇪 Deutsch",
  "🇫🇷 Français",
  "🇯🇵 日本語",
];

const topics = [
  "Python",
  "Excel",
  "Web Development",
  "JavaScript",
  "Data Science",
  "AWS Certification",
  "Drawing",
  "SQL",
  "React",
  "Machine Learning",
  "ChatGPT",
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("React for beginners");
  const [showCategories, setShowCategories] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [activeTopic, setActiveTopic] = useState("Python");
  const [selectedLang, setSelectedLang] = useState("🇺🇸 English");

  return (
    <div className="font-sans w-full">
      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 h-14 flex items-center gap-2 relative z-50">
        {/* Logo */}
        <div className="flex-shrink-0 mr-1">
          <svg
            viewBox="0 0 91 34"
            className="w-24 h-8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.07 0h5.96v20.78c0 3.62-1.13 6.32-3.39 8.1C11.38 30.66 8.6 31.5 5.3 31.5 2.12 31.5 0 30.4 0 30.4l1.36-4.7s1.56.88 3.6.88c1.84 0 3.19-.47 4.04-1.42.85-.94 1.07-2.32 1.07-4.16V0z"
              fill="#a435f0"
            />
            <path
              d="M28.04 10.16h-5.72V21.8c0 1.55.23 2.65.7 3.3.47.65 1.28.98 2.44.98.82 0 1.7-.22 2.63-.65l.18 4.87c-1.37.53-2.97.8-4.79.8-2.53 0-4.44-.73-5.72-2.18-1.28-1.46-1.92-3.67-1.92-6.63V10.16H13.6V5.5h3.24V.47l5.48-1.6V5.5h5.72v4.66z"
              fill="#1c1d1f"
            />
            <path
              d="M50.08 5.5v25.5h-5.48v-3.2c-.84 1.2-1.9 2.13-3.17 2.78a8.82 8.82 0 01-4.03.95c-2.83 0-5.04-.95-6.62-2.84-1.58-1.9-2.37-4.59-2.37-8.08V5.5h5.72v14.4c0 2.07.41 3.6 1.23 4.58.82.98 2.03 1.47 3.64 1.47 1.67 0 3-.58 4-1.73 1-.15 1.5-2.65 1.5-4.82V5.5h5.58z"
              fill="#1c1d1f"
            />
            <path
              d="M73.83 18.2c0 4.05-1.08 7.22-3.25 9.5-2.17 2.28-5.11 3.43-8.84 3.43-3.72 0-6.65-1.15-8.8-3.43-2.15-2.28-3.22-5.45-3.22-9.5s1.08-7.22 3.22-9.5c2.15-2.28 5.08-3.43 8.8-3.43 3.73 0 6.67 1.15 8.84 3.43 2.17 2.28 3.25 5.45 3.25 9.5zm-5.9 0c0-2.5-.47-4.4-1.4-5.7-.94-1.3-2.32-1.95-4.14-1.95s-3.2.65-4.13 1.95c-.93 1.3-1.4 3.2-1.4 5.7s.47 4.4 1.4 5.7c.93 1.3 2.3 1.95 4.13 1.95s3.2-.65 4.14-1.95c.93-1.3 1.4-3.2 1.4-5.7z"
              fill="#1c1d1f"
            />
            <path
              d="M91 5.5l-7.1 10.24L91 31h-6.48l-4.34-7.64L75.88 31h-6.3l7.1-15.26L69.58 5.5h6.3l4.16 7.45 4.34-7.45H91z"
              fill="#1c1d1f"
            />
          </svg>
        </div>
        <div className="flex items-center gap-4 relative flex-shrink-0 ml-auto">
          <div className="w-px h-6 bg-gray-300" />
          <button
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-800 rounded text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => {
              setShowCategories(!showCategories);
              setShowLanguage(false);
            }}
          >
            ☰ Categories
          </button>
          {showCategories && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded z-50 py-2">
              {categories.map((group, gi) => (
                <div key={gi}>
                  {gi > 0 && <hr className="my-1.5 border-gray-100" />}
                  <p className="px-4 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {group.section}
                  </p>
                  {group.items.map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <span>{item.icon}</span> {item.label}
                    </a>
                  ))}
                </div>
              ))}
              <hr className="my-1.5 border-gray-100" />
              <a
                href="#"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-purple-700 font-semibold hover:bg-gray-50"
              >
                ··· Browse all categories
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
