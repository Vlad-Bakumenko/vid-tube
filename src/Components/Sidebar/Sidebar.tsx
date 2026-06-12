import './Sidebar.css';
import home from '../../assets/home.png';
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jack from '../../assets/jack.png';
import simon from '../../assets/simon.png';
import tom from '../../assets/tom.png';
import megan from '../../assets/megan.png';
import cameron from '../../assets/cameron.png';

interface SidebarProps {
  sidebar: boolean;
  category: number;
  setCategory: (category: number) => void;
}

const CATEGORIES = [
  { id: 0,  label: 'Home',          icon: home          },
  { id: 20, label: 'Gaming',        icon: game_icon     },
  { id: 2,  label: 'Automobiles',   icon: automobiles   },
  { id: 17, label: 'Sports',        icon: sports        },
  { id: 24, label: 'Entertainment', icon: entertainment },
  { id: 28, label: 'Technology',    icon: tech          },
  { id: 10, label: 'Music',         icon: music         },
  { id: 22, label: 'Blogs',         icon: blogs         },
  { id: 25, label: 'News',          icon: news          },
];

const SUBSCRIPTIONS = [
  { label: 'PewDiePie',    icon: jack    },
  { label: 'MrBeast',      icon: simon   },
  { label: 'Justin Bieber',icon: tom     },
  { label: '5-Minute Craft',icon: megan  },
  { label: 'Nas Daily',    icon: cameron },
];

const Sidebar = ({ sidebar, category, setCategory }: SidebarProps) => {
  return (
    <div className={`sidebar ${sidebar ? '' : 'small-sidebar'}`}>
      <div className='shortcut-links'>
        {CATEGORIES.map(({ id, label, icon }) => (
          <div
            key={id}
            className={`side-link ${category === id ? 'active' : ''}`}
            onClick={() => setCategory(id)}
          >
            <img src={icon} alt={label} />
            <p>{label}</p>
          </div>
        ))}
        <hr />
      </div>
      <div className='subscribed-list'>
        <h3>Subscribed</h3>
        {SUBSCRIPTIONS.map(({ label, icon }) => (
          <div key={label} className='side-link'>
            <img src={icon} alt={label} />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
