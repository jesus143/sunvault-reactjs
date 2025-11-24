"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";

// --- Types ---
interface Gadget {
  id: number;
  name: string;
  wattage: number; // Power draw in Watts (W)
  quantity: number;
}

interface NewGadgetInputs {
  name: string;
  wattage: number | ''; // Use '' to represent an empty input field
  quantity: number | '';
}

// --- Component ---
export default function SolarCalculator() {
  // --- Initialize from localStorage ---
  const storedCapacity = typeof window !== "undefined" ? localStorage.getItem("solarCapacity") : null;
  const storedGadgets = typeof window !== "undefined" ? localStorage.getItem("solarGadgets") : null;

  const [capacity, setCapacity] = useState<number>(storedCapacity ? Number(storedCapacity) : 500);
  const [gadgets, setGadgets] = useState<Gadget[]>(storedGadgets ? JSON.parse(storedGadgets) : []);
  const [newGadget, setNewGadget] = useState<NewGadgetInputs>({
    name: "",
    wattage: "",
    quantity: "",
  });

  const { name, wattage, quantity } = newGadget;

  // --- Persist changes to localStorage ---
  useEffect(() => {
    localStorage.setItem("solarCapacity", capacity.toString());
  }, [capacity]);

  useEffect(() => {
    localStorage.setItem("solarGadgets", JSON.stringify(gadgets));
  }, [gadgets]);

  // --- Calculations ---
  const totalWattage = useMemo(() => 
    gadgets.reduce((sum, g) => sum + g.wattage * g.quantity, 0)
  , [gadgets]);

  const runTime = useMemo(() => 
    totalWattage > 0 ? capacity / totalWattage : 0
  , [capacity, totalWattage]);

  // --- Input & Action Handlers ---
  const isInputValid = useMemo(() => {
    return (
      name.trim() !== "" &&
      typeof wattage === 'number' && wattage > 0 &&
      typeof quantity === 'number' && quantity >= 1
    );
  }, [name, wattage, quantity]);

  const addGadget = useCallback(() => {
    if (!isInputValid) return;
    setGadgets([
      ...gadgets,
      { id: Date.now(), name, wattage: wattage as number, quantity: quantity as number },
    ]);
    setNewGadget({ name: "", wattage: 0, quantity: 1 });
  }, [isInputValid, name, wattage, quantity, gadgets]);

  const removeGadget = useCallback((id: number) => {
    setGadgets((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewGadget((prev) => ({
      ...prev,
      [name]: type === 'number' && value !== '' ? Number(value) : value,
    }));
  };

  // --- Formatting Helpers ---
  const formatHours = (hours: number): string => {
    if (hours === 0) return "0h 0m";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  // --- Render ---
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-extrabold mb-5 text-gray-800 border-b pb-2">🔋 SolarVault Run Time Estimator</h2>

      {/* Capacity Input */}
      <div className="mb-6">
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
          Battery Capacity (Wh)
        </label>
        <input
          id="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Math.max("", Number(e.target.value)))}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          min=""
        />
      </div>

      {/* Gadget Input Form */}
      <div className="mb-6 border p-4 rounded-lg bg-gray-50">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">Add New Load</h3>
        <div className="space-y-3">
          <label> Gadget Name (e.g., Laptop, Light Bulb) </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          <label>Wattage (W)</label>
          <input
            type="number"
            name="wattage"
            value={wattage}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            min=""
          />
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            min=""
          />
        </div>

        {!isInputValid && (
          <p className="text-red-500 text-sm mt-2">
            *Please ensure name is filled, wattage is greater than 0, and quantity is at least 1.
          </p>
        )}

        <button
          onClick={addGadget}
          disabled={!isInputValid}
          className={`mt-4 w-full px-4 py-2 rounded-md font-medium transition duration-150 ${
            isInputValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-300 text-gray-100 cursor-not-allowed"
          }`}
        >
          Add Gadget
        </button>
      </div>

      {/* Gadget List */}
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-3 text-gray-800">Current Loads ({gadgets.length})</h3>
        <ul className="divide-y divide-gray-200">
          {gadgets.map((g) => {
            const totalEnergy = g.wattage * g.quantity;
            return (
              <li key={g.id} className="py-2 flex justify-between items-center text-sm">
                <div className="flex-1">
                  <p className="font-medium">{g.name}</p>
                  <p className="text-gray-500 text-xs">
                    {g.wattage}W x {g.quantity} = {formatNumber(totalEnergy)} Wh total per hour
                  </p>
                </div>
                <button
                  onClick={() => removeGadget(g.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold ml-4 p-1 rounded transition duration-150"
                  aria-label={`Remove ${g.name}`}
                >
                  Remove
                </button>
              </li>
            );
          })}
          {gadgets.length === 0 && (
            <p className="text-gray-400 italic text-center py-4">No gadgets added yet.</p>
          )}
        </ul>
      </div>

      {/* Result Summary */}
      <div className="border-t border-gray-300 pt-4 bg-yellow-50 p-4 rounded-md">
        <p className="text-lg font-bold text-gray-800">Summary</p>
        <div className="space-y-1 mt-2">
            <p>
                <span className="font-medium">Total Power Draw:</span> <span className="text-lg text-red-600 font-semibold">{formatNumber(totalWattage)} W</span>
            </p>
            <p>
                <span className="font-medium">Battery Capacity:</span> <span className="text-lg text-blue-600 font-semibold">{formatNumber(capacity)} Wh</span>
            </p>
            <div className="bg-green-100 p-2 rounded mt-3">
                <p className="font-extrabold text-xl text-green-700">
                    Estimated Run Time: {formatHours(runTime)}
                </p>
                {runTime === 0 && totalWattage > 0 && (
                    <p className="text-green-700 text-xs">
                        (Run time is effectively zero as power draw exceeds battery capacity)
                    </p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
