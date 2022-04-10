const ipsum = [
  'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'mi elit', 'sed',
  'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et dolore', 'tellus',
  'id magna', 'aliqua', 'ut enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 
  'esse', 'cillum', 'curabitur', 'vel velit', 'mattis', 'fusce', 'faucibus maximus'
]
const prime_ministers = [
  ['Macdonald', 'Con'], ['Mackenzie', 'Lib'], ['Abbott', 'Con'], ['Thompson', 'Con'], 
  ['Bowell', 'Con'], ['Tupper', 'Con'], ['Laurier', 'Lib'], ['Borden', 'Con'], 
  ['Meighen', 'Con'], ['Mackenzie King', 'Lib'], ['Bennett', 'Con'], ['St. Laurent', 'Lib'], 
  ['Diefenbaker', 'Con'], ['Pearson', 'Lib'], ['Trudeau', 'Lib'], ['Clark', 'Con'], 
  ['Turner', 'Lib'], ['Mulroney', 'Con'], ['Campbell', 'Con'], ['Chrétien', 'Lib'], 
  ['Martin', 'Lib'], ['Harper', 'Con'], ['Trudeau', 'Lib']
]

const form = document.getElementById("form");
const num_paragraphs = document.getElementById("num_paragraphs");
const party_selector = document.getElementsByName('party');
const generated_text = document.querySelector(".generated-text");

function get_party() {
  for (var i = 0, length = party_selector.length; i < length; i++) {
    if (party_selector[i].checked) {
      return(party_selector[i].id);
    }
  }
}

function generate_sentence(start) {
  let sentence_length = Math.floor(Math.random() * (14 - 9 + 1) + 9);
  let sentence = ""
  let party = get_party();
  let temp_pms = []

  if (start!= null) {
    sentence = `${start}`
  }

  if (party == "all") {
    temp_pms = prime_ministers;
  }
  else if (party == "liberal") {
    temp_pms = prime_ministers.filter(prime_minister => prime_minister[1] === "Lib");
  }
  else {
    temp_pms = prime_ministers.filter(prime_minister => prime_minister[1] === "Con");
  }

  for (let i = 0; i <= sentence_length; i++) {
    if (i %2 == 0) {
      sentence = sentence + (temp_pms[Math.floor(Math.random() * (temp_pms.length))][0]) + " ";
    } else {
      sentence = sentence + (ipsum[Math.floor(Math.random() * (ipsum.length))]) + " ";
    }
  }

  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  sentence = sentence.trim() + ".";
  return sentence
}

function generate_paragraph(first) {
  let number = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
  let paragraph = "";

  for (let i = 0; i <= number; i++) {
    if (first == true && i === 0) {
      paragraph = paragraph + generate_sentence("Laurier ipsum ") + " ";
    } else {
      paragraph = paragraph + generate_sentence() + " ";
    }
  }
  return paragraph
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const value = parseInt(num_paragraphs.value);
  let tempText = []

  for (let i = 0; i < value; i++) {
    if (i === 0) {
      tempText.push(generate_paragraph(true));
    } else {
      tempText.push(generate_paragraph(false));
    }
  }

  tempText = tempText.map(item => `<p class="generated_text">${item}</p>`).join("");
  generated_text.innerHTML = tempText;
})