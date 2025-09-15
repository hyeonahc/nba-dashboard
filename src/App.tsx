import { useState } from "react"
import { Footer, HomePage, Navigation } from "./components"

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <main>
        {currentPage === "dashboard" ? (
          <HomePage />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to NBA Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Current page:{" "}
                <span className="font-semibold text-orange-600">
                  {currentPage}
                </span>
              </p>
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <p className="text-gray-600">
                  Use the navigation above to explore different sections of the
                  dashboard.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
