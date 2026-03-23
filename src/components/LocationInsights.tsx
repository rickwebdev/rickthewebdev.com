import React, { useEffect, useState, useRef } from 'react';

interface StateMessages {
  states: {
    [key: string]: {
      message: string;
    };
  };
  countries: {
    [key: string]: {
      message: string;
    };
  };
}

const stateMessages: StateMessages = {
  states: {
    "Alabama": {
      "message": "So, does everyone just sing 'Sweet Home Alabama' all day here, or what?"
    },
    "Alaska": {
      "message": "Wait, do I need a passport to be here? Isn't this, like, next to Russia?"
    },
    "Arizona": {
      "message": "How long till I see the Grand Canyon from here? Is it, like, right around the corner?"
    },
    "Arkansas": {
      "message": "So, do y'all actually wrestle with bears out here in The Natural State?"
    },
    "California": {
      "message": "Where's the Hollywood sign? I mean, I'm in California… it's gotta be nearby, right?"
    },
    "Colorado": {
      "message": "Wait, we're, like, a mile high already? How can you even breathe up here?"
    },
    "Connecticut": {
      "message": "This is where they wrote the Constitution, right? Can I see it?"
    },
    "Delaware": {
      "message": "So, you're like… the first state? What does that even mean? Were there other options?"
    },
    "Florida": {
      "message": "Do the alligators just, like, walk around here? Do you have to, like, wrestle them at the beach?"
    },
    "Georgia": {
      "message": "Is it true you have peaches growing on every corner? Can I just, like, pick one?"
    },
    "Hawaii": {
      "message": "Aloha means both 'hello' and 'goodbye,' right? So how do you know which one people mean?"
    },
    "Idaho": {
      "message": "So… where can I dig up a potato? Are there, like, potato fields everywhere?"
    },
    "Illinois": {
      "message": "Is Lincoln still, like, super famous here? Do you guys have Lincoln-themed parties?"
    },
    "Indiana": {
      "message": "The Crossroads of America? So, do all the roads meet here, or how does that work?"
    },
    "Iowa": {
      "message": "Do y'all just, like, live in corn mazes? Is it hard to find your way home?"
    },
    "Kansas": {
      "message": "So, where's Dorothy's house? Can I take the yellow brick road from here?"
    },
    "Kentucky": {
      "message": "Is there really a horse race every day here? And do they serve fried chicken at the finish line?"
    },
    "Louisiana": {
      "message": "Laissez les bons temps rouler? So, like, is everyone just in Mardi Gras mode all the time?"
    },
    "Maine": {
      "message": "So, do the lobsters just come right out of the ocean and onto your plate? Do they know they're famous?"
    },
    "Maryland": {
      "message": "If it's America in Miniature, where's the mini White House? Can I see that?"
    },
    "Massachusetts": {
      "message": "Boston Tea Party happened here, right? Is there still tea in the harbor or…?"
    },
    "Michigan": {
      "message": "Pure Michigan? So, does that mean the lakes are, like, 100% pure water?"
    },
    "Minnesota": {
      "message": "So, which lake is the best one out of the 10,000? Do they have names, or…?"
    },
    "Mississippi": {
      "message": "Is it hard to spell Mississippi if you live here? Or does it get easier?"
    },
    "Missouri": {
      "message": "So, I'm here, now show me! That's what y'all say, right?"
    },
    "Montana": {
      "message": "Is this Big Sky, like, actually bigger than other skies? Can you measure that?"
    },
    "Nebraska": {
      "message": "Nebraska Nice? So, if I cut in line, do y'all still smile and say 'have a nice day?'"
    },
    "Nevada": {
      "message": "So, is everything made of neon here, or just in Vegas? Can I sleep with the lights off?"
    },
    "New Hampshire": {
      "message": "Live Free or Die? Whoa, do I need a permit to stay free, or…?"
    },
    "New Jersey": {
      "message": "So, where's the garden part? I heard this is The Garden State, but all I see is highways."
    },
    "New Mexico": {
      "message": "Land of Enchantment? So, is there, like, magic stuff happening here or just pretty sunsets?"
    },
    "New York": {
      "message": "If I say 'I love New York,' does that make me a real New Yorker? Or do I have to yell at a cabbie too?"
    },
    "North Carolina": {
      "message": "First in Flight? So, are the planes here faster than everywhere else, or how's that work?"
    },
    "North Dakota": {
      "message": "Legendary? Like, who's the legend? Can I get a selfie with them?"
    },
    "Ohio": {
      "message": "The Heart of It All? So, is Ohio, like, the literal heart of the U.S.?"
    },
    "Oklahoma": {
      "message": "Native America? So, do you, like, see cowboys and Native Americans having duels in the street?"
    },
    "Oregon": {
      "message": "Dreamers welcome? So, does that mean I can daydream my way to a free coffee?"
    },
    "Pennsylvania": {
      "message": "The Keystone State – so does that mean everything else would fall apart without you guys?"
    },
    "Rhode Island": {
      "message": "How's it feel to be the smallest state? Does everyone just know each other?"
    },
    "South Carolina": {
      "message": "Smiling Faces, Beautiful Places – so, does everyone smile all the time here, even while driving?"
    },
    "South Dakota": {
      "message": "Great Faces, Great Places – do the faces on Mount Rushmore ever change expressions?"
    },
    "Tennessee": {
      "message": "The Volunteer State – so, do I have to volunteer to get anything, or do you still sell stuff?"
    },
    "Texas": {
      "message": "Don't Mess with Texas – but can I, like, mess with the BBQ at least?"
    },
    "Utah": {
      "message": "Life Elevated – so, does that mean everyone's, like, a little taller here? Or just the mountains?"
    },
    "Vermont": {
      "message": "Freedom and Unity – does that mean I'm free to eat as much maple syrup as I want?"
    },
    "Virginia": {
      "message": "Virginia is for Lovers – so, do you have to be in love to visit?"
    },
    "Washington": {
      "message": "The Evergreen State – so, is it, like, green here all year? Does winter even happen?"
    },
    "West Virginia": {
      "message": "Wild and Wonderful – so, do I need hiking boots or a party hat? Or both?"
    },
    "Wisconsin": {
      "message": "America's Dairyland – so, is there cheese just lying around everywhere? Like, can I grab some off the street?"
    },
    "Wyoming": {
      "message": "Forever West – does that mean, like, cowboys are still around, or is it just a vibe?"
    }
  },
  countries: {
    "Costa Rica": {
      "message": "Pura vida! Is it true that sloths are just hanging around everywhere?"
    },
    "Mexico": {
      "message": "¡Hola! Is it true that you can find a taco stand on every corner?"
    },
    "Canada": {
      "message": "Oh, Canada! Do you really say 'sorry' as often as they say you do, eh?"
    },
    "United Kingdom": {
      "message": "Cheerio! Is tea time still a sacred ritual, or is that just a stereotype?"
    },
    "Australia": {
      "message": "G'day mate! Are kangaroos really hopping down the streets in the cities?"
    },
    "Ireland": {
      "message": "Top o' the mornin'! Do leprechauns really guard all the pots of gold here?"
    },
    "France": {
      "message":
        "Bonjour! So is carrying a baguette home from the bakery just how everyone does their cardio here?"
    },
    "Italy": {
      "message": "Ciao bella! Does everyone here gesticulate wildly when they talk, or is that just in the movies?"
    },
    "Japan": {
      "message":
        "Konnichiwa! So are the vending machines here really selling things I haven't even thought of yet?"
    },
    "Germany": {
      "message": "Guten Tag! Is it true that you can't jaywalk without getting stern looks from everyone?"
    },
    "Spain": {
      "message": "¡Hola! Do you really take a siesta every day, or is that just a tourist myth?"
    },
    "Brazil": {
      "message": "Olá! Is it true that everyone here can do the samba as soon as they learn to walk?"
    },
    "Netherlands": {
      "message": "Hallo! Do you really need a boat license to navigate all these canals?"
    },
    "India": {
      "message": "Namaste! Is it true that cows have the right of way on all roads, even highways?"
    },
    "New Zealand": {
      "message": "Kia ora! Are there really more sheep than people here, or is that just pulling my wool?"
    },
    "Switzerland": {
      "message": "Is it true everyone here has a secret bank account and a pet cow?"
    },
    "Sweden": {
      "message": "So, where do I pick up my free IKEA furniture?"
    },
    "Norway": {
      "message": "If I yell loud enough, will an actual Viking show up?"
    },
    "Finland": {
      "message": "Is it true you have more saunas than cars? Can I drive a sauna?"
    },
    "South Korea": {
      "message": "So, can I just walk into a K-pop music video, or do I need a ticket?"
    },
    "China": {
      "message": "If I start at the Great Wall, can I see my house from here?"
    },
    "Egypt": {
      "message": "Can I climb the pyramids, or is that just for mummies?"
    },
    "South Africa": {
      "message": "So, do lions just walk down the street, or do they use the crosswalk?"
    },
    "Turkey": {
      "message": "Is it true you eat turkey every day, or is that just Thanksgiving?"
    },
    "Greece": {
      "message": "If I shout 'Opa!' will someone start smashing plates?"
    },
    "Thailand": {
      "message": "So, can I ride an elephant to my hotel, or is that just for the movies?"
    },
    "Singapore": {
      "message": "Is it true you get fined for chewing gum, or is that just a sticky rumor?"
    },
    "Russia": {
      "message": "If I keep heading east, do I end up in Alaska?"
    },
    "Argentina": {
      "message": "If I order a steak, does it come with a free tango lesson?"
    },
    "Chile": {
      "message": "Is everything here spicy, or is that just the name?"
    },
    "Philippines": {
      "message": "So, if I visit all 7,000 islands, do I get a prize?"
    },
    "Saudi Arabia": {
      "message": "Is it true the sand here is imported from somewhere else?"
    },
    "United Arab Emirates": {
      "message": "If I dig in the desert, will I hit oil or just more sand?"
    },
    "Morocco": {
      "message": "If I rub a lamp, will a genie really pop out, or is that just in cartoons?"
    },
    "Colombia": {
      "message": "Is it true the coffee here is so good that people just skip sleep entirely?"
    },
    "Venezuela": {
      "message":
        "So if I need directions, do I just follow the Angel Falls or is there a shorter route?"
    },
    "Peru": {
      "message": "If I climb Machu Picchu, does a llama automatically appear to take my photo?"
    },
    "Ecuador": {
      "message":
        "You're literally on the equator — so does standing here mean I'm in two hemispheres at once?"
    },
    "Bolivia": {
      "message": "Salt flats so big they're visible from space — can I season my food from here?"
    },
    "Uruguay": {
      "message":
        "The Switzerland of South America — so does everyone here have a secret bank account and a cow?"
    },
    "Paraguay": {
      "message": "Landlocked but surrounded by rivers — so do you just build boats and pretend?"
    },
    "Guatemala": {
      "message": "So do the Mayan ruins just come with the neighborhood, or are those extra?"
    },
    "Cuba": {
      "message": "If I order a mojito, does Ernest Hemingway automatically show up?"
    },
    "Dominican Republic": {
      "message": "So is merengue just the background music to everyday life here?"
    },
    "Puerto Rico": {
      "message": "La Isla del Encanto — so is everything actually enchanted, or just the beaches?"
    },
    "Panama": {
      "message": "So the canal just splits the whole country in two — does that ever get weird?"
    },
    "El Salvador": {
      "message": "The smallest country in Central America — does everyone just know each other?"
    },
    "Honduras": {
      "message":
        "So can I get from the Caribbean coast to the Pacific in a day, or is that just a rumor?"
    },
    "Nicaragua": {
      "message": "Land of lakes and volcanoes — so is every commute basically an adventure?"
    },
    "Portugal": {
      "message": "So is fado just playing everywhere all the time, or only when it rains?"
    },
    "Poland": {
      "message": "Is it true pierogi is acceptable for every meal including breakfast?"
    },
    "Ukraine": {
      "message": "Sunflower fields as far as the eye can see — is that just the screensaver or real life?"
    },
    "Israel": {
      "message":
        "So can I float in the Dead Sea without even trying, or do I still have to show up?"
    },
    "Nigeria": {
      "message":
        "Nollywood produces more movies than Hollywood — so is everyone here basically a film star?"
    },
    "Kenya": {
      "message": "If I go for a run here, am I technically competing with world record holders?"
    },
    "Ghana": {
      "message": "So is jollof rice here actually better than everywhere else, or is that just what everyone says?"
    },
    "Pakistan": {
      "message":
        "K2 is right there — so do people just casually climb the world's second highest peak on weekends?"
    },
    "Indonesia": {
      "message": "17,000 islands — so how do you even pick where to go for lunch?"
    },
    "Vietnam": {
      "message": "Is pho really acceptable for breakfast, or is that just something tourists do?"
    },
    "Romania": {
      "message": "So does everyone here live in a castle, or just Dracula?"
    },
    "Czech Republic": {
      "message":
        "Is it true Prague has more beer per capita than anywhere else — is that a challenge or a warning?"
    },
    "Hungary": {
      "message": "So is goulash basically the national answer to everything?"
    },
    "Denmark": {
      "message": "Happiest country in the world — so what's everyone's secret, and can I have it?"
    },
    "Belgium": {
      "message": "So do you actually argue about whether waffles or fries are the national dish?"
    },
    "Austria": {
      "message": "So does everyone here actually yodel, or is that just in The Sound of Music?"
    },
    "United States": {
      "message":
        "So which state are you hiding in? The IP said USA but wouldn't give me more than that."
    }
  }
};

