export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          My Stores
        </h1>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-white font-medium">
            <li className="hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
              Home
            </li>
            <li className="hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
              Products
            </li>
            <li className="hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
              About
            </li>
            <li className="hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
