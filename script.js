const app = document.getElementById("app");

const state = {
  variables: new Set(),
  viewedChoices: {},
  currentSceneId: "title"
};

const sceneProgress = {
  scene2: { totalChoices: 3 },
  scene5: { totalChoices: 3, continueTo: "scene6" },
  scene6: { totalChoices: 3, continueTo: "scene7" },
  scene7: { totalChoices: 3, continueTo: "part2-revelation" },
  scene8: { totalChoices: 3, continueTo: "scene9" },
  scene9: { totalChoices: 3, continueTo: "scene10" },
  scene10: { totalChoices: 3, continueTo: "scene11" },
  scene11: { totalChoices: 3, continueTo: "part3-revelation" }
};

const scenes = {
  title: {
    type: "title",
    bg: "bg-title",
    title: "Rizal",
    subtitle: "Awakening the Nation",
    text: "A Visual Novel Journey Through Childhood, Education, and Legacy",
    button: "Start",
    next: "scene1"
  },

  scene1: {
    type: "story",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 1 – RIZAL'S FAMILY",
    bg: "bg-c1s1",
    character: "Young Rizal",
    young: true,
    lines: [
      ["Narrator", "Calamba was home to a young José Rizal, a curious and intelligent child raised in a loving family."],
      ["Narrator", "His parents and siblings nurtured his love for learning, kindness, and discipline from an early age."],
      ["Teodora Alonso", "Every story has a lesson, José. Listen carefully, and you'll learn more than words can tell."],
      ["Francisco Mercado", "Study hard, my son. Knowledge and good character are treasures no one can take away."],
      ["Young Rizal", "I'll do my best, Ama and Inay. I want to learn everything I can."]
    ],
    actions: [{ label: "Continue", to: "scene2" }]
  },

  scene2: {
    type: "choice",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 2 – HOW RIZAL SPENT HIS EARLY DAYS",
    bg: "bg-c1s1",
    character: "Young Rizal",
    young: true,
    lines: [
      ["Narrator", "Another peaceful morning begins in Calamba. Every choice José makes shapes the person he will become."],
      ["Young Rizal", "There's so much I want to do today... Where should I begin?"]
    ],
    prompt: "What should José do today?",
    choices: [
      { number: 1, label: "Spend Time with Mother", to: "scene3-1" },
      { number: 2, label: "Spend Time with Paciano", to: "scene3-2" },
      { number: 3, label: "Focus on Schooling", to: "scene3-3" },
      {
        number: 4,
        label: "Write Literature",
        special: "literatureCheck",
        requiredVariables: [
          "Literary Skills",
          "Creativity",
          "Political Awareness",
          "Social Awareness",
          "Critical Thinking"
        ],
        successTo: "scene3-4-success",
        failTo: "scene3-4-fail"
      }
    ],
    notice: "Write Literature unlocks once José has developed all required childhood values."
  },

  "scene3-1": {
    type: "result",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 3.1 – SPEND TIME WITH MOTHER",
    bg: "bg-c1s31",
    character: "Young Rizal",
    young: true,
    lines: [
      ["Teodora", "Come, José. Let me tell you another story while we walk together."],
      ["Teodora", "Stories help us understand people and inspire us to dream beyond what we can see."],
      ["Young Rizal", "I love hearing your stories, Inay."],
      ["Young Rizal", "Maybe one day, I'll write stories that inspire others too."]
    ],
    gains: ["Literary Skills", "Creativity"],
    returnTo: "scene2"
  },

  "scene3-2": {
    type: "result",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 3.2 – SPEND TIME WITH PACIANO",
    bg: "bg-c1s1",
    character: "Paciano",
    sprite: "paciano.png",
    young: false,
    lines: [
      ["Paciano", "José... something terrible has happened."],
      ["Paciano", "The priests known as Gomburza were executed. Many believe they were treated unjustly."],
      ["Young Rizal", "How could innocent people suffer like that?"],
      ["Paciano", "Remember this, José. Understanding our country's struggles is the first step toward helping it."],
      ["Young Rizal", "I'll never forget what you've told me."]
    ],
    gains: ["Political Awareness", "Social Awareness"],
    returnTo: "scene2"
  },

  "scene3-3": {
    type: "result",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 3.3 – FOCUS ON SCHOOLING",
    bg: "bg-spain",
    character: "Young Rizal",
    young: true,
    lines: [
      ["Narrator", "Although José was smaller than many children his age, he refused to be intimidated."],
      ["Bully", "You're too small. You'll never beat us."],
      ["Young Rizal", "Strength isn't everything."],
      ["Young Rizal", "Thinking carefully before acting is sometimes the greatest advantage."],
      ["Narrator", "Instead of fighting with anger, José relied on intelligence and composure."]
    ],
    gains: ["Critical Thinking"],
    returnTo: "scene2"
  },

  "scene3-4-fail": {
    type: "story",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 3.4 – WRITE LITERATURE",
    bg: "bg-c1s31",
    character: "Young Rizal",
    young: true,
    lines: [
      ["Young Rizal", "I want to write... but I don't think I'm ready yet."],
      ["Young Rizal", "I should learn more before putting my thoughts into words."]
    ],
    actions: [{ label: "Return to Scene 2", to: "scene2" }]
  },

  "scene3-4-success": {
    type: "story",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 3.4 – WRITE LITERATURE",
    bg: "bg-c1s31",
    character: "Young Rizal",
    young: true,
    lines: [
      ["Narrator", "José prepares his paper and dips his pen into ink."],
      ["Narrator", "The room falls silent as each word slowly appears across the page."],
      ["Young Rizal", "\"If we truly love our language, we also learn to love our country.\""],
      ["Narrator", "José finishes writing \"Sa Aking Kababata,\" marking another step in his journey as a writer."]
    ],
    actions: [{ label: "Continue to Revelation", to: "scene4" }]
  },

  scene4: {
    type: "ending",
    chapter: "CHAPTER 1 – CHILDHOOD",
    title: "SCENE 4 – REVELATION",
    bg: "bg-scene4",
    heading: "CHAPTER 1 COMPLETE",
    lines: [
      ["Narrator", "Every lesson José has learned now comes together."],
      ["Teodora", "Knowledge grows stronger when it is guided by wisdom and compassion."],
      ["Young Rizal", "Now I understand..."],
      ["Young Rizal", "Every experience has prepared me for something greater."],
      ["Narrator", "The curious child of Calamba begins to grow into the young man who will one day inspire a nation."]
    ],
    actions: [{ label: "Adolescence", to: "scene5" }]
  },

  scene5: {
    type: "choice",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 5 – ATENEO AND UNIVERSITY YEARS",
    bg: "bg-spain",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal arrived at the Ateneo Municipal and later studied at the University of Santo Tomas."],
      ["Narrator", "In Rizal's life, knowledge and the bounds of his awareness were no longer simply about passing examinations. Every lesson became another piece of understanding the world around him."],
      ["Rizal", "The more I learn, the more I realize that education can change not only a person... but an entire nation."]
    ],
    prompt: "What should Rizal focus on?",
    choices: [
      { number: 1, label: "Participate in Literary Organizations", to: "scene5-1" },
      { number: 2, label: "Focus on Medicine and Sciences", to: "scene5-2" },
      { number: 3, label: "Study Philosophy and Law", to: "scene5-3" }
    ]
  },

  "scene5-1": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 5.1 – PARTICIPATE IN LITERARY ORGANIZATIONS",
    bg: "bg-spain",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal joins fellow students in reading poetry, essays, and classical literature."],
      ["Student", "Your poems have meaning, José. They remind us of who we are."],
      ["Rizal", "Stories preserve our culture. If our people remember who they are, they'll never lose hope."],
      ["Student", "Then keep writing. Your words may inspire more people than you realize."]
    ],
    gains: ["Leadership", "National Consciousness"],
    returnTo: "scene5"
  },

  "scene5-2": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 5.2 – FOCUS ON MEDICINE AND SCIENCES",
    bg: "bg-spain",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal spends long nights studying anatomy and medicine."],
      ["Narrator", "His mother's weakening eyesight constantly occupies his thoughts."],
      ["Rizal", "If I become a skilled doctor, perhaps I can restore my mother's sight."],
      ["Professor", "Your dedication is admirable, José. Never stop searching for knowledge."]
    ],
    gains: ["Academic Excellence"],
    returnTo: "scene5"
  },

  "scene5-3": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 5.3 – STUDY PHILOSOPHY AND LAW",
    bg: "bg-spain",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal immerses himself in philosophy, history, and political thought."],
      ["Rizal", "These books speak of justice and equality..."],
      ["Rizal", "Yet my country continues to suffer under inequality."],
      ["Narrator", "The contrast between ideals and reality strengthens his desire for reform."]
    ],
    gains: ["Reformist Ideals", "Academic Excellence"],
    returnTo: "scene5"
  },

  scene6: {
    type: "choice",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 6 – EUROPE AND SPAIN",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Leaving the Philippines, Rizal discovers societies unlike the one he has always known."],
      ["Narrator", "Every new city broadens his understanding of what a nation can become."],
      ["Rizal", "Perhaps our homeland can one day enjoy these same freedoms."]
    ],
    prompt: "What experience should Rizal pursue?",
    choices: [
      { number: 1, label: "Travel Across Europe", to: "scene6-1" },
      { number: 2, label: "Observe Democratic Institutions", to: "scene6-2" },
      { number: 3, label: "Meet Fellow Filipino Students", to: "scene6-3" }
    ]
  },

  "scene6-1": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 6.1 – TRAVEL ACROSS EUROPE",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal visits museums, libraries, and universities across Europe."],
      ["Narrator", "He witnesses scientific progress and lively public debate."],
      ["Rizal", "Knowledge flourishes where people are free to question and discover."],
      ["Rizal", "I hope one day the Philippines can become a place like this."]
    ],
    gains: ["Global Perspective"],
    returnTo: "scene6"
  },

  "scene6-2": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 6.2 – OBSERVE DEMOCRATIC INSTITUTIONS",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal attends public discussions and observes representative governments."],
      ["Citizen", "Our leaders must answer to the people."],
      ["Rizal", "Here, citizens speak without fear."],
      ["Rizal", "Why should Filipinos be denied the same freedom?"]
    ],
    gains: ["Reformist Ideals", "Global Perspective"],
    returnTo: "scene6"
  },

  "scene6-3": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 6.3 – MEET FELLOW FILIPINO STUDENTS",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal spends evenings with fellow Filipino students, many of whom would later become leaders of the Propaganda Movement."],
      ["Student", "We all dream of a better future, but where do we begin?"],
      ["Marcelo H. del Pilar", "One voice may be ignored. Together, we become impossible to silence."],
      ["Rizal", "Then our greatest strength is unity. Change begins when people stand together."]
    ],
    gains: ["Leadership", "National Consciousness"],
    returnTo: "scene6"
  },

  scene7: {
    type: "choice",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 7 – THE PROPAGANDA MOVEMENT",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal joins fellow reformists and contributes through writing."],
      ["Narrator", "His pen becomes his greatest weapon against injustice."],
      ["Rizal", "If truth cannot be spoken freely at home, then I will write until it is heard."]
    ],
    prompt: "How should Rizal contribute?",
    choices: [
      { number: 1, label: "Write Articles Advocating Reforms", to: "scene7-1" },
      { number: 2, label: "Discuss Issues with Fellow Propagandists", to: "scene7-2" },
      { number: 3, label: "Reflect on the Future of the Philippines", to: "scene7-3" }
    ]
  },

  "scene7-1": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 7.1 – WRITE ARTICLES ADVOCATING REFORMS",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal contributes essays exposing injustice while calling for peaceful reforms."],
      ["Narrator", "Each publication reaches Filipinos both at home and abroad."],
      ["Rizal", "If my words encourage even one person to seek justice, then they are worth writing."]
    ],
    gains: ["Reformist Ideals", "Leadership"],
    returnTo: "scene7"
  },

  "scene7-2": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 7.2 – DISCUSS ISSUES WITH FELLOW PROPAGANDISTS",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Meetings grow lively as different opinions emerge."],
      ["Reformist", "Some believe revolution is the only answer."],
      ["Another Reformist", "Others still believe peaceful reform is possible."],
      ["Rizal", "We may disagree, but our goal remains the same. Unity must come before victory."]
    ],
    gains: ["Leadership", "Global Perspective"],
    returnTo: "scene7"
  },

  "scene7-3": {
    type: "result",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "SCENE 7.3 – REFLECT ON THE FUTURE OF THE PHILIPPINES",
    bg: "bg-c2p2",
    character: "Rizal",
    lines: [
      ["Narrator", "Late one evening, Rizal walks alone through the streets of Madrid."],
      ["Narrator", "His thoughts drift home—to Calamba, his family, his teachers, and the ordinary Filipinos still living under injustice."],
      ["Rizal", "No matter how far I travel, my heart will always belong to the Philippines."],
      ["Rizal", "Everything I learn must someday serve my people."]
    ],
    gains: ["National Consciousness", "Reformist Ideals"],
    returnTo: "scene7"
  },

  "part2-revelation": {
    type: "conditionalEnding",
    chapter: "CHAPTER 2 – ADOLESCENCE TO EARLY ADULTHOOD",
    title: "PART 2 REVELATION",
    bg: "bg-c2p2",
    requiredVariables: [
      "Leadership",
      "National Consciousness",
      "Academic Excellence",
      "Reformist Ideals",
      "Global Perspective"
    ],
    successHeading: "ADULTHOOD",
    successLines: [
      ["Rizal", "Education opened my mind."],
      ["Rizal", "Travel broadened my vision."],
      ["Rizal", "But it is my love for the Filipino people that gives these lessons purpose."],
      ["Narrator", "With knowledge, experience, and conviction, Rizal steps into adulthood, ready to transform ideas into action."]
    ],
    failHeading: "MORE LESSONS REMAIN",
    failLines: [
      ["Rizal", "I've learned much about the world..."],
      ["Rizal", "But I still have more to understand before I can truly help my country."],
      ["Narrator", "Rizal decides to continue learning before taking the next step in his journey."]
    ],
    successActions: [{ label: "Begin Chapter 3", to: "scene8" }],
    failActions: [{ label: "Revisit Scene 5", to: "scene5" }]
  },

  scene8: {
    type: "choice",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 8 – WRITING NOLI ME TANGERE",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Years of education, travel, and observation have led Rizal to one conclusion: the injustices he witnessed cannot remain unspoken."],
      ["Narrator", "Alone in his small room, he stares at blank sheets of paper."],
      ["Rizal", "If I remain silent, nothing changes."],
      ["Rizal", "But if I speak... I may never return home the same man."]
    ],
    prompt: "What should Rizal focus on while writing?",
    choices: [
      { number: 1, label: "Give the People a Voice", to: "scene8-1" },
      { number: 2, label: "Expose Colonial Abuses", to: "scene8-2" },
      { number: 3, label: "Perfect Every Chapter", to: "scene8-3" }
    ]
  },

  "scene8-1": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 8.1 – GIVE THE PEOPLE A VOICE",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Instead of writing about famous figures, Rizal chooses to focus on ordinary Filipinos—farmers, mothers, students, and children."],
      ["Narrator", "Characters like Sisa, Basilio, Crispin, Elias, and Ibarra begin taking shape."],
      ["Narrator", "He believes readers will understand injustice more deeply through the lives of common people."],
      ["Rizal", "A nation's suffering is best understood through the people who endure it."],
      ["Narrator", "Rizal realizes that literature can awaken empathy before it inspires action."]
    ],
    gains: ["Influence", "Civic Responsibility"],
    returnTo: "scene8"
  },

  "scene8-2": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 8.2 – EXPOSE COLONIAL ABUSES",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal carefully documents corruption, abuse of power, and the misuse of religion."],
      ["Narrator", "Friends warn him that publishing such ideas may anger powerful people."],
      ["Friend", "José, these words are dangerous. The powerful will not stay silent."],
      ["Narrator", "Rizal pauses."],
      ["Narrator", "Then he continues writing."],
      ["Rizal", "Truth loses its purpose if it is hidden out of fear."],
      ["Narrator", "Every page becomes an act of courage."]
    ],
    gains: ["Moral Courage", "Influence"],
    returnTo: "scene8"
  },

  "scene8-3": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 8.3 – PERFECT EVERY CHAPTER",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Money becomes scarce."],
      ["Narrator", "Printing costs continue rising."],
      ["Narrator", "Several revisions leave Rizal frustrated."],
      ["Rizal", "So much still feels unfinished..."],
      ["Narrator", "Still, he refuses to publish unfinished work."],
      ["Narrator", "Night after night, he edits every sentence."],
      ["Rizal", "If these words are to outlive me, they must deserve to."],
      ["Narrator", "The completed manuscript becomes the culmination of years of sacrifice."]
    ],
    gains: ["Resilience", "Legacy"],
    returnTo: "scene8"
  },

  scene9: {
    type: "choice",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 9 – RETURN TO THE PHILIPPINES",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Noli Me Tangere spreads across the Philippines."],
      ["Narrator", "Some praise it."],
      ["Narrator", "Others condemn it."],
      ["Narrator", "Despite the danger, Rizal returns home."]
    ],
    prompt: "What should Rizal do after returning?",
    choices: [
      { number: 1, label: "Serve the Community", to: "scene9-1" },
      { number: 2, label: "Continue Advocating Peaceful Reform", to: "scene9-2" },
      { number: 3, label: "Establish La Liga Filipina", to: "scene9-3" }
    ]
  },

  "scene9-1": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 9.1 – SERVE THE COMMUNITY",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal spends time treating patients and helping families regardless of social class."],
      ["Narrator", "The gratitude of ordinary people reminds him why he wrote in the first place."],
      ["Villager", "You heal more than our illnesses, Doctor Rizal."],
      ["Rizal", "A life of learning means little if it does not serve others."],
      ["Narrator", "Rizal understands that service extends beyond words."]
    ],
    gains: ["Civic Responsibility", "Legacy"],
    returnTo: "scene9"
  },

  "scene9-2": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 9.2 – CONTINUE ADVOCATING PEACEFUL REFORM",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Rather than encouraging violence, Rizal continues promoting peaceful reforms."],
      ["Narrator", "He speaks with educated Filipinos about representation, education, and equality."],
      ["Reformist", "Some say peaceful reform is too slow."],
      ["Reformist", "Others say it may never come."],
      ["Rizal", "Lasting change begins with enlightened citizens."],
      ["Narrator", "Although some criticize his methods as too idealistic, Rizal remains firm."]
    ],
    gains: ["Moral Courage", "Influence"],
    returnTo: "scene9"
  },

  "scene9-3": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 9.3 – ESTABLISH LA LIGA FILIPINA",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal gathers Filipinos from different walks of life."],
      ["Narrator", "He explains his vision of a united, educated, and self-reliant society."],
      ["Rizal", "If we are divided, we remain weak."],
      ["Rizal", "But if we work together, we can build a nation worthy of its people."],
      ["Narrator", "Although the organization is short-lived, its ideals continue inspiring others."],
      ["Narrator", "For the first time, Rizal's ideas begin transforming into organized civic action."]
    ],
    gains: ["Civic Responsibility", "Influence"],
    returnTo: "scene9"
  },

  scene10: {
    type: "choice",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 10 – EXILE IN DAPITAN",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal is exiled to Dapitan."],
      ["Narrator", "Far from Manila, many believe his influence has ended."],
      ["Narrator", "Instead, he begins serving the community in new ways."]
    ],
    prompt: "How should Rizal spend his exile?",
    choices: [
      { number: 1, label: "Educate the Youth", to: "scene10-1" },
      { number: 2, label: "Continue Scientific Work", to: "scene10-2" },
      { number: 3, label: "Write Letters and Reflections", to: "scene10-3" }
    ]
  },

  "scene10-1": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 10.1 – EDUCATE THE YOUTH",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Children gather beneath the trees for Rizal's lessons."],
      ["Narrator", "Instead of memorization, he encourages observation, questioning, and curiosity."],
      ["Student", "Why do you teach us to ask questions?"],
      ["Rizal", "Because free minds build free nations."],
      ["Narrator", "Through teaching, Rizal plants ideas that may grow long after his exile ends."]
    ],
    gains: ["Legacy", "Civic Responsibility"],
    returnTo: "scene10"
  },

  "scene10-2": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 10.2 – CONTINUE SCIENTIFIC WORK",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal spends his days studying nature, conducting research, and exchanging letters with scientists around the world."],
      ["Narrator", "Even in exile, he refuses to stop learning."],
      ["Rizal", "They may limit where I go, but they cannot limit what I seek to understand."],
      ["Narrator", "Rizal proves that knowledge cannot be imprisoned."]
    ],
    gains: ["Resilience", "Legacy"],
    returnTo: "scene10"
  },

  "scene10-3": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 10.3 – WRITE LETTERS AND REFLECTIONS",
    bg: "bg-writing",
    character: "Rizal",
    lines: [
      ["Narrator", "Separated from friends and family, Rizal records his thoughts through letters."],
      ["Narrator", "Although isolated, he continues encouraging reform and hope."],
      ["Rizal", "Distance cannot silence conviction."],
      ["Rizal", "If my voice cannot reach them in person, then my words must travel for me."],
      ["Narrator", "His words travel farther than he can."]
    ],
    gains: ["Moral Courage", "Resilience"],
    returnTo: "scene10"
  },

  scene11: {
    type: "choice",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 11 – THE FINAL SACRIFICE",
    bg: "bg-last",
    character: "Rizal",
    lines: [
      ["Narrator", "Rizal is arrested and sentenced to death."],
      ["Narrator", "His physical journey nears its end."],
      ["Narrator", "His ideas, however, are only beginning."]
    ],
    prompt: "What final act defines Rizal's legacy?",
    choices: [
      { number: 1, label: "Face Death with Dignity", to: "scene11-1" },
      { number: 2, label: "Write Mi Último Adiós", to: "scene11-2" },
      { number: 3, label: "Entrust the Future to the Youth", to: "scene11-3" }
    ]
  },

  "scene11-1": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 11.1 – FACE DEATH WITH DIGNITY",
    bg: "bg-last",
    character: "Rizal",
    lines: [
      ["Narrator", "On the morning of his execution, Rizal walks calmly toward Bagumbayan."],
      ["Narrator", "He refuses a blindfold."],
      ["Guard", "Are you not afraid?"],
      ["Rizal", "A man may die, but the ideals he leaves behind endure."],
      ["Narrator", "His composure inspires both witnesses and future generations."]
    ],
    gains: ["Moral Courage", "Legacy"],
    returnTo: "scene11"
  },

  "scene11-2": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 11.2 – WRITE MI ÚLTIMO ADIÓS",
    bg: "bg-last",
    character: "Rizal",
    lines: [
      ["Narrator", "In his final hours, Rizal writes one last poem."],
      ["Narrator", "Every line expresses love for the Philippines without bitterness."],
      ["Rizal", "Even in farewell, my heart belongs to my country."],
      ["Narrator", "His words become more than a goodbye."],
      ["Narrator", "They become one of the nation's greatest literary works."]
    ],
    gains: ["Influence", "Legacy"],
    returnTo: "scene11"
  },

  "scene11-3": {
    type: "result",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "SCENE 11.3 – ENTRUST THE FUTURE TO THE YOUTH",
    bg: "bg-last",
    character: "Rizal",
    lines: [
      ["Narrator", "Before his execution, Rizal reflects on the next generation."],
      ["Narrator", "The narration shifts from Rizal to the player."],
      ["Rizal", "The future no longer belongs to me."],
      ["Narrator", "The screen slowly fades."],
      ["Rizal", "It belongs to those who continue asking questions, seeking truth, and serving their country."],
      ["Narrator", "The player realizes that Rizal has been speaking directly to them."]
    ],
    gains: ["Civic Responsibility", "Influence"],
    returnTo: "scene11"
  },

  "part3-revelation": {
    type: "conditionalEnding",
    chapter: "CHAPTER 3 – ADULTHOOD",
    title: "PART 3 REVELATION – AWAKENING THE NATION",
    bg: "bg-flag",
    requiredVariables: [
      "Civic Responsibility",
      "Moral Courage",
      "Influence",
      "Resilience",
      "Legacy"
    ],
    successHeading: "THE NATION AWAKENS",
    successLines: [
      ["Narrator", "The game shows a montage of Rizal's life."],
      ["Narrator", "Calamba. Europe. The writing of Noli Me Tangere. Dapitan. Bagumbayan."],
      ["Narrator", "Then, modern scenes begin to replace the historical ones."],
      ["Narrator", "Students discuss current events. Citizens vote. Volunteers help communities."],
      ["Narrator", "Young Filipinos read books and engage in civic discourse."],
      ["Narrator", "Rizal did not awaken a nation with weapons. Rizal awakened minds."],
      ["Narrator", "His greatest legacy is not found only in monuments or textbooks."],
      ["Narrator", "It lives in every citizen who chooses knowledge over ignorance, truth over silence, and service over self-interest."]
    ],
    failHeading: "LEGACY INCOMPLETE",
    failLines: [
      ["Rizal", "I have spoken, written, served, and endured..."],
      ["Rizal", "But a legacy is not built by intention alone."],
      ["Narrator", "Some lessons remain incomplete."],
      ["Narrator", "Before Rizal's final message can fully awaken the nation, the player must strengthen the values that shaped his adulthood."]
    ],
    successActions: [{ label: "Return to Title", to: "title" }],
    failActions: [{ label: "Revisit Scene 8", to: "scene8" }]
  }
};

