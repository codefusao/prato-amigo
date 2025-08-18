import { ExternalLink, YoutubeIcon } from "lucide-react";

interface VideoBannerProps {
  title: string;
  videoUrl: string;
  buttonText?: string;
}

export function VideoBanner({
  title,
  videoUrl,
  buttonText = "Assista ao vídeo pitch",
}: VideoBannerProps) {
  return (
    <section className="py-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <span className="font-semibold text-lg">{title}</span>
          </div>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <YoutubeIcon/>
            {buttonText}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
