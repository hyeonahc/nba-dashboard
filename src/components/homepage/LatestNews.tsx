import { Newspaper } from "lucide-react"
import type { NewsArticle } from "../../types"
import Card from "../ui/Card"
import MediaItem from "../ui/MediaItem"
import SectionHeader from "../ui/SectionHeader"

interface LatestNewsProps {
  articles: NewsArticle[]
}

const LatestNews = ({ articles }: LatestNewsProps) => {
  // Ensure we always display exactly 5 articles
  const displayArticles = articles.slice(0, 5)

  return (
    <Card>
      <SectionHeader
        icon={<Newspaper className="h-5 w-5 text-orange-500 mr-2" />}
        title="Latest News"
      />
      <div className="space-y-4">
        {displayArticles.map(article => (
          <MediaItem
            key={article.id}
            {...article}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          />
        ))}
      </div>
    </Card>
  )
}

export default LatestNews