function getViewed(sceneId) {
  if (!state.viewedChoices[sceneId]) state.viewedChoices[sceneId] = new Set();
  return state.viewedChoices[sceneId];
}

function hasAllRequired(requiredVariables) {
  return requiredVariables.every(variableName => state.variables.has(variableName));
}

function addVariables(gains = []) {
  gains.forEach(variableName => state.variables.add(variableName));
}

function markChoiceViewed(sceneId, choiceNumber) {
  const progress = sceneProgress[sceneId];
  if (!progress) return;

  if (choiceNumber <= progress.totalChoices) {
    getViewed(sceneId).add(choiceNumber);
  }
}

function isSceneComplete(sceneId) {
  const progress = sceneProgress[sceneId];
  if (!progress) return false;

  return getViewed(sceneId).size >= progress.totalChoices;
}

function goTo(sceneId) {
  state.currentSceneId = sceneId;
  render();
}

function handleChoice(sceneId, choice) {
  if (choice.special === "literatureCheck") {
    if (hasAllRequired(choice.requiredVariables)) {
      goTo(choice.successTo);
    } else {
      goTo(choice.failTo);
    }
    return;
  }

  markChoiceViewed(sceneId, choice.number);
  goTo(choice.to);
}

function renderLines(lines) {
  return lines.map(([speaker, text]) => {
    if (speaker === "Narrator") {
      return `<p class="line narrator-line">${text}</p>`;
    }

    return `<p class="line"><span class="speaker">${speaker}:</span> ${text}</p>`;
  }).join("");
}

