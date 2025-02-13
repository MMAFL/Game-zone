import GameCard from "@/components/game/GameCard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  const queryClient = new QueryClient()
  const featuredGames = [
    { id: 1, title: "Game 1", image: "/images/game1.jpg" },
    { id: 2, title: "Game 2", image: "/images/game2.jpg" },
  ];

  return (
    
    <div>
      <h1>Welcome to Game Zone!</h1>
      <div className="games-grid">
        {featuredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
