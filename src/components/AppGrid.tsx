
import AppCard from './AppCard';

interface AppData {
    id: number;
    name: string;
    description: string;
    rating: number;
    color: string;
    icon: string;
    url: string;
    liveUrl?: string;
}

const apps: AppData[] = [
    {
        id: 0,
        name: 'sheetAI',
        description: 'Aplicación que te facilita la vida cuando usas excel.',
        rating: 5.0,
        color: 'linear-gradient(135deg, #1D6F42, #21A366)',
        icon: '📊',
        url: 'https://github.com/Jaionee/people-manager',
        liveUrl: 'https://people-manager-r6wyxttmg-memes-projects-9faf9c0d.vercel.app'
    },
    {
        id: 101,
        name: 'SubTracker',
        description: 'Control your recurring expenses and save money.',
        rating: 5.0,
        color: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        icon: '💳',
        url: 'https://github.com/Jaionee/subscription-tracker',
        liveUrl: 'https://subscription-tracker-kgt0puie5-memes-projects-9faf9c0d.vercel.app'
    },
    {
        id: 102,
        name: 'CryptoTrack',
        description: 'Real-time crypto portfolio tracker with Bitcoin theme.',
        rating: 4.8,
        color: 'linear-gradient(135deg, #F7931A, #E88209)',
        icon: '₿',
        url: 'https://github.com/Jaionee/crypto-tracker',
        liveUrl: 'https://crypto-tracker-m9e8hggez-memes-projects-9faf9c0d.vercel.app'
    },
    {
        id: 1,
        name: 'Neon Notes',
        description: 'Capture your thoughts in style with our glowing interface.',
        rating: 4.8,
        color: 'linear-gradient(135deg, #ff00cc, #333399)',
        icon: '📝',
        url: '#'
    },
    {
        id: 2,
        name: 'Cyber Task',
        description: 'Manage projects with futuristic efficiency and speed.',
        rating: 4.9,
        color: 'linear-gradient(135deg, #00dbde, #fc00ff)',
        icon: '⚡',
        url: '#'
    },
    {
        id: 3,
        name: 'Zen Focus',
        description: 'Block distractions and find your flow state instantly.',
        rating: 4.7,
        color: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        icon: '🧘',
        url: '#'
    },
    {
        id: 4,
        name: 'Pixel Art Pro',
        description: 'Create stunning 8-bit masterpieces on the go.',
        rating: 4.6,
        color: 'linear-gradient(135deg, #f093fb, #f5576c)',
        icon: '🎨',
        url: '#'
    },
    {
        id: 5,
        name: 'Crypto Watch',
        description: 'Real-time market tracking with advanced analytics.',
        rating: 4.5,
        color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        icon: '📊',
        url: '#'
    },
    {
        id: 6,
        name: 'Sound Wave',
        description: 'High-fidelity audio player with equalizer visualization.',
        rating: 4.8,
        color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
        icon: '🎵',
        url: '#'
    }
];

const AppGrid = () => {
    return (
        <section className="app-grid-section" id="apps">
            <div className="container">
                <div className="section-header">
                    <h2>Trending Apps</h2>
                    <p>Hand-picked applications for you.</p>
                </div>
                <div className="grid-layout">
                    {apps.map(app => (
                        <AppCard key={app.id} app={app} />
                    ))}
                </div>
            </div>
            <style>{`
        .app-grid-section {
          padding: 4rem 0;
        }

        .section-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--text-secondary);
        }
      `}</style>
        </section>
    );
};

export default AppGrid;