function renderCharacter(scene) {
  if (!scene.character) return "";

  const youngClass = scene.young ? "young" : "";
  const sprite = scene.sprite || "rizal.png";
  const alt = scene.character;

  return `
    <div class="character ${youngClass}">
      <img src="assets/${sprite}" alt="${alt}" />
    </div>
  `;
}

function renderProgressPanel() {
  const variables = Array.from(state.variables);

  if (variables.length === 0) {
    return `
      <aside class="progress-panel">
        <h4>Values Developed</h4>
        <p>None yet.</p>
      </aside>
    `;
  }

  return `
    <aside class="progress-panel">
      <h4>Values Developed</h4>
      <ul class="progress-list">
        ${variables.map(variableName => `<li>${variableName}</li>`).join("")}
      </ul>
    </aside>
  `;
}

function renderTitle(scene) {
  app.innerHTML = `
    <section class="screen ${scene.bg}">
      <div class="title-wrap">
        <h1>${scene.title}</h1>
        <h2>${scene.subtitle}</h2>
        <p>${scene.text}</p>
        <button class="main-button" onclick="goTo('${scene.next}')">${scene.button}</button>
      </div>
    </section>
  `;
}

function renderStory(scene) {
  const actionButtons = scene.actions.map(action => `
    <button class="continue-button" onclick="goTo('${action.to}')">${action.label}</button>
  `).join("");

  app.innerHTML = `
    <section class="screen ${scene.bg}">
      ${renderProgressPanel()}
      <div class="vn-wrap vn-layout">
        <div>
          <div class="top-label">${scene.chapter}<br>${scene.title}</div>

          <div class="dialogue-box">
            <div class="name-box">Dialogue</div>
            ${renderLines(scene.lines)}
          </div>
        </div>

        <div class="stage">
          ${renderCharacter(scene)}
        </div>

        <div class="action-area">
          <div class="button-row">${actionButtons}</div>
        </div>
      </div>
    </section>
  `;
}

