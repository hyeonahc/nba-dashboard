import { Construction, Home } from "lucide-react"

interface ComingSoonProps {
  pageName: string
  onNavigateHome?: () => void
}

const ComingSoon = ({ pageName, onNavigateHome }: ComingSoonProps) => {
  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Construction className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {pageName} Page Coming Soon
          </h1>

          <p className="text-lg text-gray-600">
            This page is currently under development
          </p>

          <div className="pt-4">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
