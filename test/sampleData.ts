const sampleData = [
  {
    id: "xyz",
    title: "Prepare Presentation",
    overview:
      "Keep the talk and slides simple: what are the three things about this that everyone should remember?",
    flags: null,
    createdAt: 1773585160736,

    subtasks: [
      {
        title: "slides and notes",
        id: "slidesId",
        tasks: [
          { id: "one", detail: "Revise notes", flags: null },
          { id: "two", detail: "Simple side layouts", flags: null },
          {
            id: "three",
            detail: "Review quarterly data with olivia",
            flags: null,
          },
          {
            id: "four",
            detail: "Print handouts for attendees",
            flags: null,
          },
        ],
      },
      {
        title: "preparation",
        id: "prepareId",
        tasks: [
          {
            id: "one",
            detail: "Email John for presentation tips",
            flags: null,
          },
          {
            id: "two",
            detail: "Checkout books recommendations",
            flags: null,
          },
          { id: "three", detail: "Time a full rehearsal", flags: null },
          {
            id: "four",
            detail: "Do practice run with eric",
            flags: null,
          },
          {
            id: "five",
            detail: "Confirm presentation time",
            flags: null,
          },
          {
            id: "six",
            detail: "Print handouts for attendees",
            flags: null,
          },
        ],
      },
    ],
  },
  {
    id: "abc",
    title: "Visit Camp",
    overview: "Buy necessary camping materials, take permission from school",
    flags: null,
    createdAt: 1773604780745,

    subtasks: [
      {
        title: "Go to market",
        id: "marketId",
        tasks: [
          { id: "one", detail: "Buy tent", flags: null },
          { id: "two", detail: "Buy mushrooms", flags: null },
          {
            id: "three",
            detail: "Review plan with olivia",
            flags: null,
          },
          {
            id: "four",
            detail: "Print handouts for attendees",
            flags: null,
          },
        ],
      },
      {
        title: "Preparation",
        id: "prepareId",
        tasks: [
          {
            id: "one",
            detail: "Email John to be getting his things too",
            flags: null,
          },
          {
            id: "two",
            detail: "Checkout books recommended camping site",
            flags: null,
          },
          { id: "three", detail: "Time a full rehearsal", flags: null },
          {
            id: "four",
            detail: "Do physical exercise to increase agility",
            flags: null,
          },
          {
            id: "five",
            detail: "Confirm occasion date and time",
            flags: null,
          },
          {
            id: "six",
            detail: "Email attendees to cross check their materials",
            flags: null,
          },
        ],
      },
    ],
  },
];

export { sampleData };
