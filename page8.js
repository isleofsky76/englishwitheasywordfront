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

// Countries with hints
const countries = [
  {
    name: "United States",
    hints: [
      "This country is located in North America.",
      "It is known for its diverse culture.",
      "The Statue of Liberty is located here.",
      "It has the largest economy in the world.",
      "Famous musician: Elvis Presley."
    ]
  },
  {
    name: "Brazil",
    hints: [
      "This country is located in South America.",
      "It is known for its carnival festival.",
      "The Amazon Rainforest is located here.",
      "It is famous for soccer.",
      "Famous soccer player: Pelé."
    ]
  },
  {
    name: "Canada",
    hints: [
      "This country is located in North America.",
      "It is known for its natural beauty.",
      "The capital is Ottawa.",
      "It has two official languages: English and French.",
      "Famous musician: Justin Bieber, Céline Dion."
    ]
  },
  {
    name: "United Kingdom",
    hints: [
      "This country is located in Europe.",
      "It is known for its royal family.",
      "The capital is London.",
      "It has a parliamentary system.",
      "Famous musician: The Beatles."
    ]
  },
  {
    name: "Germany",
    hints: [
      "This country is located in Europe.",
      "It is known for its engineering and automotive industry.",
      "The capital is Berlin.",
      "It has a rich history and culture.",
      "Famous musician: Ludwig van Beethoven."
    ]
  },
  {
    name: "France",
    hints: [
      "This country is located in Europe.",
      "It is known for its art and cuisine.",
      "The capital is Paris.",
      "It is famous for the Eiffel Tower.",
      "Famous musician: Edith Piaf."
    ]
  },
  {
    name: "Italy",
    hints: [
      "This country is located in Europe.",
      "It is known for its art, architecture, and cuisine.",
      "The capital is Rome.",
      "It is famous for the Colosseum.",
      "Famous musician: Luciano Pavarotti."
    ]
  },
  {
    name: "Spain",
    hints: [
      "This country is located in Europe.",
      "It is known for its flamenco dance.",
      "The capital is Madrid.",
      "It is famous for its festivals.",
      "Famous soccer player: Raúl González,David de Gea,Fernando Torres."
    ]
  },
  {
    name: "Japan",
    hints: [
      "This country is located in Asia.",
      "It is known for its technology and culture.",
      "The capital is Tokyo.",
      "It has a rich history of samurai.",
      "Famous musician: Yoko Ono."
    ]
  },
  {
    name: "China",
    hints: [
      "This country is located in Asia.",
      "It is known for its Great Wall.",
      "The capital is Beijing.",
      "It has the largest population in the world.",
      "Famous person: Mao Zedong,Deng Xiaoping"
    ]
  },
  {
    name: "South Korea",
    hints: [
      "This country is located in Asia.",
      "It is famous for Son Heung-min.",
      "It has a technology hub known as Seoul.",
      "It is known for K-pop.",
      "Famous musician: BTS."
    ]
  },
  {
    name: "India",
    hints: [
      "This country is known for its diverse cultures.",
      "The Taj Mahal is located here.",
      "It has the second largest population in the world.",
      "The capital is New Delhi.",
      "Famous Person: Matatma Gandhi."
    ]
  },
  {
    name: "Hungary",
    hints: [
      "This country is located in Europe.",
      "The capital is Budapest.",
      "The Danube River flows through it.",
      "It is known for its thermal baths.",
      "known for its stunning buildings"
    ]
  },
  {
    name: "Switzerland",
    hints: [
      "This country is famous for its neutrality.",
      "It is located in Europe.",
      "It is known for the Alps.",
      "The capital is Bern.",
      "Famous person: Roger Federer (tennis player)."
    ]
  },
  {
    name: "Zimbabwe",
    hints: [
      "This country is located in Africa.",
      "Victoria Falls is located here.",
      "It has diverse wildlife.",
      "The capital is Harare.",
      "Famous person: Robert Mugabe."
    ]
  },
  {
    name: "Dominica",
    hints: [
      "This country is located in the Caribbean Sea.",
      "It is an island country.",
      "The capital is Roseau.",
      "It is known for its natural hot springs.",
      "The primary language spoken is English."
    ]
  },
  {
    name: "Mexico",
    hints: [
      "This country is located in North America.",
      "It is known for its vibrant culture.",
      "The capital is Mexico City.",
      "It is famous for its cuisine.",
      "Famous person: Frida Kahlo (artist)."
    ]
  },
  {
    name: "Argentina",
    hints: [
      "This country is located in South America.",
      "It is known for tango dance.",
      "The capital is Buenos Aires.",
      "It is famous for its beef.",
      "Famous soccer player: Diego Maradona."
    ]
  },
  {
    name: "Australia",
    hints: [
      "This country is located in Oceania.",
      "It is known for its unique wildlife.",
      "The capital is Canberra.",
      "It is famous for the Sydney Opera House.",
      "Famous musician: AC/DC."
    ]
  },
  {
    name: "New Zealand",
    hints: [
      "This country is located in Oceania.",
      "It is known for its stunning landscapes.",
      "The capital is Wellington.",
      "It is famous for the All Blacks rugby team.",
      "Famous person: Sir Edmund Hillary (explorer)."
    ]
  },
  {
    name: "Russia",
    hints: [
      "This country is located in both Europe and Asia.",
      "It is the largest country in the world.",
      "The capital is Moscow.",
      "It is known for its history and literature.",
      "Famous person: Leo Tolstoy (author)."
    ]
  },
  {
    name: "Turkey",
    hints: [
      "This country is located in both Europe and Asia.",
      "It is known for its rich history.",
      "The capital is Ankara.",
      "It is famous for its cuisine.",
      "Famous person: Mustafa Kemal Atatürk."
    ]
  },
  {
    name: "Egypt",
    hints: [
      "This country is located in Africa.",
      "It is known for its ancient civilization.",
      "The capital is Cairo.",
      "It is famous for the pyramids.",
      "Famous person: Cleopatra."
    ]
  },
  {
    name: "South Africa",
    hints: [
      "This country is located in Africa.",
      "It is known for its diverse culture.",
      "The capital is Pretoria (administrative).",
      "It is famous for its wildlife.",
      "Famous person: Nelson Mandela."
    ]
  },
  {
    name: "Saudi Arabia",
    hints: [
      "This country is located in the Middle East.",
      "It is known for its oil reserves.",
      "The capital is Riyadh.",
      "It is famous for Mecca and Medina.",
      "Famous person: Prince Mohammed bin Salman Al Saud."
    ]
  },
  {
    name: "Indonesia",
    hints: [
      "This country is located in Southeast Asia.",
      "It is known for its islands.",
      "The capital is Jakarta.",
      "It is famous for its biodiversity.",
      "Famous person: Sukarno (first president)."
    ]
  },
  {
    name: "Thailand",
    hints: [
      "This country is located in Southeast Asia.",
      "It is known for its beaches and temples.",
      "The capital is Bangkok.",
      "It is famous for its cuisine.",
      "Famous Musician:  Blank Pink - Lalisa Manobal."
    ]
  },
  {
    name: "Vietnam",
    hints: [
      "This country is located in Southeast Asia.",
      "It is known for its history and cuisine.",
      "The capital is Hanoi.",
      "It is famous for Ha Long Bay.",
      "Famous person: Ho Chi Minh."
    ]
  },
  {
    name: "Philippines",
    hints: [
      "This country is located in Southeast Asia.",
      "It is known for its beautiful islands.",
      "The capital is Manila.",
      "It is famous for its vibrant culture.",
      "Famous person: Manny Pacquiao (boxer)."
    ]
  },
  {
    name: "Malaysia",
    hints: [
      "This country is located in Southeast Asia.",
      "It is known for its rainforests and beaches.",
      "The capital is Kuala Lumpur.",
      "It is famous for the Petronas Twin Towers.",
      "Famous person: Michelle Yeoh (actress)."
    ]
  },
  {
    name: "Pakistan",
    hints: [
      "This country is located in South Asia.",
      "It is known for its rich history and culture.",
      "The capital is Islamabad.",
      "It is famous for its cuisine.",
      "Letter stars with P and ends with N"
    ]
  },
  {
    name: "Bangladesh",
    hints: [
      "This country is located in South Asia.",
      "It is known for its rivers and deltas.",
      "The capital is Dhaka.",
      "It is famous for its textiles.",
      "Letter stars with B and ends with H"
    ]
  },
  {
    name: "Sri Lanka",
    hints: [
      "This country is located in South Asia.",
      "It is known for its ancient ruins.",
      "The capital is Colombo.",
      "It is famous for its tea.",
      "Letter stars with S and ends with A"
    ]
  },
  {
    name: "Nepal",
    hints: [
      "This country is located in South Asia.",
      "It is known for its mountains.",
      "The capital is Kathmandu.",
      "It is famous for Mount Everest.",
      "Letter stars with N and ends with L"
    ]
  }
];

