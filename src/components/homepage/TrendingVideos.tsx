import { Play } from "lucide-react"
import Card from "../ui/Card"
import MediaItem from "../ui/MediaItem"
import SectionHeader from "../ui/SectionHeader"

interface Video {
  id: number
  title: string
  duration: string
  views: string
  thumbnail: string
}

interface TrendingVideosProps {
  videos: Video[]
}

const TrendingVideos = ({ videos }: TrendingVideosProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<Play className="h-5 w-5 text-orange-500 mr-2" />}
        title="Trending Videos"
      />
      <div className="space-y-4">
        {videos.map(video => (
          <MediaItem
            key={video.id}
            title={video.title}
            thumbnail={
              <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                {video.thumbnail}
              </div>
            }
            meta={`${video.duration} • ${video.views} views`}
          />
        ))}
      </div>
    </Card>
  )
}

export default TrendingVideos
