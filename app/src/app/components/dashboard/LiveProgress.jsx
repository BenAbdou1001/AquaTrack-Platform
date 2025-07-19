"use client"
import { useState } from "react";

export function LiveMonitorProgress() {
  const [loading, setLoading] = useState(false)

  const start = async () => {
    setLoading(true)
    const response = await fetch(`${apii}/api/sensor-data/start-monitoring`, { cache: 'no-store' });
    const data = await response.json()
  }


  const stope = async () => {
    setLoading(false)
    const response = await fetch(`${apii}/api/sensor-data/stop-monitoring`, { cache: 'no-store' });
    const data = await response.json()
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">live monitor</h3>

      {!loading && (
        <div className="flex items-center justify-center">
          <button
            onClick={start}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
          >
            Start Monitoring
          </button>
        </div>
      )}
      {loading && (
        <div className="flex flex-col items-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
          <span className="text-sm text-gray-500">Loading...</span>
          <button
            onClick={stope}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
          >
            Stop Monitoring
          </button>
        </div>
      )}
    </div>
  )
}
