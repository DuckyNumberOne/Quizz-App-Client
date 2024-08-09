import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DuckQuizz',
    short_name: 'DuckQuizz',
    description: 'DuckQuizz - Your Ultimate Quiz Platform. Challenge yourself with engaging quizzes and compete with friends!',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f0f0', 
    theme_color: '#0044cc', 
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
