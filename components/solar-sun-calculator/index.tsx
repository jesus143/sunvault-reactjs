import React, { useMemo, useState } from "react";

// Solar Simulator Component (React + TypeScript)
// Single-file component suitable for inclusion in a React + Tailwind project.
// Features:
// - Adjustable sun percentage (slider)
// - Inputs for panel wattage & voltage
// - Inputs for MPPT current (A) and efficiency (assumed configurable)
// - Battery voltage and amp-hours
// - Inverter wattage (rating) and inverter efficiency (or voltage)
// - Total load wattage
// - Real-time interactive calculations and warnings

type Inputs = {
  sunPercent: number; // 0-100
  panelWatt: number; // per-panel rated watt
  panelVolt: number; // Vmp or nominal
  mpptCurrentA: number; // Amp rating of MPPT (charging current capability)
  mpptEfficiency: number; // 0-1
  panelDerate: number; // 0-1 (soiling, mismatch)
  peakSunHours: number; // hours/day
  batteryVolt: number; // system voltage
  batteryAh: number; // total Ah
  batteryEfficiency: number; // 0-1 (roundtrip)
  batteryDoD: number; // usable fraction 0-1
  inverterEfficiency: number; // 0-1
  inverterRatingW: number; // max continuous inverter output
  loadWatts: number; // total continuous load
  safetyMargin: number; // fraction to increase needs
};

