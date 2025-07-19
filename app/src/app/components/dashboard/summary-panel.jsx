import { AlertTriangle, Target, CheckCircle, Eye } from "lucide-react"

const summaryItems = [
  {
    icon: AlertTriangle,
    label: "alert today",
    value: "13",
    color: "text-red-500",
  },
  {
    icon: Target,
    label: "Most affected",
    value: "pound 3",
    subtitle: "(4 alerts)",
    color: "text-yellow-500",
  },
  {
    icon: CheckCircle,
    label: "Resolved today",
    value: "80%",
    color: "text-green-500",
  },
  {
    icon: Eye,
    label: "Resolved today",
    value: "80%",
    color: "text-blue-500",
  },
]

export function SummaryPanel() {
  return (
    <aside className="bg-white border-l border-gray-200 p-6 h-1/2">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Summary</h3>
      <div className="space-y-6">
        {summaryItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                {item.subtitle && <p className="text-xs text-gray-500">{item.subtitle}</p>}
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}