// Variables
let winCount = 0;
let count = 0;
let chosenWord = "";
let chosenHints = [];
let hintIndex = 0;
let remainingGuesses = 5;
let remainingHints = 5;

// Block all the Buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  // Disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

// Word Generator
const generateWord = () => {
    // Choose random word and hints
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    chosenWord = randomCountry.name.toUpperCase();
    chosenHints = randomCountry.hints;
  
  // Reset hint index and remaining hints for new word
    hintIndex = 0;
    remainingHints = 5;
  
    // Display initial hint
    hintContainer.innerText = `Hint: ${chosenHints[hintIndex]}`;
  
    // Replace every letter with span containing dash, handle spaces
    let displayItem = chosenWord.split('').map(char => 
      char === ' ' ? '<span class="space"> </span>' : '<span class="dashes">_</span>'
    ).join('');
  
    // Display each element as span
    userInputSection.innerHTML = displayItem;
  };



// Initial Function (Called when page loads/user presses new game or skip)
const initializer = () => {
  winCount = 0;
  count = 0;
  hintIndex = 0;
  remainingGuesses = 5;
  remainingHints = 5;

  // Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  hintContainer.innerText = "";
  resultText.innerText = "";
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  hintButton.disabled = false; // Enable hint button


 // For creating letter buttons
 for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // Number to ASCII [A-Z]
    button.innerText = String.fromCharCode(i);
    // Character button click

      // Assign a random color to each button
    let color = getRandomColor();
    button.style.backgroundColor = color;
    button.style.color = "#fff"; // Set text color to white for better contrast


    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.querySelectorAll(".dashes, .space");
      // If array contains clicked value, replace the matched dash with letter, else draw on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character in array is same as clicked button
          if (char === button.innerText) {
            // Replace dash with letter
            dashes[index].innerText = char;
            // Increment counter
            winCount += 1;
            // If winCount equals word length ignoring spaces
            if (winCount === charArray.filter(c => c !== ' ').length) {
              resultText.innerHTML = `<h2 class='win-msg'>Great</h2><p>The answer was <span>${chosenWord}</span></p>`;
              // Block all buttons
              blocker();
            }
          }
        });
      } else {
        // Lose count
        count += 1;
        remainingGuesses -= 1;
        // For drawing man
        drawMan(count);
        // Count == 6 because head, body, left arm, right arm, left leg, right leg
        if (count === 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Sorry!</h2><p>The answer was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      // Disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }


// Function to generate a random color
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateWord();
  // Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  // InitialDrawing would draw the frame
  initialDrawing();
};

// Hint button event listener
hintButton.addEventListener("click", () => {
    if (remainingHints > 0 && hintIndex < chosenHints.length - 1) {
      hintIndex += 1;
      hintContainer.innerText = `${chosenHints[hintIndex]}`;
      remainingHints -= 1;
    } else {
      hintButton.disabled = true;
    }
  });

// Skip button event listener
skipButton.addEventListener("click", () => {
    initializer(); // Reset the game and choose a new word
  });

// Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  // For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  // Body
  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 40);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 40);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  // Initial frame
  const initialDrawing = () => {
    // Clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // Bottom line
    drawLine(10, 130, 130, 130);
    // Left line
    drawLine(10, 10, 10, 131);
    // Top line
    drawLine(10, 10, 70, 10);
    // Small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
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
      break;
    default:
      break;
  }
};

// New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
