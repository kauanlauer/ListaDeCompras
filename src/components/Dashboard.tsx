import React from 'react';
import { BarChart2, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const items = JSON.parse(localStorage.getItem('shoppingList') || '[]');
  
  const totalItems = items.length;
  const itemsInCart = items.filter((item: any) => item.inCart).length;
  const pendingItems = totalItems - itemsInCart;
  
  const totalSpent = items
    .filter((item: any) => item.inCart && item.price && item.quantity)
    .reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  const averageItemPrice = items
    .filter((item: any) => item.price)
    .reduce((sum: number, item: any) => sum + item.price, 0) / items.filter((item: any) => item.price).length || 0;

  const stats = [
    {
      title: "Total de Itens",
      value: totalItems,
      icon: ShoppingBag,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Itens no Carrinho",
      value: itemsInCart,
      icon: BarChart2,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Itens Pendentes",
      value: pendingItems,
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Gasto",
      value: `R$ ${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral da sua lista de compras</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalItems > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Progresso das Compras</h2>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Progresso
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {totalItems > 0 ? ((itemsInCart / totalItems) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${(itemsInCart / totalItems) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Itens no Carrinho</p>
                  <p className="text-2xl font-bold text-green-600">{itemsInCart}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Itens Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Informações Financeiras</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Gasto</p>
                  <p className="text-2xl font-bold text-green-600">R$ {totalSpent.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Preço Médio por Item</p>
                  <p className="text-2xl font-bold text-blue-600">R$ {averageItemPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}