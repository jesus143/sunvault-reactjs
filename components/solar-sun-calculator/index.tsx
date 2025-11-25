import React, { useMemo, useState, useEffect } from "react";

// --- PERSISTENCE SETUP ---
// Keys we want to save and load from localStorage
const PERSISTED_KEYS = [
  'panelVolt',
  'panelWatt',
  'sunPercent',
  'batteryVolt',
  'batteryAh',
  'inverterRatingW',
  'loadWatts',
  'panelCount',
  'mpptCurrentA',
  'mpptEfficiency',
  'panelDerate',
  'peakSunHours',
  'batteryEfficiency',
  'batteryDoD',
  'inverterEfficiency',
  'safetyMargin',
] as const; 

type InputKey = (typeof PERSISTED_KEYS)[number];
type NumericInputs = Omit<Inputs, 'sunPercent'>;

// Type used for component state (all fields are strings to allow empty input, except the number slider)
type InputState = {
  [K in keyof NumericInputs]: string;
} & { sunPercent: number };

// Type used for calculations (all fields are numbers)
type Inputs = {
  sunPercent: number; 
  panelWatt: number; 
  panelVolt: number; 
  panelCount: number; 
  mpptCurrentA: number; 
  mpptEfficiency: number; 
  panelDerate: number; 
  peakSunHours: number; 
  batteryVolt: number; 
  batteryAh: number; 
  batteryEfficiency: number; 
  batteryDoD: number; 
  inverterEfficiency: number; 
  inverterRatingW: number; 
  loadWatts: number; 
  safetyMargin: number; 
};

// Define initial default values
const DEFAULT_INPUTS: Inputs = {
  sunPercent: 60,
  panelWatt: 400,
  panelVolt: 36,
  panelCount: 5,
  mpptCurrentA: 15,
  mpptEfficiency: 0.97,
  panelDerate: 0.85,
  peakSunHours: 5,
  batteryVolt: 48,
  batteryAh: 100,
  batteryEfficiency: 0.9,
  batteryDoD: 0.8,
  inverterEfficiency: 0.9,
  inverterRatingW: 2000,
  loadWatts: 150,
  safetyMargin: 1.1,
};

// Converts the numeric Inputs object to a string-based InputState for input fields
const convertInputsToState = (inputs: Inputs): InputState => {
  const state: Partial<InputState> = {};
  for (const key in inputs) {
    if (key === 'sunPercent') {
      (state as any)[key] = inputs[key as keyof Inputs];
    } else {
      (state as any)[key] = String(inputs[key as keyof Inputs]);
    }
  }
  return state as InputState;
};

// Converts the string-based InputState back to numeric Inputs for calculations
const convertStateToInputs = (state: InputState): Inputs => {
  const inputs: Partial<Inputs> = {};
  for (const key in state) {
    if (key === 'sunPercent') {
      (inputs as any)[key] = state[key as keyof InputState];
    } else {
      // Safely convert string to number, treating empty/invalid string as 0
      const numVal = Number((state as any)[key]);
      (inputs as any)[key] = isNaN(numVal) ? 0 : numVal;
    }
  }
  return inputs as Inputs;
};

// Function to load state from localStorage, safe for SSR
const loadStateFromLocalStorage = (defaultState: Inputs): InputState => {
  try {
    // Check if localStorage is available (i.e., we are on the client)
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedState = localStorage.getItem("solarSimulatorInputs");
        if (savedState) {
            const parsed = JSON.parse(savedState);
            const loadedState = convertInputsToState(defaultState);

            PERSISTED_KEYS.forEach(key => {
                if (parsed[key] !== undefined && parsed[key] !== null) {
                    (loadedState as any)[key] = key === 'sunPercent' 
                        ? Number(parsed[key]) 
                        : String(parsed[key]);
                }
            });
            return loadedState;
        }
    }
  } catch (e) {
    console.error("Failed to load state from local storage:", e);
  }
  
  // If no saved state or running on the server, return the default state
  return convertInputsToState(defaultState);
};