export default function SolarSimulator() {
  const [inputs, setInputs] = useState<Inputs>({
    sunPercent: 60,
    panelWatt: 400,
    panelVolt: 36,
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
  });

  function update<K extends keyof Inputs>(key: K, raw: any) {
    const value = raw === "" ? "" : Number(raw);
    setInputs((s) => ({ ...s, [key]: value as any }));
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
    } = inputs;

    // Instantaneous panel output under current sun % (per panel)
    const panelInstantW = (panelWatt * (sunPercent / 100)) || 0;
    const panelAfterDerate = panelInstantW * panelDerate;
    const panelAfterMppt = panelAfterDerate * mpptEfficiency;
    const acAvailablePerPanel = panelAfterMppt * inverterEfficiency;

    // Daily energy from one panel (Wh/day)
    const energyPerPanelWhPerDay = acAvailablePerPanel * peakSunHours;

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

    // If sun producing right now, net instant surplus or deficit to feed load and charge
    const instantAcProduced = acAvailablePerPanel; // per panel
    // Assume user has some number of panels — we can compute based on provided panelWatt and required power suggestions.

    // Hours a load can run from battery alone (no sun)
    const hoursFromBattery = batteryUsableWh / (loadWatts || 1);

    // Can inverter handle the load?
    const inverterCanHandle = inverterRatingW >= loadWatts;

    // If panels produce enough at current sun% to directly sustain load (instantaneously)
    const panelsToSustainInstant = (loadWatts / (acAvailablePerPanel || 0)) || Infinity;

    // If the user has at least this many panels (rounded up) they'd sustain the load right now

    // Estimate low battery or trip: if battery will drain below DoD before sun returns — we provide a simple heuristic
    // We'll estimate hours until battery depletion (without sun charging)
    const hoursUntilDepletion_noSun = hoursFromBattery;

    // If panels produce less than load, there is deficit. Compute net instant deficit per panel count
    const netInstantPerPanel = acAvailablePerPanel - loadWatts; // negative if deficit per panel (assuming 1 panel)

    // Provide recommended battery Ah for 24h autonomy of current load
    const recommendedBatteryWhFor24h = loadWatts * 24 * safetyMargin;
    const recommendedBatteryAh48v = recommendedBatteryWhFor24h / batteryVolt / batteryDoD;

    // Recommended panel count to support 24/7 for current load
    const recommendedPanelCountFor24h = Math.ceil(requiredPanelPowerFor24h / (panelWatt || 1));

    // Minimum MPPT current required to handle panel DC current at rated power (approx)
    // panel current (I) = panelP / panelVolt. For the whole array we compute per-panel.
    const panelRatedCurrent = panelWatt / (panelVolt || 1);
    const mpptOkForOnePanel = mpptCurrentA >= panelRatedCurrent;

    // quick status flags
    const canBeContinuousNow = acAvailablePerPanel * recommendedPanelCountFor24h >= loadWatts && inverterCanHandle;

    return {
      panelInstantW,
      panelAfterDerate,
      panelAfterMppt,
      acAvailablePerPanel,
      energyPerPanelWhPerDay,
      loadDailyWh,
      requiredPanelPowerFor24h,
      batteryTotalWh,
      batteryUsableWh,
      hoursFromBattery,
      inverterCanHandle,
      panelsToSustainInstant,
      hoursUntilDepletion_noSun,
      recommendedBatteryAh48v,
      recommendedPanelCountFor24h,
      panelRatedCurrent,
      mpptOkForOnePanel,
      canBeContinuousNow,
    };
  }, [inputs]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Solar + Battery Simulator (React + TypeScript)</h1>
      <p className="text-sm text-gray-600 mb-6">Interactive — change any input and see realtime results.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Inputs column */}
        <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold">Solar & MPPT</h2>

          <label className="block text-xs">Sun %: {inputs.sunPercent}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={inputs.sunPercent}
            onChange={(e) => update("sunPercent", e.target.value)}
            className="w-full"
          />

          <label className="block text-xs">Panel rated watt (W)</label>
          <input
            type="number"
            value={inputs.panelWatt}
            onChange={(e) => update("panelWatt", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Panel voltage (V)</label>
          <input
            type="number"
            value={inputs.panelVolt}
            onChange={(e) => update("panelVolt", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Panel derate (soiling,mismatch) (0-1)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.panelDerate}
            onChange={(e) => update("panelDerate", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Peak sun hours (hrs/day)</label>
          <input
            type="number"
            step="0.1"
            value={inputs.peakSunHours}
            onChange={(e) => update("peakSunHours", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">MPPT current (A)</label>
          <input
            type="number"
            value={inputs.mpptCurrentA}
            onChange={(e) => update("mpptCurrentA", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">MPPT efficiency (0-1)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.mpptEfficiency}
            onChange={(e) => update("mpptEfficiency", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Battery + Inverter + Load column */}
        <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold">Battery, Inverter & Load</h2>

          <label className="block text-xs">Battery voltage (V)</label>
          <input
            type="number"
            value={inputs.batteryVolt}
            onChange={(e) => update("batteryVolt", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Battery amp-hours (Ah)</label>
          <input
            type="number"
            value={inputs.batteryAh}
            onChange={(e) => update("batteryAh", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Battery efficiency (roundtrip) (0-1)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.batteryEfficiency}
            onChange={(e) => update("batteryEfficiency", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Battery DoD (usable fraction) (0-1)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.batteryDoD}
            onChange={(e) => update("batteryDoD", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Inverter efficiency (0-1)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.inverterEfficiency}
            onChange={(e) => update("inverterEfficiency", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Inverter rating (W)</label>
          <input
            type="number"
            value={inputs.inverterRatingW}
            onChange={(e) => update("inverterRatingW", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Total load (W)</label>
          <input
            type="number"
            value={inputs.loadWatts}
            onChange={(e) => update("loadWatts", e.target.value)}
            className="w-full p-2 border rounded"
          />

          <label className="block text-xs">Safety margin (e.g. 1.1 = 10%)</label>
          <input
            type="number"
            step="0.01"
            value={inputs.safetyMargin}
            onChange={(e) => update("safetyMargin", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Instant & Daily</h3>
          <ul className="text-sm space-y-2">
            <li>Panel instantaneous (W): {results.panelInstantW.toFixed(1)} W</li>
            <li>After derate: {results.panelAfterDerate.toFixed(1)} W</li>
            <li>After MPPT: {results.panelAfterMppt.toFixed(1)} W</li>
            <li>AC available per panel: {results.acAvailablePerPanel.toFixed(1)} W</li>
            <li>Energy per panel / day: {results.energyPerPanelWhPerDay.toFixed(0)} Wh/day</li>
            <li>Load daily need: {results.loadDailyWh.toFixed(0)} Wh/day</li>
            <li>Panels recommended for 24/7: {results.recommendedPanelCountFor24h}</li>
            <li>Required panel power for 24h: {results.requiredPanelPowerFor24h.toFixed(0)} W</li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold mb-2">Battery & Safety</h3>
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
            Continuous? —{' '}
            <strong>
              {results.canBeContinuousNow && results.inverterCanHandle
                ? 'Yes (with recommended panel count)'
                : 'No — adjust panels/battery/inverter or reduce load'}
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
          <li>Allow "panel count" input and compute aggregate production (currently shows per-panel numbers & recommended counts).</li>
          <li>Hourly simulation (24-hour profile) to model charge/discharge across a day.</li>
          <li>Include temperature coefficient and shading effects for more accuracy.</li>
          <li>Model MPPT charge limits when multiple panels are present (string vs parallel configurations).</li>
        </ul>
      </div>
    </div>
  );
}