/** ipinfo returns ISO 3166-1 alpha-2; values match keys in `stateMessages.countries`. */
const isoToCountry: Record<string, string> = {
  AE: 'United Arab Emirates',
  AR: 'Argentina',
  AT: 'Austria',
  AU: 'Australia',
  BE: 'Belgium',
  BO: 'Bolivia',
  BR: 'Brazil',
  CA: 'Canada',
  CH: 'Switzerland',
  CL: 'Chile',
  CN: 'China',
  CO: 'Colombia',
  CR: 'Costa Rica',
  CU: 'Cuba',
  CZ: 'Czech Republic',
  DE: 'Germany',
  DK: 'Denmark',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  ES: 'Spain',
  FI: 'Finland',
  FR: 'France',
  GB: 'United Kingdom',
  GH: 'Ghana',
  GR: 'Greece',
  GT: 'Guatemala',
  HN: 'Honduras',
  HU: 'Hungary',
  ID: 'Indonesia',
  IE: 'Ireland',
  IL: 'Israel',
  IN: 'India',
  IT: 'Italy',
  JP: 'Japan',
  KE: 'Kenya',
  KR: 'South Korea',
  MA: 'Morocco',
  MX: 'Mexico',
  NG: 'Nigeria',
  NI: 'Nicaragua',
  NL: 'Netherlands',
  NO: 'Norway',
  NZ: 'New Zealand',
  PA: 'Panama',
  PE: 'Peru',
  PH: 'Philippines',
  PK: 'Pakistan',
  PL: 'Poland',
  PR: 'Puerto Rico',
  PT: 'Portugal',
  PY: 'Paraguay',
  RO: 'Romania',
  RU: 'Russia',
  SA: 'Saudi Arabia',
  SE: 'Sweden',
  SG: 'Singapore',
  SV: 'El Salvador',
  TH: 'Thailand',
  TR: 'Turkey',
  UA: 'Ukraine',
  US: 'United States',
  UY: 'Uruguay',
  VE: 'Venezuela',
  VN: 'Vietnam',
  ZA: 'South Africa',
};

