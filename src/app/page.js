"use client";

import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState({
    m1: "",
    m2: "",
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

    if (orders.m1 === "Ham") {
      breads += 1;
      patties += 1;
      pommes += 1;
    }
    if (orders.m1 === "Crispy") {
      breads += 1;
      crispyCount += 1;
      pommes += 1;
    }

    if (orders.m2 === "Ham") {
      breads += 1;
      patties += 2;
      pommes += 1;
    }
    if (orders.m2 === "Crispy") {
      breads += 1;
      crispyCount += 2;
      pommes += 1;
    }

    breads += orders.individualHam;
    patties += orders.individualHam;
    breads += orders.individualCrispy;
    crispyCount += orders.individualCrispy;
    pommes += orders.individualPommes;

    setResult({ breads, patties, crispyCount, pommes });
  };

  const resetOrders = () => {
    setOrders({ m1: "", m2: "", individualHam: 0, individualCrispy: 0, individualPommes: 0 });
    setResult(null);
    document.querySelectorAll("input[type=radio]").forEach((radio) => (radio.checked = false));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">🍔 Burger Order Tracker</h1>

        {/* Menu 1 */}
        <div>
          <h2 className="font-semibold mb-2">Menu 1</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="m1" value="Ham" onChange={() => setOrders({ ...orders, m1: "Ham" })} />
              Hamburger
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="m1" value="Crispy" onChange={() => setOrders({ ...orders, m1: "Crispy" })} />
              Crispy
            </label>
          </div>
        </div>

        {/* Menu 2 */}
        <div>
          <h2 className="font-semibold mb-2">Menu 2</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="m2" value="Ham" onChange={() => setOrders({ ...orders, m2: "Ham" })} />
              Hamburger
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="m2" value="Crispy" onChange={() => setOrders({ ...orders, m2: "Crispy" })} />
              Crispy
            </label>
          </div>
        </div>

        {/* Individual Selection */}
        <div>
          <h2 className="font-semibold mb-2">Individual</h2>

          {[
            { label: "Hamburger", key: "individualHam" },
            { label: "Crispy", key: "individualCrispy" },
            { label: "Pommes", key: "individualPommes" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between mb-2">
              <span>{item.label}</span>
              <div className="flex items-center gap-2">
                <button
                  className="bg-red-500 text-white w-8 h-8 rounded"
                  onClick={() => setOrders({ ...orders, [item.key]: Math.max(0, orders[item.key] - 1) })}
                >
                  -
                </button>
                <span>{orders[item.key]}</span>
                <button
                  className="bg-green-500 text-white w-8 h-8 rounded"
                  onClick={() => setOrders({ ...orders, [item.key]: orders[item.key] + 1 })}
                >
                  +
                </button>
              </div>
            </div>
          ))}
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