function renderChoice(sceneId, scene) {
  const viewed = getViewed(sceneId);

  const choicesHtml = scene.choices.map(choice => {
    const viewedClass = viewed.has(choice.number) ? "viewed" : "";
    const lockedClass = choice.special === "literatureCheck" && !hasAllRequired(choice.requiredVariables) ? "locked" : "";

    return `
      <button class="choice ${viewedClass} ${lockedClass}" onclick='handleChoice("${sceneId}", ${JSON.stringify(choice)})'>
        ${choice.number}. ${choice.label}
      </button>
    `;
  }).join("");

  const progress = sceneProgress[sceneId];
  const continueHtml = progress && isSceneComplete(sceneId)
    ? `<button class="continue-button" onclick="goTo('${progress.continueTo}')">Continue</button>`
    : "";

  app.innerHTML = `
    <section class="screen ${scene.bg}">
      ${renderProgressPanel()}
      <div class="vn-wrap vn-layout">
        <div>
          <div class="top-label">${scene.chapter}<br>${scene.title}</div>

          <div class="dialogue-box">
            <div class="name-box">Dialogue</div>
            ${renderLines(scene.lines)}
          </div>
        </div>

        <div class="stage">
          ${renderCharacter(scene)}
        </div>

        <div class="action-area">
          <h3>${scene.prompt}</h3>
          ${choicesHtml}
          ${scene.notice ? `<p class="notice">${scene.notice}</p>` : ""}
          ${continueHtml}
        </div>
      </div>
    </section>
  `;
}

