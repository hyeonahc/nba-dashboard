import { Clock, ExternalLink, Play } from "lucide-react"
import { useTrendingVideosWithCache } from "../../hooks/video/useTrendingVideosWithCache"
import Card from "../ui/Card"
import SectionHeader from "../ui/SectionHeader"

const TrendingVideos = () => {
  const { data: videos = [], isLoading, error } = useTrendingVideosWithCache()
  return (
    <Card>
      <SectionHeader
        icon={<Play className="h-5 w-5 text-orange-500 mr-2" />}
        title="NBA Videos"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-200 mx-auto mb-3"></div>
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Loading NBA videos...
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Fetching the latest NBA content
            </p>
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
                Failed to load videos
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {error.message ||
                  "Unable to fetch YouTube videos. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Videos List */}
      {!isLoading && !error && videos.length > 0 && (
        <div className="space-y-3">
          {videos.slice(0, 2).map(video => (
            <div
              key={video.id}
              className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => {
                // Open YouTube video in new tab
                window.open(
                  `https://www.youtube.com/watch?v=${video.id}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }}
            >
              {/* Thumbnail Container - Full Width */}
              <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
                {video.thumbnail.startsWith("http") ? (
                  <>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full p-2 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Play
                          className="h-6 w-6 text-gray-600 group-hover:text-orange-500"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-orange-100 to-orange-200">
                    {video.thumbnail}
                  </div>
                )}
              </div>

              {/* Content - Full Width */}
              <div className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                      {video.title}
                    </h3>

                    {/* Video Date */}
                    {video.publishedAt && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1.5" />
                        {new Date(video.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year:
                              new Date(video.publishedAt).getFullYear() !==
                              new Date().getFullYear()
                                ? "numeric"
                                : undefined,
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* External Link Icon */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && videos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            No videos available
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            We're working on bringing you the latest NBA videos. Check back
            soon!
          </p>
        </div>
      )}
    </Card>
  )
}

export default TrendingVideos
