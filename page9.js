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
      {
        "name": "United States",
        "hints": [
          "This country is in North America and has 50 states.",
          "It is known for its mix of cultures and people from all over the world.",
          "The Statue of Liberty is one of its most famous symbols.",
          "It has one of the biggest economies in the world.",
          "A famous singer from here is Elvis Presley."
        ]
      },
      {
        "name": "Brazil",
        "hints": [
          "This country is in South America and speaks Portuguese.",
          "It has a big festival called Carnival with dancing and costumes.",
          "The Amazon Rainforest is mostly in this country.",
          "People here love soccer and have won the World Cup many times.",
          "Pelé, a world-famous soccer player, is from this country."
        ]
      },
      {
        "name": "Canada",
        "hints": [
          "This country is in North America, above the United States.",
          "Its flag has a red maple leaf in the middle.",
          "Ice hockey is one of the most popular sports here.",
          "You can visit the beautiful Niagara Falls here.",
          "The winters are very cold with a lot of snow."
        ]
      },
      {
        "name": "China",
        "hints": [
          "This is a large country in Asia with many people.",
          "It has a long wall called the Great Wall that you can see from space.",
          "Pandas live in the forests of this country.",
          "It has the largest population in the world.",
          "People here have a long history of drinking tea."
        ]
      },
      {
        "name": "France",
        "hints": [
          "This country is in Europe and has a city called Paris.",
          "The Eiffel Tower is one of its most famous places.",
          "People here are known for fashion and style.",
          "They enjoy eating baguettes and cheese.",
          "It is a popular place for tourists to visit."
        ]
      },
      {
        "name": "India",
        "hints": [
          "This country is in Asia and has a lot of different cultures.",
          "The Taj Mahal is a beautiful white building here.",
          "People here love spicy food and use many kinds of spices.",
          "It is home to Bollywood, the biggest movie industry in the world.",
          "Elephants are respected and sometimes used in festivals."
        ]
      },
      {
        "name": "Japan",
        "hints": [
          "This country is in Asia and has many islands.",
          "Mount Fuji is a tall, snowy mountain here.",
          "People love to eat sushi and rice dishes.",
          "In spring, cherry blossom trees bloom all over.",
          "Long ago, there were warriors called samurai."
        ]
      },
      {
        "name": "Australia",
        "hints": [
          "This country is in Oceania and is also a continent.",
          "The Sydney Opera House is shaped like white sails.",
          "You can see kangaroos and koalas in the wild here.",
          "It has a giant coral reef called the Great Barrier Reef.",
          "The Outback is a big, dry area in the middle of the country."
        ]
      },
      {
        "name": "Egypt",
        "hints": [
          "This country is in Africa and has a desert climate.",
          "The ancient pyramids were built here a long time ago.",
          "Pharaohs were powerful rulers from the past.",
          "The Nile River flows through this country.",
          "You can see the Sphinx, a statue with a lion's body and a human face."
        ]
      },
      {
        "name": "Italy",
        "hints": [
          "This country is in Europe and shaped like a boot.",
          "Its capital city is Rome, which has old buildings and ruins.",
          "Pizza and pasta are famous foods from here.",
          "The Colosseum is a big round stadium from ancient times.",
          "Venice is a city with canals instead of streets."
        ]
      }
    ]
  },
  
  {
    "category": "Jobs",
    "words": [
      {
        "name": "Teacher",
        "hints": [
          "This person works at a school and helps students learn new things.",
          "They explain lessons and make sure everyone understands the subject.",
          "They give homework so students can practice at home.",
          "They check and grade tests to see how well students are doing.",
          "Teachers love helping children grow smarter and more confident."
        ]
      },
      {
        "name": "Doctor",
        "hints": [
          "This person works at a hospital or clinic and helps people who are sick.",
          "They listen to your symptoms and find out what's wrong with you.",
          "They often use a stethoscope to check your heartbeat.",
          "Doctors give you medicine to help you feel better.",
          "They can also do surgeries if someone needs an operation."
        ]
      },
      {
        "name": "Police Officer",
        "hints": [
          "This person keeps people safe by making sure everyone follows the law.",
          "They wear a uniform so people can recognize them easily.",
          "They drive special police cars when responding to emergencies.",
          "They help people in danger and keep peace in the community.",
          "Police officers can arrest people who break the law."
        ]
      },
      {
        "name": "Firefighter",
        "hints": [
          "This person puts out fires and rescues people from dangerous places.",
          "They wear a strong helmet and special clothes to stay safe.",
          "They drive big red fire trucks with loud sirens.",
          "Firefighters help during emergencies like car accidents and floods.",
          "They use a hose to spray water and stop fires from spreading."
        ]
      },
      {
        "name": "Chef",
        "hints": [
          "This person works in a kitchen and makes delicious food.",
          "They follow recipes and mix ingredients to make meals.",
          "Chefs wear tall white hats and aprons while cooking.",
          "They prepare food in restaurants for many hungry customers.",
          "They make sure every dish looks and tastes perfect."
        ]
      },
      {
        "name": "Engineer",
        "hints": [
          "This person uses science and math to design and build things.",
          "They work on big projects like buildings, machines, or bridges.",
          "Engineers love solving problems and making ideas come to life.",
          "They use tools, computers, and blueprints to plan their work.",
          "Their work helps make our lives easier and safer."
        ]
      },
      {
        "name": "Pilot",
        "hints": [
          "This person flies airplanes and takes people to different places.",
          "They work at airports and spend time in the cockpit.",
          "Pilots wear uniforms and sometimes special hats.",
          "They use many buttons and controls to fly safely in the sky.",
          "They make sure all passengers have a safe flight."
        ]
      },
      {
        "name": "Farmer",
        "hints": [
          "This person works on a farm and grows food for people to eat.",
          "They plant seeds and take care of crops until they are ready to harvest.",
          "Farmers also raise animals like cows, chickens, and pigs.",
          "They often use tractors and other big machines.",
          "Their hard work helps put food on our tables every day."
        ]
      },
      {
        "name": "Artist",
        "hints": [
          "This person creates beautiful things like paintings, drawings, or sculptures.",
          "They often use paints, brushes, pencils, or clay to make their art.",
          "Artists share their work in galleries or online for others to enjoy.",
          "They use their imagination and feelings to express ideas.",
          "Art helps make the world more colorful and creative."
        ]
      },
      {
        "name": "Nurse",
        "hints": [
          "This person works in a hospital and helps take care of patients.",
          "They support doctors and help people feel better.",
          "Nurses check temperatures, give medicine, and comfort the sick.",
          "They wear scrubs and often work long hours to help others.",
          "Nurses are kind, caring, and very important in healthcare."
        ]
      }
    ]
  }
  
  ,

  {
    "category": "household items",
    "words": [
      {
        "name": "table",
        "hints": [
          "People often sit around it during meals.",
          "It usually stands on four legs and supports objects.",
          "It can be used for dining, working, or studying.",
          "Commonly found in kitchens, offices, or dining rooms.",
          "Chairs are often placed next to it."
        ]
      },
      {
        "name": "lamp",
        "hints": [
          "It provides light in dark rooms or during nighttime.",
          "Often placed on desks, nightstands, or the floor.",
          "Many people use it for reading or studying.",
          "It can have a switch or button to turn on.",
          "Comes in different shapes, sizes, and styles."
        ]
      },
      {
        "name": "mirror",
        "hints": [
          "Used to see your own reflection.",
          "Often placed in bathrooms or bedrooms.",
          "Helps people check their face or outfit.",
          "Usually made of glass and mounted on a wall or frame.",
          "Common in personal grooming or decoration."
        ]
      },
      {
        "name": "sofa",
        "hints": [
          "Offers a comfortable place to sit or lie down.",
          "Usually large and soft, placed in living rooms.",
          "People use it to relax, watch TV, or nap.",
          "Often comes with cushions and armrests.",
          "Can seat more than one person at a time."
        ]
      },
      {
        "name": "refrigerator",
        "hints": [
          "Keeps food fresh and cold.",
          "Found in almost every kitchen.",
          "Has shelves and compartments inside.",
          "Often includes a freezer section on top or bottom.",
          "Used to store fruits, drinks, and leftovers."
        ]
      },
      {
        "name": "bed",
        "hints": [
          "Provides a place to sleep and rest.",
          "Usually covered with sheets, blankets, and pillows.",
          "Comes in sizes like twin, queen, or king.",
          "Found in bedrooms and used daily.",
          "Helps people relax and recover energy."
        ]
      },
      {
        "name": "chair",
        "hints": [
          "Supports a person sitting down.",
          "Usually has four legs and a backrest.",
          "Used at tables, desks, and workspaces.",
          "Some have armrests and cushions for comfort.",
          "Common in dining rooms, offices, and classrooms."
        ]
      },
      {
        "name": "toaster",
        "hints": [
          "Browns slices of bread by heating them.",
          "Often used for making breakfast quickly.",
          "Found on kitchen counters.",
          "Heats food from both sides at once.",
          "Pops up the food when it's done."
        ]
      },
      {
        "name": "microwave",
        "hints": [
          "Heats food very quickly using special waves.",
          "Can defrost, cook, or reheat meals.",
          "Found on kitchen counters or shelves.",
          "Often has buttons and a timer.",
          "Popular for popcorn, leftovers, and snacks."
        ]
      },
      {
        "name": "oven",
        "hints": [
          "Used for baking and roasting food.",
          "Often built into the kitchen wall or below the stove.",
          "Heats slowly but cooks thoroughly.",
          "Great for cakes, cookies, or roasts.",
          "Gets very hot and needs oven mitts for safety."
        ]
      },
      {
        "name": "stove",
        "hints": [
          "Provides direct heat for cooking on top.",
          "Used with pots and pans for boiling or frying.",
          "Usually has burners and control knobs.",
          "Often combined with an oven.",
          "Found in most kitchens for daily use."
        ]
      },
      {
        "name": "blender",
        "hints": [
          "Blends or mixes liquids and soft foods.",
          "Has sharp blades and a clear container.",
          "Commonly used for smoothies or soups.",
          "Operates with a button and electricity.",
          "Should be used with the lid on for safety."
        ]
      },
      {
        "name": "fan",
        "hints": [
          "Creates airflow to cool down a space.",
          "Has spinning blades inside a safety cover.",
          "Used in bedrooms, offices, or living rooms.",
          "Can be ceiling-mounted or portable.",
          "Useful during summer or in warm places."
        ]
      },
      {
        "name": "television",
        "hints": [
          "Shows moving pictures with sound.",
          "Used for watching shows, news, or games.",
          "Often placed on walls or stands.",
          "Controlled with buttons or a remote.",
          "Popular in living rooms and bedrooms."
        ]
      },
      {
        "name": "remote",
        "hints": [
          "Used to control a TV or other devices from a distance.",
          "Has buttons for volume, channels, and power.",
          "Often held in one hand while sitting.",
          "Runs on batteries and sends signals.",
          "Lets people stay relaxed while watching."
        ]
      },
      {
        "name": "vacuum",
        "hints": [
          "Cleans floors by sucking up dirt and dust.",
          "Usually plugged in and pushed across the floor.",
          "Makes a loud noise while working.",
          "Has wheels and a dust container or bag.",
          "Used on carpets, rugs, and tiles."
        ]
      },
      {
        "name": "washing machine",
        "hints": [
          "Cleans dirty clothes with water and soap.",
          "Has a large drum and spinning motion.",
          "People load clothes and press buttons to start.",
          "Found in laundry rooms or bathrooms.",
          "Saves time and cleans many clothes at once."
        ]
      },
      {
        "name": "dryer",
        "hints": [
          "Dries wet clothes using heat and spinning.",
          "Often used after washing clothes.",
          "Has a round door and timer.",
          "Found in laundry areas or utility rooms.",
          "Clothes come out dry and warm."
        ]
      },
      {
        "name": "sink",
        "hints": [
          "Used to wash hands, dishes, or food.",
          "Has a bowl-shaped basin and a drain.",
          "Usually connected to a faucet.",
          "Found in kitchens and bathrooms.",
          "Made of metal or ceramic material."
        ]
      },
      {
        "name": "faucet",
        "hints": [
          "Releases water when turned on.",
          "Attached to sinks, tubs, or basins.",
          "Can be moved left or right for temperature.",
          "Water flows out in a stream.",
          "Turned on by handles or knobs."
        ]
      },
      {
        "name": "toilet",
        "hints": [
          "Flushes waste using water.",
          "Used in bathrooms or restrooms.",
          "Has a seat and a lid.",
          "Connected to plumbing and pipes.",
          "Helps keep hygiene in the home."
        ]
      },
      {
        "name": "shower",
        "hints": [
          "Sprays water for cleaning the body.",
          "Has hot and cold settings for comfort.",
          "Common in bathrooms with a curtain or door.",
          "Used while standing under running water.",
          "Helps people feel clean and refreshed."
        ]
      },
      {
        "name": "bathtub",
        "hints": [
          "Filled with water for soaking the body.",
          "Larger than a sink but smaller than a pool.",
          "Often used with soap and warm water.",
          "Made from plastic, ceramic, or metal.",
          "Takes more time than a shower."
        ]
      },
      {
        "name": "towel",
        "hints": [
          "Used to dry the body after bathing.",
          "Made from cotton or microfiber cloth.",
          "Usually hangs on a rack in the bathroom.",
          "Comes in different colors and sizes.",
          "Needed for keeping clean and dry."
        ]
      },
      {
        "name": "pillow",
        "hints": [
          "Supports the head while sleeping.",
          "Placed on beds or sofas.",
          "Filled with soft material for comfort.",
          "Covered in fabric or pillowcases.",
          "Helps with sleep and neck support."
        ]
      },
      {
        "name": "blanket",
        "hints": [
          "Covers the body to keep warm during sleep.",
          "Usually made of soft fabric like fleece or cotton.",
          "Used on beds during cold nights.",
          "Can be folded or spread out.",
          "Helps people stay cozy and comfortable."
        ]
      },
      {
        "name": "curtain",
        "hints": [
          "Hangs in front of windows or doors.",
          "Blocks sunlight or adds privacy.",
          "Made of fabric and held with a rod.",
          "Comes in many colors and patterns.",
          "Can be opened or closed easily."
        ]
      },
      {
        "name": "clock",
        "hints": [
          "Shows the time with hands or digits.",
          "Can hang on a wall or stand on a table.",
          "Makes a ticking or beeping sound.",
          "Used to wake up or keep on schedule.",
          "Runs on batteries or electricity."
        ]
      },
      {
        "name": "bookshelf",
        "hints": [
          "Holds books upright on shelves.",
          "Has levels for placing items.",
          "Found in studies, offices, or living rooms.",
          "Can be made of wood, metal, or plastic.",
          "Helps keep reading materials organized."
        ]
      },
      {
        "name": "cabinet",
        "hints": [
          "Used to store items in drawers or shelves.",
          "Usually placed in kitchens, bathrooms, or bedrooms.",
          "Has doors that open to reveal space inside.",
          "Made of wood, metal, or plastic.",
          "Used for keeping things tidy and out of sight."
        ]
      }
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
          canvasMessage.innerHTML = "Sorry!<br>The answer was " + chosenWord;
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

  // 교수대(가로 막대)와 줄의 간격을 40% 줄이고 전체적으로 위로 올림
  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.lineWidth = 0.6; // 바닥선만 얇게
    drawLine(10, 145, 130, 145); // 바닥
    context.restore();
    context.lineWidth = 2; // 나머지는 원래 두께
    drawLine(10, 25, 10, 146);   // 기둥
    drawLine(10, 25, 70, 25);    // 가로 막대
    drawLine(70, 25, 70, 43);    // 줄
  };

  const head = (isLose = false) => {
    context.beginPath();
    context.arc(70, 58, 15, 0, Math.PI * 2, true); // y=70→58
    context.fillStyle = "#fffbe7";
    context.fill();
    context.stroke();

    // Eyes
    context.beginPath();
    context.arc(64, 55, 2.5, 0, Math.PI * 2, true);
    context.arc(76, 55, 2.5, 0, Math.PI * 2, true);
    context.fillStyle = "#222";
    context.fill();

    // Mouth
    context.beginPath();
    if (isLose) {
      context.arc(70, 67 - 1.2, 6, Math.PI, 0, true); // 10% 위로 (67→65.8)
    } else {
      context.arc(70, 65 - 1.2, 6, 0, Math.PI, false); // 10% 위로 (65→63.8)
    }
    context.strokeStyle = "#222";
    context.lineWidth = 2;
    context.stroke();
  };

  const body = () => {
    drawLine(70, 73, 70, 109); // 몸통 길이 45→36 (20% 줄임, 73~109)
  };
  const leftArm = () => { drawLine(70, 83, 50, 88); };
  const rightArm = () => { drawLine(70, 83, 90, 88); };
  const leftLeg = () => { drawLine(70, 109, 55, 139); }; // 다리 시작점도 위로
  const rightLeg = () => { drawLine(70, 109, 85, 139); };

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


