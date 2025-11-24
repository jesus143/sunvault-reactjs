"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";

// --- Types (Unchanged) ---
interface Gadget {
  id: number;
  name: string;
  wattage: number;
  quantity: number;
  selected: boolean; 
}

interface NewGadgetInputs {
  name: string;
  wattage: number | ''; 
  quantity: number | '';
}

// --- Formatting Helpers (Unchanged) ---
const formatHours = (hours: number): string => {
  if (hours === 0) return "0h 0m";
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};


// --- Component ---
export default function SolarCalculator() {

// Optimized formatter
const formatNumber = useCallback((num: number): string => 
  new Intl.NumberFormat().format(num)
, []);

  // --- Initialization from localStorage ---
  const getInitialCapacity = () => {
    if (typeof window !== "undefined") {
      const storedCapacity = localStorage.getItem("solarCapacity");
      return storedCapacity ? Number(storedCapacity) : 500;
    }
    return 500;
  };

  const getInitialGadgets = (): Gadget[] => {
    if (typeof window !== "undefined") {
      const storedGadgets = localStorage.getItem("solarGadgets");
      if (storedGadgets) {
        // Map over parsed gadgets to ensure the 'selected' property exists for older entries
        return JSON.parse(storedGadgets).map((g: Partial<Gadget>) => ({
          ...g,
          selected: g.selected !== undefined ? g.selected : true, // Default to true if missing
        })) as Gadget[];
      }
    }
    return [];
  };

  const [capacity, setCapacity] = useState(getInitialCapacity);
  const [gadgets, setGadgets] = useState<Gadget[]>(getInitialGadgets);
  const [newGadget, setNewGadget] = useState<NewGadgetInputs>({
    name: "",
    wattage: 0,
    quantity: 1,
  });

  const { name, wattage, quantity } = newGadget;

  // --- Persist changes to localStorage (Unchanged) ---
  useEffect(() => {
    localStorage.setItem("solarCapacity", capacity.toString());
  }, [capacity]);

  useEffect(() => {
    localStorage.setItem("solarGadgets", JSON.stringify(gadgets));
  }, [gadgets]);

  // --- Calculations (Unchanged) ---
  const totalWattage = useMemo(() => 
    gadgets.reduce((sum, g) => g.selected ? sum + g.wattage * g.quantity : sum, 0)
  , [gadgets]);

  const runTime = useMemo(() => 
    totalWattage > 0 ? capacity / totalWattage : 0
  , [capacity, totalWattage]);

  // --- Input & Action Handlers (Unchanged) ---
  const isInputValid = useMemo(() => {
    return (
      name.trim() !== "" &&
      typeof wattage === 'number' && wattage > 0 &&
      typeof quantity === 'number' && quantity >= 1
    );
  }, [name, wattage, quantity]);

  const addGadget = useCallback(() => {
    if (!isInputValid) return;
    setGadgets((prev) => [
      ...prev,
      { id: Date.now(), name, wattage: wattage as number, quantity: quantity as number, selected: true },
    ]);
    setNewGadget({ name: "", wattage: 0, quantity: 1 });
  }, [isInputValid, name, wattage, quantity]);

  const removeGadget = useCallback((id: number) => {
    setGadgets((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addGadget();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setNewGadget((prev) => {
      let newValue: string | number = value;

      if (type === 'number') {
        newValue = value === '' ? '' : Number(value);
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleQuantityChange = useCallback((id: number, newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1;
    setGadgets((prev) =>
      prev.map((g) => (g.id === id ? { ...g, quantity: newQuantity } : g))
    );
  }, []);

  const toggleSelected = useCallback((id: number) => {
    setGadgets((prev) =>
      prev.map((g) => g.id === id ? { ...g, selected: !g.selected } : g)
    );
  }, []);

  // --- Render ---
  return (
    // UPDATED: Main container for responsiveness (max-w-4xl is ~896px)
    <div className="p-4 mx-auto max-w-4xl bg-white shadow-2xl rounded-xl">
      <h2 className="text-2xl font-extrabold mb-5 text-gray-800 border-b pb-2">🔋 SolarVault Run Time Estimator</h2>
      
      {/* Display Power-Energy-Time relationship */}
      <div className="text-center mb-4 text-xs text-gray-600 italic">
        Run Time (h) = Battery Capacity (Wh) / Total Power Draw (W)
      </div>
      

      [Image of Power Energy Time triangle formula]


      {/* UPDATED: Flex container for side-by-side layout with gap */}
      <div className="flex flex-col md:flex-row gap-6"> 

        {/* LEFT COLUMN: Inputs */}
        <div className="flex-1 space-y-4"> 
          
          {/* Capacity Input */}
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Battery Capacity (Wh)
            </label>
            <input
              id="capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="border border-gray-300 p-2 text-sm w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              min=""
            />
          </div>

          {/* Gadget Input Form */}
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg mb-3 text-gray-700">Add New Load</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="gadget-name" className="block text-sm font-medium text-gray-700 mb-1">Gadget Name</label>
                <input type="text" id="gadget-name" name="name" value={name} onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="border border-gray-300 p-2 text-sm w-full rounded-md" placeholder="Laptop, Fan, Light" />
              </div>
              <div>
                <label htmlFor="gadget-wattage" className="block text-sm font-medium text-gray-700 mb-1">Wattage (W)</label>
                <input type="number" id="gadget-wattage" name="wattage" value={wattage} onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="border border-gray-300 p-2 text-sm w-full rounded-md" min="" placeholder="e.g., 65" />
              </div>
              <div>
                <label htmlFor="gadget-quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input type="number" id="gadget-quantity" name="quantity" value={quantity} onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="border border-gray-300 p-2 text-sm w-full rounded-md" min="" placeholder="e.g., 1" />
              </div>
            </div>
            
            {!isInputValid && <p className="text-red-500 text-xs mt-2">
              *Please ensure name is filled, wattage {'>'} 0, and quantity {'\u2265'} 1.
            </p>}

            <button
              onClick={addGadget}
              disabled={!isInputValid}
              className={`mt-4 w-full px-3 py-2 text-sm rounded-md font-medium transition duration-150 ${
                isInputValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-300 text-gray-100 cursor-not-allowed"
              }`}
            >
              Add Gadget
            </button>
          </div>
        </div> 

        {/* RIGHT COLUMN: List and Summary */}
        <div className="flex-1 space-y-4"> 


          {/* Gadget List */}
          <div className="border p-4 rounded-lg bg-white shadow-inner">
            <h3 className="font-bold text-lg mb-3 text-gray-800">
              Current Loads ({
                gadgets.filter(g => g.selected === true).length
              } Selected / {gadgets.length} Total)
            </h3>
            <div className="max-h-64 overflow-y-auto"> {/* Added max height and scroll for long lists */}
              <ul className="divide-y divide-gray-200">
                {gadgets.map((g) => {
                  const totalEnergy = g.wattage * g.quantity;
                  return (
                    <li key={g.id} className={`py-2 flex justify-between items-start text-xs ${g.selected ? 'opacity-100' : 'opacity-50 italic bg-gray-50 rounded px-1'}`}>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={g.selected}
                          onChange={() => toggleSelected(g.id)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                          aria-label={`Select ${g.name}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{g.name} <span className="text-gray-400">({g.selected ? 'ON' : 'OFF'})</span></p>
                          <p className="text-gray-500 text-xs">{g.wattage}W x <span className="font-bold">{g.quantity}</span> = {formatNumber(totalEnergy)} Wh/hr</p>
                        </div>
                      </div>

                      {/* Dynamic Quantity Input */}
                      <div className="flex flex-col items-end mx-2">
                          <label htmlFor={`qty-${g.id}`} className="block text-xs font-medium text-gray-700 mb-1">Qty</label>
                          <input
                              id={`qty-${g.id}`}
                              type="number"
                              value={g.quantity}
                              onChange={(e) => handleQuantityChange(g.id, Number(e.target.value))}
                              className="w-10 text-center border border-gray-300 p-0 rounded-md text-xs"
                              min="1"
                              aria-label={`Quantity of ${g.name}`}
                          />
                      </div>
                      
                      <button onClick={() => removeGadget(g.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold p-1 rounded self-center"
                        aria-label={`Remove ${g.name}`}>
                        Remove
                      </button>
                    </li>
                  );
                })}
                {gadgets.length === 0 && <p className="text-gray-400 italic text-center py-4 text-sm">No loads added yet. Start planning!</p>}
              </ul>
            </div>
          </div>


          {/* Result Summary */}
          <div className="border-t border-gray-300 pt-4 bg-yellow-50 p-4 rounded-md shadow-md">
            <p className="text-lg font-bold text-gray-800">Summary</p>
            <div className="space-y-1 mt-2 text-sm">
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
                {runTime === 0 && totalWattage > 0 && <p className="text-green-700 text-xs">(Power draw exceeds capacity for practical run time.)</p>}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}