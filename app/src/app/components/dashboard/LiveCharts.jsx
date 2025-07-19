"use client"
import { api } from "@/app/data";
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react";

export function LiveMonitorChart({ tanks }) {
  const VARIANTS = ['ph', 'temperature', 'turbidity', 'nitrate', 'nitrite', 'chlorine', 'conductivity', 'dissolved_oxygen', 'salinity'];
  const [dataPoints, setDataPoints] = useState([])
  const [tankId, setTankId] = useState("ef98981f-1fa0-4e55-9d55-30ca5f88f808")
  const [vari, setVari] = useState("ph")

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${api}/api/sensors/${tankId}/${vari}`, { cache: 'no-store' })
        const variantHistory = await response.json()

        if (Array.isArray(variantHistory)) {
          const formatted = variantHistory.map((entry, idx) => ({
            x: idx * 10,         // You can use timestamp or index-based spacing
            y: parseFloat(entry.value),
          }))
          setDataPoints(formatted)
        }
      } catch (error) {
        console.error("Error fetching sensor data", error)
      }
    }

    fetchData()
  }, [tankId, vari])

  const pathData = dataPoints
    .map((point, index) => {
      const x = (point.x / 100) * 300
      const y = 150 - (point.y / 40) * 120
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(" ")

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">live monitor</h3>
          <p className="text-sm text-gray-500">time progress</p>
        </div>
        <div className="flex space-x-4 items-center">
          <select
            value={tankId}
            onChange={(e) => setTankId(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1"
          >
            {tanks.map((tank) => (
              <option key={tank.id} value={tank.id}>
                Tank {tank.name || tank.id.slice(0, 4)}
              </option>
            ))}
          </select>
          <select
            value={vari}
            onChange={(e) => setVari(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1"
          >
            {VARIANTS.map((variant) => (
              <option key={variant} value={variant}>
                {variant.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <svg width="100%" height="180" viewBox="0 0 320 180" className="overflow-visible">
          {/* Grid lines */}
          {[0, 10, 20, 30, 40].map((temp) => (
            <g key={temp}>
              <line
                x1="20"
                y1={150 - (temp / 40) * 120}
                x2="300"
                y2={150 - (temp / 40) * 120}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
              <text x="10" y={155 - (temp / 40) * 120} fontSize="10" fill="#9ca3af" textAnchor="end">
                {temp}°
              </text>
            </g>
          ))}

          {/* Time labels */}
          {["11h", "10h", "9h", "8h", "7h", "6h", "5h", "4h", "3h", "2h", "1h", "now"].map((time, index) => (
            <text key={time} x={20 + index * 25} y="170" fontSize="10" fill="#9ca3af" textAnchor="middle">
              {time}
            </text>
          ))}

          {/* Temperature curve */}
          <path
            d={pathData}
            stroke="#ec4899"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle key={index} cx={(point.x / 100) * 300} cy={150 - (point.y / 40) * 120} r="3" fill="#ec4899" />
          ))}
        </svg>
      </div>
    </div>
  )
}
