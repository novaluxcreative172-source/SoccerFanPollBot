// Curated evergreen football prompts. Add new entries to expand the rotation.
const TEXT_POLLS = [
  { question: "Which quality makes a midfielder truly world-class?", options: ["Vision and passing", "Work rate", "Ball control", "Leadership"] },
  { question: "Who has the biggest influence on a team's performance?", options: ["The manager", "The captain", "The goalkeeper", "The striker"] },
  { question: "What makes a football TIFO unforgettable?", options: ["Creativity and scale", "The message behind it", "Timing and atmosphere", "All of these"] },
  { question: "Which position is the hardest to play consistently?", options: ["Goalkeeper", "Centre-back", "Central midfielder", "Striker"] },
  { question: "Would you rather win the league or the Champions League?", options: ["League title", "Champions League", "Both are equally special", "Neither — win every trophy"] },
  { question: "What is the best way to beat a high press?", options: ["Quick passing", "Long balls in behind", "Dribbling through it", "Switching play"] },
  { question: "Which matters most when judging a striker?", options: ["Goals", "Link-up play", "Movement", "Big-game impact"] },
  { question: "What creates the best stadium atmosphere?", options: ["Non-stop chanting", "Huge TIFO displays", "A close, dramatic match", "Fans singing together"] },
  { question: "Which comeback is more impressive?", options: ["Trailing by 3 goals", "Scoring in stoppage time", "Coming back with 10 players", "Winning after extra time"] },
  { question: "What is the most underrated football skill?", options: ["Off-ball movement", "Scanning and awareness", "First touch", "Defensive positioning"] },
  { question: "Should VAR decisions be explained live to fans in the stadium?", options: ["Yes, every time", "Only for major decisions", "No, keep it as it is", "Use referee microphones"] },
  { question: "What is the best type of goal to watch?", options: ["Long-range screamer", "Team passing move", "Solo dribble", "Last-minute winner"] },
  { question: "Which tactical approach is most exciting?", options: ["High-pressing football", "Counter-attacking", "Possession football", "Direct attacking football"] },
  { question: "What should clubs prioritise in the transfer market?", options: ["Young talent", "Experienced leaders", "Players who fit the system", "The best available talent"] },
  { question: "Who deserves more credit after a clean sheet?", options: ["The goalkeeper", "The centre-backs", "The whole defence", "The defensive midfielder"] },
  { question: "Which competition creates the most pressure?", options: ["World Cup", "Champions League", "Domestic league", "Domestic cup final"] },
  { question: "What makes a great captain?", options: ["Leading by example", "Motivating teammates", "Staying calm under pressure", "All of these"] },
  { question: "Would you accept a boring 1–0 win for your club?", options: ["Absolutely — three points!", "Only in a big match", "No, I want entertainment", "Depends on the opponent"] },
  { question: "Which is the toughest place for an away team to play?", options: ["A loud historic stadium", "A fierce local derby", "A title-race six-pointer", "A hostile knockout away leg"] },
  { question: "What should happen when a player dives?", options: ["Yellow card every time", "VAR review when relevant", "Retrospective punishment", "Referee's judgement is enough"] },
  { question: "Which is more important for a young player?", options: ["Regular playing time", "Elite coaching", "Strong mentality", "Playing in a top league"] },
  { question: "What is the most exciting moment in football?", options: ["A last-minute winner", "A penalty shootout", "A derby goal", "A title-winning moment"] },
  { question: "Should goal-line technology be used in every professional league?", options: ["Yes, everywhere", "Only top divisions", "No, too expensive", "Use it when possible"] },
  { question: "Which player role is most underappreciated?", options: ["Defensive midfielder", "Full-back", "Off-the-ball striker", "Backup goalkeeper"] }
];

const IMAGE_POLLS = [
  {
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85",
    caption: "FOOTBALL ATMOSPHERE ⚽\nWhat makes a stadium night special?",
    question: "What creates the best matchday atmosphere?",
    options: ["Fans singing together", "Huge TIFO displays", "A fierce rivalry", "A dramatic match"]
  },
  {
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85",
    caption: "THE BEAUTIFUL GAME ⚽\nWhich style would you rather watch?",
    question: "Which style of football do you enjoy most?",
    options: ["Fast counter-attacks", "Possession and control", "High pressing", "Creative individual play"]
  },
  {
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=85",
    caption: "MATCHDAY DEBATE 🔥\nEvery fan has an opinion!",
    question: "What wins the biggest matches?",
    options: ["Tactical discipline", "Individual brilliance", "Team spirit", "Experience under pressure"]
  },
  {
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85",
    caption: "FOOTBALL QUIZ ⚽\nThink like a manager!",
    question: "Your team is 1–0 up with 10 minutes left. What should it do?",
    options: ["Keep attacking", "Control possession", "Defend deeper", "Make tactical substitutions"]
  }
];

module.exports = { TEXT_POLLS, IMAGE_POLLS };
