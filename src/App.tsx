import React from 'react';
import { useState } from 'react';
import { ShoppingList } from './components/ShoppingList';
import { Dashboard } from './components/Dashboard';
import { Menu, ShoppingCart, BarChart } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'dashboard'>('list');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 right-3 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`
        fixed left-0 top-0 h-full w-56 sm:w-64 bg-white shadow-xl transform transition-transform duration-300 z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Minha Lista</h1>
          <ul className="space-y-3 sm:space-y-4">
            <li>
              <button
                onClick={() => {
                  setCurrentView('list');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base
                  ${currentView === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <ShoppingCart size={18} />
                Lista de Compras
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base
                  ${currentView === 'dashboard' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <BarChart size={18} />
                Dashboard
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="lg:pl-56 sm:lg:pl-64 min-h-screen">
        {currentView === 'list' ? <ShoppingList /> : <Dashboard />}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App