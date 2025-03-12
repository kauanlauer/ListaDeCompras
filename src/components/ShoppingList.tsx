import React, { useState, useEffect } from 'react';
import { Plus, ShoppingCart, Trash2, Check, X, DollarSign, Edit2 } from 'lucide-react';

interface ShoppingItem {
  id: string;
  name: string;
  price: number | null;
  quantity: number | null;
  inCart: boolean;
}

export function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      price: null,
      quantity: null,
      inCart: false,
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const toggleInCart = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, inCart: !item.inCart } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemDetails = (id: string, price: string, quantity: string) => {
    setItems(items.map(item => 
      item.id === id 
        ? { 
            ...item, 
            price: price ? parseFloat(price) : null,
            quantity: quantity ? parseInt(quantity) : null
          } 
        : item
    ));
    setEditingItem(null);
  };

  const totalInCart = items
    .filter(item => item.inCart && item.price !== null && item.quantity !== null)
    .reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

  const totalPending = items
    .filter(item => !item.inCart && item.price !== null && item.quantity !== null)
    .reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Lista de Compras</h1>
          <p className="text-sm sm:text-base text-gray-600">Adicione produtos à sua lista e atualize os preços no mercado</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <form onSubmit={addItem} className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Nome do produto"
              className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Adicionar</span>
              <span className="sm:hidden">Add</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="text-blue-500" />
              Itens Pendentes
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {items.filter(item => !item.inCart).map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
                    {item.price !== null && item.quantity !== null && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.quantity}x R$ {item.price.toFixed(2)} = R$ {(item.quantity * item.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                  {editingItem === item.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const price = (form.elements.namedItem('price') as HTMLInputElement).value;
                        const quantity = (form.elements.namedItem('quantity') as HTMLInputElement).value;
                        updateItemDetails(item.id, price, quantity);
                      }}
                      className="flex gap-1 sm:gap-2"
                    >
                      <input
                        type="number"
                        name="price"
                        placeholder="Preço"
                        defaultValue={item.price?.toString()}
                        step="0.01"
                        min="0"
                        className="w-20 sm:w-24 px-2 py-1 text-sm border rounded"
                      />
                      <input
                        type="number"
                        name="quantity"
                        placeholder="Qtd"
                        defaultValue={item.quantity?.toString()}
                        min="1"
                        className="w-14 sm:w-16 px-2 py-1 text-sm border rounded"
                      />
                      <button
                        type="submit"
                        className="p-1 sm:p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      >
                        <Check size={18} />
                      </button>
                    </form>
                  ) : (
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => setEditingItem(item.id)}
                        className="p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => toggleInCart(item.id)}
                        className="p-1 sm:p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 sm:p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-base sm:text-lg font-semibold flex items-center justify-between">
                <span>Total Pendente:</span>
                <span className="text-blue-600">R$ {totalPending.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Check className="text-green-500" />
              Itens no Carrinho
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {items.filter(item => item.inCart).map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
                    {item.price !== null && item.quantity !== null && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.quantity}x R$ {item.price.toFixed(2)} = R$ {(item.quantity * item.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                  {editingItem === item.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const price = (form.elements.namedItem('price') as HTMLInputElement).value;
                        const quantity = (form.elements.namedItem('quantity') as HTMLInputElement).value;
                        updateItemDetails(item.id, price, quantity);
                      }}
                      className="flex gap-1 sm:gap-2"
                    >
                      <input
                        type="number"
                        name="price"
                        placeholder="Preço"
                        defaultValue={item.price?.toString()}
                        step="0.01"
                        min="0"
                        className="w-20 sm:w-24 px-2 py-1 text-sm border rounded"
                      />
                      <input
                        type="number"
                        name="quantity"
                        placeholder="Qtd"
                        defaultValue={item.quantity?.toString()}
                        min="1"
                        className="w-14 sm:w-16 px-2 py-1 text-sm border rounded"
                      />
                      <button
                        type="submit"
                        className="p-1 sm:p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      >
                        <Check size={18} />
                      </button>
                    </form>
                  ) : (
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => setEditingItem(item.id)}
                        className="p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => toggleInCart(item.id)}
                        className="p-1 sm:p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X size={18} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 sm:p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-base sm:text-lg font-semibold flex items-center justify-between">
                <span>Total no Carrinho:</span>
                <span className="text-green-600">R$ {totalInCart.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <DollarSign className="text-green-500" />
              Total Geral
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              R$ {(totalInCart + totalPending).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}