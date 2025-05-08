// Initial References
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("user-input-section");
const hintContainer = document.getElementById("hint-container");
const hintButton = document.getElementById("hint-button");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const skipButton = document.getElementById("skip-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const topicHeading = document.getElementById("topic-heading");
const topicDropdown = document.getElementById("topic-dropdown");
const gameContainer = document.getElementById("words-block");
const canvasMessage = document.getElementById("canvas-message");

// Topics with words and hints
const topics = [
  {
    category: "Countries",
    words: [
      { name: "United States", hints: ["North America.", "Diverse culture.", "Statue of Liberty.", "Large economy.", "Elvis Presley."] },
      { name: "Brazil", hints: ["South America.", "Carnival festival.", "Amazon Rainforest.", "Famous for soccer.", "Pelé."] },
      { name: "Canada", hints: ["North America.", "Maple leaf.", "Hockey.", "Niagara Falls.", "Cold winters."] },
      { name: "China", hints: ["Asia.", "Great Wall.", "Pandas.", "Largest population.", "Tea."] },
      { name: "France", hints: ["Europe.", "Eiffel Tower.", "Paris.", "Baguettes.", "Fashion."] },
      { name: "India", hints: ["Asia.", "Taj Mahal.", "Spicy food.", "Bollywood.", "Elephants."] },
      { name: "Japan", hints: ["Asia.", "Mount Fuji.", "Sushi.", "Cherry blossoms.", "Samurai."] },
      { name: "Australia", hints: ["Oceania.", "Sydney Opera House.", "Kangaroos.", "Great Barrier Reef.", "Outback."] },
      { name: "Egypt", hints: ["Africa.", "Pyramids.", "Pharaohs.", "Nile River.", "Sphinx."] },
      { name: "Italy", hints: ["Europe.", "Rome.", "Pizza.", "Colosseum.", "Venice."] }
    ]
  },
  {
    category: "Fruits",
    words: [
      { name: "Apple", hints: ["Common fruit.", "Red, green, yellow.", "Keeps the doctor away.", "Used to make cider.", "An apple a day..."] },
      { name: "Banana", hints: ["Long, yellow fruit.", "High in potassium.", "Monkeys love it.", "Used in smoothies.", "Can be eaten raw or cooked."] },
      { name: "Orange", hints: ["Citrus fruit.", "Orange color.", "Juicy.", "Vitamin C.", "Peel to eat."] },
      { name: "Grapes", hints: ["Small, round fruit.", "Grows in bunches.", "Can be green or purple.", "Used to make wine.", "Raisins are dried..."] },
      { name: "Strawberry", hints: ["Red fruit.", "Has seeds on the outside.", "Sweet.", "Used in desserts.", "Summer fruit."] },
      { name: "Watermelon", hints: ["Large, green fruit.", "Red inside.", "Lots of seeds.", "Summer fruit.", "Very juicy."] },
      { name: "Pineapple", hints: ["Tropical fruit.", "Spiky outside.", "Sweet and sour.", "Yellow inside.", "Used in piña colada."] },
      { name: "Mango", hints: ["Tropical fruit.", "Orange inside.", "Sweet.", "Stone fruit.", "Used in smoothies."] },
      { name: "Blueberry", hints: ["Small, blue fruit.", "Grows on bushes.", "Sweet.", "Used in muffins.", "Summer fruit."] },
      { name: "Kiwi", hints: ["Brown, fuzzy outside.", "Green inside.", "Tiny black seeds.", "Sweet and tart.", "Tropical fruit."] }
    ]
  },
  {
    category: "Animals",
    words: [
      { name: "Lion", hints: ["Big cat.", "King of the jungle.", "Mane.", "Roars.", "Lives in Africa."] },
      { name: "Elephant", hints: ["Large animal.", "Big ears.", "Long trunk.", "Tusks.", "Lives in Africa and Asia."] },
      { name: "Giraffe", hints: ["Tall animal.", "Long neck.", "Spots.", "Eats leaves.", "Lives in Africa."] },
      { name: "Kangaroo", hints: ["Australia.", "Hops.", "Pouch.", "Marsupial.", "Eats plants."] },
      { name: "Panda", hints: ["Black and white.", "Bear.", "Eats bamboo.", "Lives in China.", "Cute."] },
      { name: "Penguin", hints: ["Bird.", "Cannot fly.", "Lives in Antarctica.", "Waddles.", "Eats fish."] },
      { name: "Dolphin", hints: ["Ocean.", "Smart.", "Mammal.", "Echolocation.", "Swims fast."] },
      { name: "Tiger", hints: ["Big cat.", "Stripes.", "Roars.", "Lives in Asia.", "Strong."] },
      { name: "Zebra", hints: ["Stripes.", "Horse family.", "Lives in Africa.", "Herbivore.", "Fast runner."] },
      { name: "Koala", hints: ["Australia.", "Eats eucalyptus.", "Marsupial.", "Sleeps a lot.", "Cute."] }
    ]
  },
  {
    category: "Colors",
    words: [
      { name: "Red", hints: ["Color of fire.", "Color of apples.", "Color of stop signs.", "Primary color.", "Color of roses."] },
      { name: "Blue", hints: ["Color of the sky.", "Color of the ocean.", "Primary color.", "Color of blueberries.", "Calm color."] },
      { name: "Green", hints: ["Color of grass.", "Color of leaves.", "Color of limes.", "Primary color.", "Nature color."] },
      { name: "Yellow", hints: ["Color of the sun.", "Color of bananas.", "Bright color.", "Primary color.", "Color of lemons."] },
      { name: "Orange", hints: ["Color of oranges.", "Mix of red and yellow.", "Warm color.", "Color of pumpkins.", "Bright color."] },
      { name: "Purple", hints: ["Color of grapes.", "Mix of red and blue.", "Royal color.", "Color of lavender.", "Deep color."] },
      { name: "Pink", hints: ["Color of cotton candy.", "Mix of red and white.", "Light color.", "Color of flamingos.", "Sweet color."] },
      { name: "Black", hints: ["Color of the night.", "Opposite of white.", "Dark color.", "Color of coal.", "Strong color."] },
      { name: "White", hints: ["Color of snow.", "Opposite of black.", "Bright color.", "Color of milk.", "Pure color."] },
      { name: "Brown", hints: ["Color of chocolate.", "Color of soil.", "Earth color.", "Color of bears.", "Neutral color."] }
    ]
  },
  {
    category: "Shapes",
    words: [
      { name: "Circle", hints: ["Round.", "No corners.", "Looks like a wheel.", "Smooth.", "Continuous line."] },
      { name: "Square", hints: ["Four equal sides.", "Four corners.", "Looks like a box.", "Equal angles.", "Straight lines."] },
      { name: "Triangle", hints: ["Three sides.", "Three corners.", "Looks like a pyramid.", "Equal or different sides.", "Straight lines."] },
      { name: "Rectangle", hints: ["Four sides.", "Two long sides.", "Two short sides.", "Four corners.", "Looks like a door."] },
      { name: "Oval", hints: ["Egg-shaped.", "Round.", "No corners.", "Stretched circle.", "Smooth."] },
      { name: "Star", hints: ["Five points.", "Shines.", "Seen in the sky.", "Twinkles.", "Looks like a drawing."] },
      { name: "Heart", hints: ["Two curves.", "Pointed bottom.", "Symbol of love.", "Looks like a Valentine's card.", "Red color."] },
      { name: "Diamond", hints: ["Four sides.", "Pointed top and bottom.", "Looks like a kite.", "Two wide sides.", "Two narrow sides."] },
      { name: "Hexagon", hints: ["Six sides.", "Six corners.", "Beehive shape.", "Equal or different sides.", "Straight lines."] },
      { name: "Pentagon", hints: ["Five sides.", "Five corners.", "Equal or different sides.", "Looks like a house.", "Straight lines."] }
    ]
  },
  {
    category: "Vehicles",
    words: [
      { name: "Car", hints: ["Has wheels.", "Drives on roads.", "Has a steering wheel.", "Transports people.", "Has an engine."] },
      { name: "Bicycle", hints: ["Two wheels.", "Pedals.", "Handlebars.", "Rides on roads.", "Human-powered."] },
      { name: "Airplane", hints: ["Flies in the sky.", "Has wings.", "Has engines.", "Carries passengers.", "Flies long distances."] },
      { name: "Train", hints: ["Runs on tracks.", "Has carriages.", "Carries passengers and goods.", "Has a locomotive.", "Travels long distances."] },
      { name: "Bus", hints: ["Large vehicle.", "Carries many passengers.", "Has stops.", "Drives on roads.", "Public transport."] },
      { name: "Truck", hints: ["Large vehicle.", "Carries goods.", "Has a cargo area.", "Drives on roads.", "Can be very big."] },
      { name: "Boat", hints: ["Floats on water.", "Used for traveling on rivers and lakes.", "Can be rowed or have a motor.", "Can be small or large.", "Used for fishing."] },
      { name: "Helicopter", hints: ["Flies in the sky.", "Has rotors on top.", "Can hover in place.", "Used for rescue and transport.", "Can land on small areas."] },
      { name: "Motorcycle", hints: ["Two wheels.", "Has an engine.", "Rides on roads.", "Faster than a bicycle.", "Needs a helmet."] },
      { name: "Scooter", hints: ["Two wheels.", "Stands on it.", "Kicks to move.", "Has handlebars.", "Fun for kids."] }
    ]
  },
  {
    category: "Food",
    words: [
      { name: "Pizza", hints: ["Round.", "Has cheese.", "Often has pepperoni.", "Baked in an oven.", "Popular in Italy."] },
      { name: "Ice Cream", hints: ["Cold.", "Sweet.", "Melts.", "Comes in a cone.", "Popular in summer."] },
      { name: "Banana", hints: ["Yellow.", "Curved.", "Peel it to eat.", "Monkeys love it.", "Rich in potassium."] },
      { name: "Apple", hints: ["Round.", "Can be red or green.", "Keeps the doctor away.", "Grows on trees.", "Often found in pies."] },
      { name: "Carrot", hints: ["Orange.", "Crunchy.", "Bugs Bunny eats it.", "Grows underground.", "Good for eyesight."] },
      { name: "Bread", hints: ["Made from flour.", "Baked.", "Used for sandwiches.", "Can be white or brown.", "Common breakfast food."] },
      { name: "Cheese", hints: ["Made from milk.", "Can be sliced.", "Used in sandwiches.", "Comes in many types.", "Popular in pizzas."] },
      { name: "Tomato", hints: ["Red.", "Round.", "Used in salads.", "Can be made into ketchup.", "Grows on a vine."] },
      { name: "Egg", hints: ["Comes from chickens.", "Can be boiled.", "Used in baking.", "Often eaten for breakfast.", "Has a shell."] },
      { name: "Fish", hints: ["Lives in water.", "Can be grilled.", "Eaten with chips.", "Has fins.", "Rich in omega-3."] }
    ]
  },
  {
    category: "Sports",
    words: [
      { name: "Soccer", hints: ["Played with a round ball.", "Has goals.", "Popular worldwide.", "Teams have 11 players.", "Known as football outside the US."] },
      { name: "Basketball", hints: ["Played with an orange ball.", "Has hoops.", "Teams have 5 players.", "Dribbled on a court.", "Michael Jordan's sport."] },
      { name: "Tennis", hints: ["Played with a racket.", "Uses a yellow ball.", "Played on a court.", "Has nets.", "Famous players include Serena Williams."] },
      { name: "Swimming", hints: ["Done in water.", "Uses various strokes.", "Olympic sport.", "Requires goggles.", "Michael Phelps' sport."] },
      { name: "Baseball", hints: ["Uses a bat.", "Has bases.", "Played with a white ball.", "Teams have 9 players.", "Popular in the USA."] },
      { name: "Gymnastics", hints: ["Involves flips and jumps.", "Uses beams and bars.", "Requires flexibility.", "Olympic sport.", "Famous gymnast: Simone Biles."] },
      { name: "Cycling", hints: ["Uses bicycles.", "Can be competitive.", "Tour de France.", "Requires helmets.", "Good exercise."] },
      { name: "Golf", hints: ["Uses clubs.", "Has holes.", "Played on a course.", "Uses small white balls.", "Famous player: Tiger Woods."] },
      { name: "Volleyball", hints: ["Played with a net.", "Uses a ball.", "Teams have 6 players.", "Played on a court or beach.", "Popular in the Olympics."] },
      { name: "Cricket", hints: ["Uses a bat and ball.", "Played on a pitch.", "Teams have 11 players.", "Popular in England and India.", "Has wickets."] }
    ]
  },
  {
    category: "Nature",
    words: [
      { name: "Tree", hints: ["Has leaves.", "Grows tall.", "Produces oxygen.", "Home to birds.", "Grows from a seed."] },
      { name: "Flower", hints: ["Colorful.", "Has petals.", "Grows in gardens.", "Bees love it.", "Can be given as a gift."] },
      { name: "River", hints: ["Flows.", "Contains water.", "Can be wide or narrow.", "Home to fish.", "Flows to the sea."] },
      { name: "Mountain", hints: ["Very tall.", "Made of rock.", "Can be climbed.", "Often has snow at the top.", "Part of the landscape."] },
      { name: "Ocean", hints: ["Very large.", "Salty water.", "Home to whales.", "Covers most of Earth.", "Has waves."] },
      { name: "Desert", hints: ["Very dry.", "Has sand.", "Little rain.", "Can be hot or cold.", "Few plants."] },
      { name: "Rainbow", hints: ["Has many colors.", "Seen after rain.", "Arch-shaped.", "In the sky.", "Caused by sunlight."] },
      { name: "Forest", hints: ["Lots of trees.", "Home to animals.", "Can be dense.", "Provides shade.", "Found in many places."] },
      { name: "Cloud", hints: ["Seen in the sky.", "Made of water droplets.", "Can be white or gray.", "Causes rain.", "Fluffy appearance."] },
      { name: "Sun", hints: ["Bright.", "Hot.", "Star.", "Gives light and warmth.", "Rises in the east."] }
    ]
  },
  {
    category: "Sports Players",
    words: [
      { name: "Michael Jordan", hints: ["Famous basketball player.", "Played for the Chicago Bulls.", "Won 6 NBA championships.", "Considered the greatest of all time.", "Known for his incredible dunks."] },
      { name: "Lionel Messi", hints: ["Famous soccer player.", "Played for FC Barcelona.", "Won multiple Ballon d'Or awards.", "Argentine.", "Known for his dribbling skills."] },
      { name: "Serena Williams", hints: ["Famous tennis player.", "Won 23 Grand Slam singles titles.", "American.", "Known for her powerful serve.", "One of the greatest female athletes."] },
      { name: "Tom Brady", hints: ["Famous American football player.", "Played for the New England Patriots.", "Won 7 Super Bowl titles.", "Considered the greatest quarterback.", "Known for his leadership and passing skills."] },
      { name: "Usain Bolt", hints: ["Famous sprinter.", "From Jamaica.", "World's fastest man.", "Won 8 Olympic gold medals.", "Known for his lightning speed."] },
      { name: "Roger Federer", hints: ["Famous tennis player.", "Won 20 Grand Slam singles titles.", "Swiss.", "Known for his elegant playing style.", "Considered one of the greatest in tennis."] },
      { name: "LeBron James", hints: ["Famous basketball player.", "Played for the Cleveland Cavaliers and Los Angeles Lakers.", "Won 4 NBA championships.", "Known for his versatility and athleticism.", "One of the best players in the NBA."] },
      { name: "Cristiano Ronaldo", hints: ["Famous soccer player.", "Played for Real Madrid and Manchester United.", "Portuguese.", "Won multiple Ballon d'Or awards.", "Known for his goal-scoring abilities."] },
      { name: "Tiger Woods", hints: ["Famous golfer.", "Won 15 major championships.", "American.", "Known for his dominance in golf.", "Considered one of the greatest golfers."] },
      { name: "Simone Biles", hints: ["Famous gymnast.", "Won multiple Olympic gold medals.", "American.", "Known for her difficult routines.", "One of the greatest gymnasts of all time."] }
    ]
  },
  {
    category: "Music Instruments",
    words: [
      { name: "Piano", hints: ["Has keys.", "Played with fingers.", "Often used in classical music.", "Can be upright or grand.", "Produces sound by hammering strings."] },
      { name: "Guitar", hints: ["Has strings.", "Played with fingers or a pick.", "Common in rock and pop music.", "Can be acoustic or electric.", "Produces sound by plucking strings."] },
      { name: "Drum", hints: ["Percussion instrument.", "Played with sticks.", "Common in many music genres.", "Produces sound by striking a membrane.", "Part of a drum set."] },
      { name: "Violin", hints: ["Has strings.", "Played with a bow.", "Common in classical music.", "Produces sound by drawing the bow across the strings.", "Small and held under the chin."] },
      { name: "Flute", hints: ["Woodwind instrument.", "Played by blowing air.", "Has keys.", "Common in classical and jazz music.", "Produces sound by blowing air across an opening."] },
      { name: "Trumpet", hints: ["Brass instrument.", "Played by buzzing lips.", "Has valves.", "Common in classical and jazz music.", "Produces a bright, powerful sound."] },
      { name: "Saxophone", hints: ["Woodwind instrument.", "Played with a reed.", "Common in jazz music.", "Has keys.", "Produces a smooth, rich sound."] },
      { name: "Harp", hints: ["Has strings.", "Played with fingers.", "Common in classical music.", "Large and often triangular.", "Produces a soft, ethereal sound."] },
      { name: "Clarinet", hints: ["Woodwind instrument.", "Played with a reed.", "Common in classical and jazz music.", "Has keys.", "Produces a warm, mellow sound."] },
      { name: "Cello", hints: ["Has strings.", "Played with a bow.", "Common in classical music.", "Larger than a violin.", "Produces a deep, rich sound."] }
    ]
  },
  {
    category: "Jobs",
    words: [
      { name: "Teacher", hints: ["Works in a school.", "Teaches students.", "Gives homework.", "Grades tests.", "Helps children learn."] },
      { name: "Doctor", hints: ["Works in a hospital.", "Helps sick people.", "Uses a stethoscope.", "Prescribes medicine.", "Can perform surgery."] },
      { name: "Police Officer", hints: ["Maintains law and order.", "Wears a uniform.", "Drives a police car.", "Helps keep people safe.", "Can arrest criminals."] },
      { name: "Firefighter", hints: ["Puts out fires.", "Wears a helmet.", "Drives a fire truck.", "Helps in emergencies.", "Uses a hose."] },
      { name: "Chef", hints: ["Works in a kitchen.", "Cooks food.", "Uses recipes.", "Wears a hat.", "Can work in a restaurant."] },
      { name: "Engineer", hints: ["Designs and builds things.", "Uses math and science.", "Works on projects.", "Can build bridges.", "Solves problems."] },
      { name: "Pilot", hints: ["Flies airplanes.", "Works in an airport.", "Wears a uniform.", "Uses a cockpit.", "Takes passengers to destinations."] },
      { name: "Farmer", hints: ["Works on a farm.", "Grows crops.", "Raises animals.", "Uses a tractor.", "Produces food."] },
      { name: "Artist", hints: ["Creates art.", "Uses paint and brushes.", "Can draw or sculpt.", "Shows work in galleries.", "Expresses creativity."] },
      { name: "Nurse", hints: ["Works in a hospital.", "Helps doctors.", "Cares for patients.", "Can give medicine.", "Wears scrubs."] }
    ]
  },
  {
    category: "Home",
    words: [
      { name: "Bed", hints: ["You sleep on it.", "Has a mattress.", "Often in a bedroom.", "Can be single or double.", "You use blankets and pillows."] },
      { name: "Sofa", hints: ["You sit on it.", "Usually in a living room.", "Can be a couch.", "Comfortable seating.", "Often used for watching TV."] },
      { name: "Table", hints: ["You eat on it.", "Has legs.", "Often in a dining room.", "Can be round or rectangular.", "Used to hold things."] },
      { name: "Chair", hints: ["You sit on it.", "Has legs and a back.", "Often used with a table.", "Can have armrests.", "Found in many rooms."] },
      { name: "Lamp", hints: ["Provides light.", "Can stand on a table.", "Often has a shade.", "Uses a bulb.", "Turned on and off with a switch."] },
      { name: "Refrigerator", hints: ["Keeps food cold.", "Found in the kitchen.", "Has a freezer section.", "Stores perishable items.", "Runs on electricity."] },
      { name: "Oven", hints: ["Used for baking.", "Found in the kitchen.", "Can be gas or electric.", "Gets very hot.", "Often used for cooking."] },
      { name: "Television", hints: ["Shows programs.", "Often in the living room.", "Can be flat-screen.", "Displays movies and shows.", "Controlled with a remote."] },
      { name: "Wardrobe", hints: ["Stores clothes.", "Found in the bedroom.", "Has doors.", "Can have drawers.", "Keeps clothes organized."] },
      { name: "Mirror", hints: ["Reflects images.", "Often in the bathroom.", "Used for checking appearance.", "Can be handheld or mounted.", "Has a glass surface."] }
    ]
  },
  {
    category: "Entertainers",
    words: [
      { name: "Mickey Mouse", hints: ["Created by Walt Disney.", "Famous cartoon character.", "Has large round ears.", "Wears red shorts.", "Friends with Donald Duck and Goofy."] },
      { name: "Elmo", hints: ["Red Muppet.", "Lives on Sesame Street.", "Loves to laugh.", "Has a goldfish named Dorothy.", "Speaks in the third person."] },
      { name: "SpongeBob", hints: ["Lives in a pineapple under the sea.", "Works at the Krusty Krab.", "Best friend is Patrick Star.", "Has a pet snail named Gary.", "Wears square pants."] },
      { name: "Barbie", hints: ["Fashion doll.", "First introduced in 1959.", "Has many careers.", "Lives in a Dreamhouse.", "Famous for her pink wardrobe."] },
      { name: "Batman", hints: ["Superhero.", "Real name is Bruce Wayne.", "Lives in Gotham City.", "Has a sidekick named Robin.", "Drives the Batmobile."] },
      { name: "Spider-Man", hints: ["Superhero.", "Real name is Peter Parker.", "Can climb walls.", "Shoots webs.", "Lives in New York City."] },
      { name: "Elsa", hints: ["From the movie Frozen.", "Has ice powers.", "Queen of Arendelle.", "Sister is Anna.", "Sings 'Let It Go'."] },
      { name: "Harry Potter", hints: ["Boy wizard.", "Goes to Hogwarts.", "Has a lightning bolt scar.", "Friends with Ron and Hermione.", "Fights Voldemort."] },
      { name: "Dora", hints: ["Explorer.", "Speaks Spanish and English.", "Has a backpack.", "Friends with Boots the monkey.", "Solves problems with a map."] },
      { name: "Mario", hints: ["Video game character.", "Wears a red hat.", "Has a brother named Luigi.", "Saves Princess Peach.", "Famous for jumping."] }
    ]
  },
  {
    category: "Singers",
    words: [
      { name: "Taylor Swift", hints: ["Famous pop singer.", "Known for 'Shake It Off'.", "Started in country music.", "Writes her own songs.", "Album '1989'."] },
      { name: "Beyoncé", hints: ["Former member of Destiny's Child.", "Hit song 'Single Ladies'.", "Married to Jay-Z.", "Known as Queen Bey.", "Album 'Lemonade'."] },
      { name: "Justin Bieber", hints: ["Canadian pop singer.", "Discovered on YouTube.", "Hit song 'Baby'.", "Married to Hailey Baldwin.", "Album 'Purpose'."] },
      { name: "Ariana Grande", hints: ["Former Nickelodeon star.", "Hit song 'Thank U, Next'.", "High ponytail hairstyle.", "Album 'Sweetener'.", "Known for her powerful voice."] },
      { name: "Ed Sheeran", hints: ["British singer-songwriter.", "Hit song 'Shape of You'.", "Plays guitar.", "Album '+' (Plus).", "Known for his red hair."] },
      { name: "Selena Gomez", hints: ["Former Disney star.", "Hit song 'Come & Get It'.", "Actress in 'Wizards of Waverly Place'.", "Founded Rare Beauty.", "Album 'Revival'."] },
      { name: "Bruno Mars", hints: ["Hit song 'Uptown Funk'.", "Known for energetic performances.", "Album '24K Magic'.", "Plays multiple instruments.", "Real name is Peter Gene Hernandez."] },
      { name: "Shawn Mendes", hints: ["Canadian singer-songwriter.", "Hit song 'Stitches'.", "Plays guitar.", "Album 'Illuminate'.", "Known for his boy-next-door image."] },
      { name: "Rihanna", hints: ["Hit song 'Umbrella'.", "Founder of Fenty Beauty.", "From Barbados.", "Album 'Anti'.", "Actress in 'Ocean's 8'."] },
      { name: "Billie Eilish", hints: ["Young pop sensation.", "Hit song 'Bad Guy'.", "Known for her unique style.", "Album 'When We All Fall Asleep, Where Do We Go?'", "Often changes hair color."] }
    ]
  },
];

// Variables
let winCount = 0;
let count = 0;
let chosenWord = "";
let chosenHints = [];
let hintIndex = 0;
let remainingGuesses = 5;
let remainingHints = 5;
let currentTopic = null;

// Block all the Buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

// Generate topic options for dropdown
const generateTopicOptions = () => {
  topics.forEach((topic, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.innerText = topic.category;
    topicDropdown.appendChild(option);
  });
};

// Handle topic selection from dropdown
topicDropdown.addEventListener("change", (event) => {
  const selectedIndex = event.target.value;
  if (selectedIndex) {
    selectTopic(selectedIndex);
  }
});

// Handle topic selection
const selectTopic = (index) => {
  currentTopic = topics[index];
  if (topicHeading) {
    topicHeading.innerText = `Topic: ${currentTopic.category}`;
  }
  gameContainer.classList.remove("hide");
  initializer();
};

// Word Generator
const generateWord = () => {
  if (!currentTopic) {
    console.error("No topic selected!");
    return;
  }

  const randomWord = currentTopic.words[Math.floor(Math.random() * currentTopic.words.length)];

  chosenWord = randomWord.name.toUpperCase();
  chosenHints = randomWord.hints;

  // Add hints for the first and last letters
  chosenHints.push(`The first letter is ${chosenWord[0]}.`);
  chosenHints.push(`The last letter is ${chosenWord[chosenWord.length - 1]}.`);
  

  // Reset hint index and remaining hints for the new word
  hintIndex = 0;
  remainingHints = 5;

  // 처음엔 hint를 비워둠
  if (hintContainer) {
    hintContainer.innerText = "";
  }

  // Replace every letter with a span containing a dash, handle spaces
  let displayItem = chosenWord.split('').map(char => {
    if (char === ' ') return '<span class="space"> </span>';
    // 랜덤 길이와 margin
    const width = 32 + Math.floor(Math.random() * 18); // 32~49px
    const margin = 12 + Math.floor(Math.random() * 18); // 12~29px
    return `<span class="dashes" style="min-width:${width}px; margin-right:${margin}px;">_</span>`;
  }).join('');

  // Display each element as a span
  userInputSection.innerHTML = displayItem;
};

// Initial Function (Called when page loads/user presses new game or skip)
const initializer = () => {
  winCount = 0;
  count = 0;
  hintIndex = 0;
  remainingGuesses = 5;
  remainingHints = 5;

  userInputSection.innerHTML = "";
  hintContainer.innerText = "";
  resultText.innerText = "";
  canvasMessage.textContent = "";
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  hintButton.disabled = false;

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    let colorClass = "color" + (Math.floor(Math.random() * 10) + 1);
    button.classList.add(colorClass);
    button.style.position = "relative";  // To position the "X" correctly

    // Create a span to hold the "X" mark
    let mark = document.createElement("span");
    mark.classList.add("mark");
    mark.style.position = "absolute";
    mark.style.top = "0";
    mark.style.right = "0";
    mark.style.color = "red";
    mark.style.fontSize = "18px";
    mark.style.display = "none";
    mark.innerText = "X";

    button.appendChild(mark);

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.querySelectorAll(".dashes, .space");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount === charArray.filter(c => c !== ' ').length) {
              canvasMessage.textContent = "Great!";
              resultText.innerHTML = "";
              blocker();
            }
          }
        });
      } else {
        count += 1;
        remainingGuesses -= 1;
        drawMan(count);
        mark.style.display = "block";  // Show the "X" mark
        if (count === 6) {
          canvasMessage.textContent = "Sorry! The answer was " + chosenWord;
          resultText.innerHTML = "";
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  // for문 이후에 반드시 generateWord() 호출
  if (currentTopic) {
    generateWord();
  }

  // 항상 교수대(행맨 기본 그림)를 초기화
  let { initialDrawing } = canvasCreator();
  initialDrawing();

  // currentTopic이 없을 때만 밑줄 표시
  if (!currentTopic) {
    userInputSection.innerHTML = '<span class="dashes">_</span> '.repeat(5);
  }
};

// Function to generate a random color
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Hint button event listener
hintButton.addEventListener("click", () => {
  if (remainingHints > 0 && hintIndex < chosenHints.length) {
    hintContainer.innerText = `${chosenHints[hintIndex]}`;
    hintIndex += 1;
    remainingHints -= 1;
  } else {
    hintButton.disabled = true;
  }
});

// Skip button event listener
skipButton.addEventListener("click", () => {
  generateWord();
});

// Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  // 코믹한 얼굴
  const head = (isLose = false) => {
    context.beginPath();
    context.arc(70, 30, 15, 0, Math.PI * 2, true); // bigger head
    context.fillStyle = "#fffbe7";
    context.fill();
    context.stroke();

    // Eyes
    context.beginPath();
    context.arc(64, 27, 2.5, 0, Math.PI * 2, true); // left
    context.arc(76, 27, 2.5, 0, Math.PI * 2, true); // right
    context.fillStyle = "#222";
    context.fill();

    // Mouth (웃음/찡그림)
    context.beginPath();
    if (isLose) {
      context.arc(70, 36, 6, Math.PI, 0, true); // sad
    } else {
      context.arc(70, 34, 6, 0, Math.PI, false); // smile
    }
    context.strokeStyle = "#222";
    context.lineWidth = 2;
    context.stroke();
  };

  const body = () => {
    drawLine(70, 45, 70, 90);
  };
  // 팔, 다리 각도 더 코믹하게
  const leftArm = () => { drawLine(70, 55, 50, 60); };
  const rightArm = () => { drawLine(70, 55, 90, 60); };
  const leftLeg = () => { drawLine(70, 90, 55, 120); };
  const rightLeg = () => { drawLine(70, 90, 85, 120); };

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head(count === 6); // 실패 시 찡그린 얼굴
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      head(true); // 마지막에 찡그린 얼굴로 다시 그림
      break;
    default:
      break;
  }
};

newGameButton.addEventListener("click", initializer);

window.onload = () => {
  generateTopicOptions();  // Generate topic options for the dropdown
  initializer();
};

