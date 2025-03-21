"use client";

import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState({
    m1Ham: 0,
    m1Crispy: 0,
    m2Ham: 0,
    m2Crispy: 0,
    individualHam: 0,
    individualCrispy: 0,
    individualPommes: 0,
  });
  const [result, setResult] = useState(null);

  const calculateIngredients = () => {
    let breads = 0;
    let patties = 0;
    let crispyCount = 0;
    let pommes = 0;

    // M1
    breads += orders.m1Ham + orders.m1Crispy;
    patties += orders.m1Ham;
    crispyCount += orders.m1Crispy;
    pommes += orders.m1Ham + orders.m1Crispy;

    // M2
    breads += orders.m2Ham + orders.m2Crispy;
    patties += orders.m2Ham * 2;
    crispyCount += orders.m2Crispy * 2;
    pommes += orders.m2Ham + orders.m2Crispy;

    // Individual
    breads += orders.individualHam + orders.individualCrispy;
    patties += orders.individualHam;
    crispyCount += orders.individualCrispy;
    pommes += orders.individualPommes;

    setResult({ breads, patties, crispyCount, pommes });
  };

  const resetOrders = () => {
    setOrders({
      m1Ham: 0,
      m1Crispy: 0,
      m2Ham: 0,
      m2Crispy: 0,
      individualHam: 0,
      individualCrispy: 0,
      individualPommes: 0,
    });
    setResult(null);
  };

  const renderItem = (label, key) => (
    <div className="flex items-center justify-between mb-2">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <button
          className="bg-red-500 text-white w-8 h-8 rounded"
          onClick={() => setOrders({ ...orders, [key]: Math.max(0, orders[key] - 1) })}
        >
          -
        </button>
        <span>{orders[key]}</span>
        <button
          className="bg-green-500 text-white w-8 h-8 rounded"
          onClick={() => setOrders({ ...orders, [key]: orders[key] + 1 })}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">🍔 Burger Order Tracker</h1>

        {/* Menu 1 */}
        <div>
          <h2 className="font-semibold mb-2">Menu 1</h2>
          {renderItem("Cheese Burger", "m1Ham")}
          {renderItem("Crispy", "m1Crispy")}
        </div>

        {/* Menu 2 */}
        <div>
          <h2 className="font-semibold mb-2">Menu 2</h2>
          {renderItem("Cheese Burger", "m2Ham")}
          {renderItem("Crispy", "m2Crispy")}
        </div>

        {/* Individual Selection */}
        <div>
          <h2 className="font-semibold mb-2">Individual</h2>
          {renderItem("Cheese Burger", "individualHam")}
          {renderItem("Crispy", "individualCrispy")}
          {renderItem("Pommes", "individualPommes")}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={calculateIngredients}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={resetOrders}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="text-center space-y-1 mt-4">
            <h2 className="text-lg font-semibold">🔥 {result.breads} Breads</h2>
            <h2 className="text-lg font-semibold">🥩 {result.patties} Patties</h2>
            {result.crispyCount > 0 && (
              <h2 className="text-lg font-semibold">🍗 {result.crispyCount} Crispy Chickens to Fry</h2>
            )}
            <h2 className="text-lg font-semibold">🍟 {result.pommes} Pommes</h2>
          </div>
        )}
      </div>
    </div>
  );
}