const LocationInsights: React.FC = () => {
  const [locationMessage, setLocationMessage] = useState<string>('Fetching your location...');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(350);
  const [resizing, setResizing] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hasMoved, setHasMoved] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const resizeStart = useRef<{ x: number; y: number; width: number }>({ x: 0, y: 0, width: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
        setHasMoved(true);
      } else if (resizing) {
        const dx = resizeStart.current.x - e.clientX;
        const newWidth = Math.max(200, resizeStart.current.width + dx);
        setWidth(newWidth);
        
        // Update position to maintain the right edge position
        if (position) {
          setPosition({
            x: position.x - (newWidth - width),
            y: position.y
          });
        }
        setHasMoved(true);
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
    };
    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing]);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) return;
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setDragging(true);
    }
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      resizeStart.current = {
        x: e.clientX,
        y: rect.top,
        width: width,
      };
      setResizing(true);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        console.log('Attempting to fetch location data...');
        const response = await fetch('https://ipinfo.io/json', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_IPINFO_TOKEN}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Location fetch failed: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Location data received:', data);
        
        if (!data || !data.country) {
          throw new Error('Invalid location data received');
        }

        const city = data.city || 'Unknown City';
        const state = data.region || '';
        const countryRaw = data.country;
        const countryCode = countryRaw.trim().toUpperCase();
        const countryNameResolved = isoToCountry[countryCode] ?? countryRaw;

        const locationString = [city, state, countryNameResolved].filter(Boolean).join(', ');
        let message = `Hello visitor from ${locationString}! `;

        const isUS = countryCode === 'US';

        if (isUS) {
          const normalizedState = state.toLowerCase().trim();
          const normalizedCity = city.toLowerCase().trim();

          const stateKey = Object.keys(stateMessages.states).find(
            (key) => key.toLowerCase() === normalizedState,
          );

          if (stateKey) {
            if (normalizedCity.includes('new york') && normalizedState === 'new york') {
              message += stateMessages.states['New York'].message;
            } else if (normalizedCity.includes('los angeles') && normalizedState === 'california') {
              message += stateMessages.states['California'].message;
            } else if (normalizedCity.includes('chicago') && normalizedState === 'illinois') {
              message += stateMessages.states['Illinois'].message;
            } else {
              message += stateMessages.states[stateKey].message;
            }
          } else {
            message += stateMessages.countries['United States'].message;
          }
        } else {
          const normalizedName = countryNameResolved.toLowerCase().trim();
          const countryKey = Object.keys(stateMessages.countries).find(
            (key) => key.toLowerCase() === normalizedName,
          );

          if (countryKey) {
            message += stateMessages.countries[countryKey].message;
          } else {
            message += `We don't have a special message for you yet, but we'd love to hear about your local customs and traditions!`;
          }
        }
        
        message = `${message} • `.repeat(1);
        
        // Add a fun riddle hinting at the Konami code easter egg
        message += ` 🎮 If you made it this far, there's a hidden secret! Try pressing: Up Up Down Down Left Right Left Right B A • `;
        
        setLocationMessage(message);
      } catch (error: unknown) {
        console.error('Error fetching location:', error);
        const fallbackMessage = 'The location API has reached its free daily limit. Sign up for an API token to get 50k requests/month. Welcome to my portfolio! Thanks for visiting! 🎮 If you made it this far, there\'s a hidden secret! Try pressing: Up Up Down Down Left Right Left Right B A • ';
        setLocationMessage(fallbackMessage);
      }
    };

    fetchLocation();
  }, []);

  if (!visible) return null;

  return (
    <div
      id="location-insights"
      className="location-insights"
      ref={nodeRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        width: width,
        height: 'auto',
        cursor: dragging ? 'grabbing' : (resizing ? 'sw-resize' : 'grab'),
        zIndex: 1000,
        userSelect: 'none',
        minWidth: 200,
        boxSizing: 'border-box',
        overflow: 'visible',
        ...(hasMoved && position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } : {}),
      }}
    >
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: -7,
          left: -4,
          width: 20,
          height: 20,
          background: '#e53935',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.15rem',
          fontFamily: 'monospace, sans-serif',
          cursor: 'pointer',
          zIndex: 1200,
          lineHeight: 1,
          padding: 0,
          opacity: 0.92,
          transition: 'opacity 0.2s, background 0.2s',
          borderRadius: '50%',
          border: '1px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Close location insights"
        title="Close"
        onMouseOver={e => (e.currentTarget.style.opacity = '1')}
        onMouseOut={e => (e.currentTarget.style.opacity = '0.92')}
      >
        {'✕'}
      </button>
      <div className="calculator-screen" style={{width: '100%'}}>
        <div className="marquee">
          <div id="location-message" className="marquee-content">
            {locationMessage}
          </div>
        </div>
      </div>
      <div
        className="resize-handle"
        onMouseDown={onResizeMouseDown}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 24,
          height: 24,
          cursor: 'sw-resize',
          zIndex: 1100,
          userSelect: 'none',
          background: 'transparent',
          padding: 0,
        }}
        title="Resize from bottom left"
      />
    </div>
  );
};

export default LocationInsights; 