function renderResult(scene) {
  addVariables(scene.gains);

  const gainsHtml = scene.gains.map(gain => `<li>+ ${gain}</li>`).join("");

  app.innerHTML = `
    <section class="screen ${scene.bg}">
      ${renderProgressPanel()}
      <div class="vn-wrap vn-layout">
        <div>
          <div class="top-label">${scene.chapter}<br>${scene.title}</div>

          <div class="dialogue-box">
            <div class="name-box">Dialogue</div>
            ${renderLines(scene.lines)}
          </div>
        </div>

        <div class="stage">
          ${renderCharacter(scene)}
        </div>

        <div class="action-area">
          <ul class="system-list">${gainsHtml}</ul>
          <div class="button-row">
            <button class="return-button" onclick="goTo('${scene.returnTo}')">Return</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderEnding(scene) {
  const buttons = scene.actions.map(action => `
    <button class="continue-button" onclick="goTo('${action.to}')">${action.label}</button>
  `).join("");

  app.innerHTML = `
    <section class="screen ${scene.bg}">
      ${renderProgressPanel()}
      <div class="vn-wrap">
        <div class="top-label">${scene.chapter}<br>${scene.title}</div>

        <div class="ending-card">
          <h1>${scene.heading}</h1>
          ${renderLines(scene.lines)}
          <div class="button-row">${buttons}</div>
        </div>
      </div>
    </section>
  `;
}

function renderConditionalEnding(scene) {
  const success = hasAllRequired(scene.requiredVariables);
  const heading = success ? scene.successHeading : scene.failHeading;
  const lines = success ? scene.successLines : scene.failLines;
  const actions = success ? scene.successActions : scene.failActions;

  const buttons = actions.map(action => `
    <button class="continue-button" onclick="goTo('${action.to}')">${action.label}</button>
  `).join("");

  app.innerHTML = `
    <section class="screen ${scene.bg}">
      ${renderProgressPanel()}
      <div class="vn-wrap">
        <div class="top-label">${scene.chapter}<br>${scene.title}</div>

        <div class="ending-card">
          <h1>${heading}</h1>
          ${renderLines(lines)}
          <div class="button-row">${buttons}</div>
        </div>
      </div>
    </section>
  `;
}

function render() {
  const scene = scenes[state.currentSceneId];

  if (!scene) {
    app.innerHTML = `<section class="screen bg-title"><div class="ending-card"><h1>Scene not found.</h1></div></section>`;
    return;
  }

  if (scene.type === "title") renderTitle(scene);
  if (scene.type === "story") renderStory(scene);
  if (scene.type === "choice") renderChoice(state.currentSceneId, scene);
  if (scene.type === "result") renderResult(scene);
  if (scene.type === "ending") renderEnding(scene);
  if (scene.type === "conditionalEnding") renderConditionalEnding(scene);
}

render();
