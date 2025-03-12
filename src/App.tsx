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
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Minha Lista</h1>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  setCurrentView('list');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${currentView === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <ShoppingCart size={20} />
                Lista de Compras
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${currentView === 'dashboard' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <BarChart size={20} />
                Dashboard
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="lg:pl-64 min-h-screen">
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

export default App;