"use client"; // Required for React state

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

    // M1
    if (orders.m1 === "Ham") {
      breads += 1;
      patties += 1;
      pommes += 1; // M1 includes 1 Pommes
    }
    if (orders.m1 === "Crispy") {
      breads += 1;
      crispyCount += 1;
      pommes += 1; // M1 includes 1 Pommes
    }

    // M2
    if (orders.m2 === "Ham") {
      breads += 1;
      patties += 2;
      pommes += 1; // M2 includes 1 Pommes
    }
    if (orders.m2 === "Crispy") {
      breads += 1;
      crispyCount += 1;
      pommes += 1; // M2 includes 1 Pommes
    }

    // Individual Selection
    breads += orders.individualHam; // Each Hamburger needs 1 Bread
    patties += orders.individualHam; // Each Hamburger needs 1 Patty
    breads += orders.individualCrispy; // Each Crispy Chicken needs 1 Bread
    crispyCount += orders.individualCrispy; // Add to crispy count
    pommes += orders.individualPommes; // Add Pommes from individual selection

    setResult({ breads, patties, crispyCount, pommes });
  };

  const resetOrders = () => {
    setOrders({ m1: "", m2: "", individualHam: 0, individualCrispy: 0, individualPommes: 0 });
    setResult(null);
    document.querySelectorAll("input[type=radio]").forEach((radio) => (radio.checked = false));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Burger Order Tracker</h1>

      <div>
        <h2>Menu 1</h2>
        <label>
          <input type="radio" name="m1" value="Ham" onChange={() => setOrders({ ...orders, m1: "Ham" })} />
          Hamburger
        </label>
        <br />
        <label>
          <input type="radio" name="m1" value="Crispy" onChange={() => setOrders({ ...orders, m1: "Crispy" })} />
          Crispy Chicken
        </label>
      </div>

      <div>
        <h2>Menu 2</h2>
        <label>
          <input type="radio" name="m2" value="Ham" onChange={() => setOrders({ ...orders, m2: "Ham" })} />
          Hamburger
        </label>
        <br />
        <label>
          <input type="radio" name="m2" value="Crispy" onChange={() => setOrders({ ...orders, m2: "Crispy" })} />
          Crispy Chicken
        </label>
      </div>

      <div>
        <h2>Individual Selection</h2>
        <div>
          <label>Hamburger: </label>
          <button onClick={() => setOrders({ ...orders, individualHam: Math.max(0, orders.individualHam - 1) })}>-</button>
          <span style={{ margin: "0 10px" }}>{orders.individualHam}</span>
          <button onClick={() => setOrders({ ...orders, individualHam: orders.individualHam + 1 })}>+</button>
        </div>
        <br />
        <div>
          <label>Crispy Chicken: </label>
          <button onClick={() => setOrders({ ...orders, individualCrispy: Math.max(0, orders.individualCrispy - 1) })}>-</button>
          <span style={{ margin: "0 10px" }}>{orders.individualCrispy}</span>
          <button onClick={() => setOrders({ ...orders, individualCrispy: orders.individualCrispy + 1 })}>+</button>
        </div>
        <br />
        <div>
          <label>Pommes: </label>
          <button onClick={() => setOrders({ ...orders, individualPommes: Math.max(0, orders.individualPommes - 1) })}>-</button>
          <span style={{ margin: "0 10px" }}>{orders.individualPommes}</span>
          <button onClick={() => setOrders({ ...orders, individualPommes: orders.individualPommes + 1 })}>+</button>
        </div>
      </div>

      <br />
      <button onClick={calculateIngredients} style={{ marginRight: "10px" }}>Submit</button>
      <button onClick={resetOrders}>Reset</button>
      <br />

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>🔥 {result.breads} Breads</h2>
          <h2>🥩 {result.patties} Patties</h2>
          {result.crispyCount > 0 && <h2>🍗 {result.crispyCount} Crispy Chickens to Fry</h2>}
          <h2>🍟 {result.pommes} Pommes</h2>
        </div>
      )}
    </div>
  );
}