export default function SolarSunCalculator() {
  
  // Initialize state safely with defaults for SSR
  const [inputState, setInputState] = useState<InputState>(convertInputsToState(DEFAULT_INPUTS));
  const [hasLoaded, setHasLoaded] = useState(false); // Tracks client-side load completion

  // Convert string state to numeric inputs for use in useMemo
  const inputs = useMemo(() => convertStateToInputs(inputState), [inputState]);

  // --- LOCAL STORAGE LOAD EFFECT (Runs ONLY ONCE after mount) ---
  useEffect(() => {
    // This code ONLY runs in the browser.
    const initialState = loadStateFromLocalStorage(DEFAULT_INPUTS);
    setInputState(initialState);
    setHasLoaded(true); // Data is now loaded from client storage
  }, []); 

  // --- LOCAL STORAGE SAVE EFFECT (Runs after load and every state change) ---
  useEffect(() => {
    // Only save if we have finished loading the initial state from localStorage
    if (hasLoaded) { 
        // Use Record type to satisfy TypeScript
        const stateToSave: Record<InputKey, string | number> = {} as Record<InputKey, string | number>;
        
        PERSISTED_KEYS.forEach(key => {
            stateToSave[key] = inputState[key as InputKey];
        });

        localStorage.setItem("solarSimulatorInputs", JSON.stringify(stateToSave));
    }
  }, [inputState, hasLoaded]);
  // ----------------------------

  function update(key: InputKey, value: string | number) {
    if (key === 'sunPercent' && typeof value === 'number') {
        setInputState((s) => ({ ...s, [key]: value }));
    } else if (typeof value === 'string') {
        setInputState((s) => ({ ...s, [key]: value }));
    }
  }

  // Derived/calculated results
  const results = useMemo(() => {
    const {
      sunPercent,
      panelWatt,
      panelDerate,
      mpptEfficiency,
      peakSunHours,
      inverterEfficiency,
      loadWatts,
      batteryVolt,
      batteryAh,
      batteryEfficiency,
      batteryDoD,
      mpptCurrentA,
      panelVolt,
      inverterRatingW,
      safetyMargin,
      panelCount, 
    } = inputs;

    // --- PER PANEL CALCULATIONS ---
    const panelInstantW_per = (panelWatt * (sunPercent / 100)) || 0;
    const panelAfterDerate_per = panelInstantW_per * panelDerate;
    const panelAfterMppt_per = panelAfterDerate_per * mpptEfficiency;
    const acAvailablePerPanel = panelAfterMppt_per * inverterEfficiency;

    // --- ARRAY (TOTAL SYSTEM) CALCULATIONS ---
    const totalAcAvailableInstant = acAvailablePerPanel * panelCount;
    const totalEnergyWhPerDay = acAvailablePerPanel * peakSunHours * panelCount;

    // Load daily requirement
    const loadDailyWh = loadWatts * 24;

    // Combined efficiency for panel -> AC
    const combinedEff = panelDerate * mpptEfficiency * inverterEfficiency;

    // Required panel array power to run load 24/7 (W)
    const requiredPanelPowerFor24h =
      (loadDailyWh * safetyMargin) / (peakSunHours * combinedEff || 1);

    // Battery energy available (usable Wh)
    const batteryTotalWh = batteryVolt * batteryAh;
    const batteryUsableWh = batteryTotalWh * batteryDoD * batteryEfficiency;

    // Hours a load can run from battery alone (no sun)
    const hoursFromBattery = batteryUsableWh / (loadWatts || 1);

    // Can inverter handle the load?
    const inverterCanHandle = inverterRatingW >= loadWatts;

    // Estimate low battery or trip
    const hoursUntilDepletion_noSun = hoursFromBattery;

    // Provide recommended battery Ah for 24h autonomy of current load
    const recommendedBatteryWhFor24h = loadWatts * 24 * safetyMargin;
    const recommendedBatteryAh48v = recommendedBatteryWhFor24h / batteryVolt / batteryDoD;

    // Recommended panel count to support 24/7 for current load
    const recommendedPanelCountFor24h = Math.ceil(requiredPanelPowerFor24h / (panelWatt || 1));

    // Minimum MPPT current required to handle panel DC current at rated power (approx)
    const panelRatedCurrent = panelWatt / (panelVolt || 1);
    const mpptOkForOnePanel = mpptCurrentA >= panelRatedCurrent;

    // --- STATUS FLAGS ---
    const arraySufficientInstant = totalAcAvailableInstant >= loadWatts;
    const arraySufficientDaily = totalEnergyWhPerDay >= loadDailyWh * safetyMargin;
    const canBeContinuous = arraySufficientDaily && inverterCanHandle;


    return {
      panelInstantW_per,
      panelAfterDerate_per,
      panelAfterMppt_per,
      acAvailablePerPanel,
      totalAcAvailableInstant,
      totalEnergyWhPerDay,
      loadDailyWh,
      requiredPanelPowerFor24h,
      batteryTotalWh,
      batteryUsableWh,
      hoursFromBattery,
      inverterCanHandle,
      hoursUntilDepletion_noSun,
      recommendedBatteryAh48v,
      recommendedPanelCountFor24h,
      panelRatedCurrent,
      mpptOkForOnePanel,
      canBeContinuous,
      arraySufficientInstant,
      arraySufficientDaily,
    };
  }, [inputs]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Solar + Battery Simulator (React + TypeScript)</h1>
      <p className="text-sm text-gray-600 mb-6">Interactive — change any input and see realtime results. <span className="font-semibold text-green-700">Inputs are now saved automatically! 💾</span></p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Inputs column */}
        <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold">Solar & MPPT</h2>

          <label className="block text-xs">Sun %: {inputState.sunPercent}% (Default: {DEFAULT_INPUTS.sunPercent}%)</label>
          <input
            type="range"
            min={0}
            max={100}
            value={inputState.sunPercent}
            onChange={(e) => update("sunPercent", Number(e.target.value))}
            className="w-full"
          />

          <label className="block text-xs">Panel rated watt (W) (Default: {DEFAULT_INPUTS.panelWatt})</label>
          <input
            type="number"
            value={inputState.panelWatt}
            onChange={(e) => update("panelWatt", e.target.value)}
            className="w-full p-2 border rounded"
          />
          
          <label className="block text-xs">Total Panel Quantity (Default: {DEFAULT_INPUTS.panelCount})</label>
          <input 
            type="number"
            value={inputState.panelCount}
            onChange={(e) => update("panelCount", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Panel voltage (V) (Default: {DEFAULT_INPUTS.panelVolt})</label>
          <input
            type="number"
            value={inputState.panelVolt}
            onChange={(e) => update("panelVolt", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Panel derate (soiling,mismatch) (0-1) (Default: {DEFAULT_INPUTS.panelDerate})</label>
          <input
            type="number"
            step="0.01"
            value={inputState.panelDerate}
            onChange={(e) => update("panelDerate", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Peak sun hours (hrs/day) (Default: {DEFAULT_INPUTS.peakSunHours})</label>
          <input
            type="number"
            step="0.1"
            value={inputState.peakSunHours}
            onChange={(e) => update("peakSunHours", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">MPPT current (A) (Default: {DEFAULT_INPUTS.mpptCurrentA})</label>
          <input
            type="number"
            value={inputState.mpptCurrentA}
            onChange={(e) => update("mpptCurrentA", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">MPPT efficiency (0-1) (Default: {DEFAULT_INPUTS.mpptEfficiency})</label>
          <input
            type="number"
            step="0.01"
            value={inputState.mpptEfficiency}
            onChange={(e) => update("mpptEfficiency", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Battery + Inverter + Load column */}
        <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold">Battery, Inverter & Load</h2>

          <label className="block text-xs">Battery voltage (V) (Default: {DEFAULT_INPUTS.batteryVolt})</label>
          <input
            type="number"
            value={inputState.batteryVolt}
            onChange={(e) => update("batteryVolt", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Battery amp-hours (Ah) (Default: {DEFAULT_INPUTS.batteryAh})</label>
          <input
            type="number"
            value={inputState.batteryAh}
            onChange={(e) => update("batteryAh", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Battery efficiency (roundtrip) (0-1) (Default: {DEFAULT_INPUTS.batteryEfficiency})</label>
          <input
            type="number"
            step="0.01"
            value={inputState.batteryEfficiency}
            onChange={(e) => update("batteryEfficiency", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Battery DoD (usable fraction) (0-1) (Default: {DEFAULT_INPUTS.batteryDoD})</label>
          <input
            type="number"
            step="0.01"
            value={inputState.batteryDoD}
            onChange={(e) => update("batteryDoD", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Inverter efficiency (0-1) (Default: {DEFAULT_INPUTS.inverterEfficiency})</label>
          <input
            type="number"
            step="0.01"
            value={inputState.inverterEfficiency}
            onChange={(e) => update("inverterEfficiency", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Inverter rating (W) (Default: {DEFAULT_INPUTS.inverterRatingW})</label>
          <input
            type="number"
            value={inputState.inverterRatingW}
            onChange={(e) => update("inverterRatingW", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Total load (W) (Default: {DEFAULT_INPUTS.loadWatts})</label>
          <input
            type="number"
            value={inputState.loadWatts}
            onChange={(e) => update("loadWatts", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Safety margin (e.g. 1.1 = 10%) (Default: {DEFAULT_INPUTS.safetyMargin})</label>
          <input
            type="number"
            step="0.01"
            value={inputState.safetyMargin}
            onChange={(e) => update("safetyMargin", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Instant & Daily Production</h3>
          <ul className="text-sm space-y-2">
            <li>**Total AC Available (Instant): {results.totalAcAvailableInstant.toFixed(0)} W**</li>
            <li>**Total Energy Production (Daily): {results.totalEnergyWhPerDay.toFixed(0)} Wh/day**</li>
            <li>Load daily need: {results.loadDailyWh.toFixed(0)} Wh/day</li>
            <li>Required panel power for 24h: {results.requiredPanelPowerFor24h.toFixed(0)} W</li>
            <li>Recommended panel count for 24/7: {results.recommendedPanelCountFor24h}</li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Battery, Current & Safety</h3>
          <ul className="text-sm space-y-2">
            <li>Battery total energy: {results.batteryTotalWh.toFixed(0)} Wh</li>
            <li>Battery usable energy: {results.batteryUsableWh.toFixed(0)} Wh</li>
            <li>Hours from battery (no sun): {results.hoursFromBattery.toFixed(2)} hrs</li>
            <li>Recommended battery Ah for 24h: {results.recommendedBatteryAh48v.toFixed(1)} Ah</li>
            <li>Panel rated current (per panel): {results.panelRatedCurrent.toFixed(2)} A</li>
            <li>MPPT current OK for one panel?: {results.mpptOkForOnePanel ? "✅" : "❌"}</li>
            <li>Inverter can handle load?: {results.inverterCanHandle ? "✅" : "❌"}</li>
          </ul>
        </div>
      </div>

      {/* Decision / warnings */}
      <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold mb-2">Decision & Status</h3>
        <div className="space-y-2 text-sm">
          <p>
            Continuous Energy Status —{' '}
            <strong>
              {results.canBeContinuous
                ? '✅ YES: Meets daily energy needs and inverter limits.'
                : '❌ NO: Adjust inputs or reduce load.'}
            </strong>
          </p>
          <p>
            Instantaneous Power Match —{' '}
            <strong>
              {results.arraySufficientInstant
                ? '✅ YES: Current sun/array power exceeds load (Instant: '
                : '❌ NO: Current sun/array power is LESS than load (Instant: '}
              {results.totalAcAvailableInstant.toFixed(0)} W vs Load: {inputs.loadWatts} W)
            </strong>
          </p>

          <p>
            Hours you can run the load from battery only (no sun):{' '}
            <strong>{results.hoursFromBattery.toFixed(2)} hrs</strong>
          </p>

          <p>
            Low-battery warning: <strong>{results.hoursUntilDepletion_noSun < 2 ? '⚠️ High risk of low battery soon' : 'OK'}</strong>
          </p>

          <p>
            Trip to mains suggestion: <strong>{results.hoursFromBattery < 1 ? 'Likely — battery empties fast' : 'Unlikely soon'}</strong>
          </p>

          <p className="text-xs text-gray-600">Note: This is an approximation. For time-of-day simulation or multiple panels, expand the model (array sizing, MPPT per string, temperature coefficients, and charge controller limits).</p>
        </div>
      </div>

      {/* Quick tips */}
      <div className="mt-6 text-sm text-gray-700 p-4 border rounded bg-white shadow-sm">
        <h4 className="font-semibold mb-2">More features you can add</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>MPPT Sizing: Refine the MPPT current check to account for multiple panels in series or parallel strings.</li>
          <li>Hourly simulation (24-hour profile) to model charge/discharge across a day.</li>
          <li>Include temperature coefficient and shading effects for more accuracy.</li>
        </ul>
      </div>
    </div>
  );
}