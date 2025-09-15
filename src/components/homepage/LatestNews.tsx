import { Newspaper } from "lucide-react"
import { useLatestNewsWithCache } from "../../hooks/news/useLatestNewsWithCache"
import Card from "../ui/Card"
import MediaItem from "../ui/MediaItem"
import SectionHeader from "../ui/SectionHeader"

const LatestNews = () => {
  const { data: articles = [], isLoading, error } = useLatestNewsWithCache()

  // Ensure we always display exactly 5 articles
  const displayArticles = articles.slice(0, 5)

  return (
    <Card>
      <SectionHeader
        icon={<Newspaper className="h-5 w-5 text-orange-500 mr-2" />}
        title="Latest News"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading news...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Failed to load news
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {error.message ||
                  "Unable to fetch news articles. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* News List */}
      {!isLoading && !error && displayArticles.length > 0 && (
        <div className="space-y-4">
          {displayArticles.map(article => (
            <MediaItem
              key={article.id}
              {...article}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && displayArticles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No news articles available</p>
        </div>
      )}
    </Card>
  )
}

export default LatestNews
