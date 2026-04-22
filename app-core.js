const todayISO = () => new Date().toISOString().slice(0, 10);

const makeId = () => {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const daysAgoISO = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
};

const defaultState = () => ({
  profile: {
    name: "Dimitri",
    currentLevelKg: 20,
    highestUnlockedKg: 24,
    weeklyTarget: 3
  },
  meta: {
    isSetupComplete: true,
    isDemo: true
  },
  levels: {
    8: { status: "conquered", unlockedAt: daysAgoISO(120), activatedAt: daysAgoISO(112), conqueredAt: daysAgoISO(88) },
    12: { status: "conquered", unlockedAt: daysAgoISO(88), activatedAt: daysAgoISO(84), conqueredAt: daysAgoISO(55) },
    16: { status: "conquered", unlockedAt: daysAgoISO(55), activatedAt: daysAgoISO(52), conqueredAt: daysAgoISO(18) },
    20: { status: "active", unlockedAt: daysAgoISO(18), activatedAt: daysAgoISO(18), conqueredAt: null },
    24: { status: "unlocked", unlockedAt: daysAgoISO(4), activatedAt: null, conqueredAt: null }
  },
  workouts: [
    {
      id: makeId(),
      date: daysAgoISO(2),
      type: "max_level_full_body",
      levelKg: 20,
      durationMinutes: 52,
      notes: "Full-body session with swings, presses, squats and carries."
    },
    {
      id: makeId(),
      date: daysAgoISO(5),
      type: "medium_kettlebell",
      levelKg: 20,
      durationMinutes: 38,
      notes: "Technique and conditioning."
    },
    {
      id: makeId(),
      date: daysAgoISO(8),
      type: "other",
      levelKg: null,
      durationMinutes: 42,
      notes: "Incline walk."
    },
    {
      id: makeId(),
      date: daysAgoISO(11),
      type: "max_level_full_body",
      levelKg: 20,
      durationMinutes: 48,
      notes: "Presses felt strong."
    },
    {
      id: makeId(),
      date: daysAgoISO(15),
      type: "max_level_full_body",
      levelKg: 20,
      durationMinutes: 46,
      notes: "Solid density work."
    }
  ],
  bodyStats: [
    {
      id: makeId(),
      date: daysAgoISO(18),
      bodyweightKg: 92,
      note: "Baseline"
    }
  ],
  learning: {
    courseVersion: 3,
    completedLessonIds: []
  }
});

const emptyState = () => ({
  profile: {
    name: "Athlete",
    currentLevelKg: 20,
    highestUnlockedKg: 20,
    weeklyTarget: 3
  },
  meta: {
    isSetupComplete: false,
    isDemo: false
  },
  levels: {},
  workouts: [],
  bodyStats: [],
  learning: {
    courseVersion: 3,
    completedLessonIds: []
  }
});

let state = loadState();

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return emptyState();

  try {
    return normalizeState(JSON.parse(stored));
  } catch {
    return emptyState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeState(rawState) {
  const next = {
    ...emptyState(),
    ...rawState,
    profile: {
      ...emptyState().profile,
      ...(rawState.profile || {})
    },
    meta: {
      ...emptyState().meta,
      ...(rawState.meta || {})
    },
    levels: rawState.levels || {},
    workouts: rawState.workouts || [],
    bodyStats: rawState.bodyStats || [],
    learning: {
      ...emptyState().learning,
      ...(rawState.learning || {})
    }
  };

  if (next.learning.courseVersion !== 3) {
    next.learning.courseVersion = 3;
    next.learning.completedLessonIds = [];
  }

  next.learning.completedLessonIds = [...new Set(next.learning.completedLessonIds || [])]
    .filter((id) => SYSTEM_LESSONS.some((lesson) => lesson.id === id));

  if (!Object.keys(next.levels).length && next.meta.isSetupComplete) {
    next.levels = createLevelState(
      next.profile.currentLevelKg,
      next.profile.highestUnlockedKg,
      next.profile.currentLevelStartedAt || todayISO()
    );
  }

  delete next.profile.currentLevelStartedAt;
  next.profile.highestUnlockedKg = Math.max(next.profile.highestUnlockedKg, next.profile.currentLevelKg);

  return next;
}

function createLevelState(currentLevelKg, highestUnlockedKg, activeDate = todayISO()) {
  return LEVELS.reduce((levels, level) => {
    if (level < currentLevelKg) {
      levels[level] = {
        status: "conquered",
        unlockedAt: activeDate,
        activatedAt: activeDate,
        conqueredAt: activeDate
      };
    } else if (level === currentLevelKg) {
      levels[level] = {
        status: "active",
        unlockedAt: activeDate,
        activatedAt: activeDate,
        conqueredAt: null
      };
    } else if (level <= highestUnlockedKg) {
      levels[level] = {
        status: "unlocked",
        unlockedAt: activeDate,
        activatedAt: null,
        conqueredAt: null
      };
    }

    return levels;
  }, {});
}

function getCurrentClass(levelKg = state.profile.currentLevelKg) {
  return CLASSES.find((item) => levelKg >= item.min && levelKg <= item.max) || CLASSES[CLASSES.length - 1];
}

function getLevelStatus(levelKg) {
  return state.levels[levelKg]?.status || "locked";
}

function getCurrentLevelRecord() {
  return state.levels[state.profile.currentLevelKg] || {};
}

function getNearbyLevels() {
  const currentIndex = LEVELS.indexOf(state.profile.currentLevelKg);
  const start = Math.max(0, currentIndex - 2);
  const end = Math.min(LEVELS.length, currentIndex + 3);
  return LEVELS.slice(start, end);
}

function getLevelWork(levelKg) {
  const max = state.workouts.filter((workout) => (
    workout.levelKg === levelKg && workout.type === "max_level_full_body"
  )).length;
  const medium = state.workouts.filter((workout) => (
    workout.levelKg === levelKg && workout.type === "medium_kettlebell"
  )).length;

  return { max, medium, total: max + medium };
}

function getStrongWeeksForLevel(levelKg) {
  const weeks = new Map();

  state.workouts
    .filter((workout) => workout.levelKg === levelKg && workout.type !== "other")
    .forEach((workout) => {
      const weekStart = startOfWeek(new Date(`${workout.date}T00:00:00`)).toISOString().slice(0, 10);
      weeks.set(weekStart, (weeks.get(weekStart) || 0) + 1);
    });

  return [...weeks.values()].filter((count) => count >= 2).length;
}

function getOwnershipScore(levelKg = state.profile.currentLevelKg) {
  const record = state.levels[levelKg] || {};
  const daysHere = daysBetween(record.activatedAt || todayISO());
  const weeksHere = Math.floor(daysHere / 7);
  const work = getLevelWork(levelKg);
  const strongWeeks = getStrongWeeksForLevel(levelKg);
  const nextLevel = LEVELS[LEVELS.indexOf(levelKg) + 1];
  const hasNextBellAccess = Boolean(nextLevel && nextLevel <= state.profile.highestUnlockedKg);

  const parts = [
    {
      key: "time",
      label: "Time under bell",
      value: weeksHere,
      target: 6,
      suffix: "w",
      points: 20,
      score: Math.min(weeksHere / 6, 1) * 20
    },
    {
      key: "max",
      label: "Max work",
      value: work.max,
      target: 10,
      suffix: "",
      points: 25,
      score: Math.min(work.max / 10, 1) * 25
    },
    {
      key: "medium",
      label: "Medium work",
      value: work.medium,
      target: 6,
      suffix: "",
      points: 15,
      score: Math.min(work.medium / 6, 1) * 15
    },
    {
      key: "consistency",
      label: "Strong weeks",
      value: strongWeeks,
      target: 4,
      suffix: "",
      points: 25,
      score: Math.min(strongWeeks / 4, 1) * 25
    },
    {
      key: "next",
      label: "Next bell access",
      value: hasNextBellAccess ? 1 : 0,
      target: 1,
      suffix: "",
      points: 15,
      score: hasNextBellAccess ? 15 : 0
    }
  ];

  const percent = Math.min(100, Math.round(parts.reduce((total, part) => total + part.score, 0)));
  let label = "Building";
  if (percent >= 75) label = "Owned";
  else if (percent >= 50) label = "Solid";
  else if (percent >= 25) label = "Settling";

  return {
    percent,
    label,
    text: `${label.toLowerCase()} ownership`,
    parts
  };
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isThisWeek(dateString) {
  const target = new Date(`${dateString}T00:00:00`);
  return target >= startOfWeek(new Date());
}

function daysBetween(dateString) {
  const start = new Date(`${dateString}T00:00:00`);
  const now = new Date();
  const ms = now - start;
  return Math.max(0, Math.floor(ms / 86400000));
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function setView(viewName) {
  if (viewName !== "system") {
    selectedLessonId = null;
  }

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === `${viewName}View`);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === viewName);
  });

  const titles = {
    home: "Home",
    levels: "Levels",
    system: "System",
    log: "Log workout",
    history: "History",
    stats: "Stats",
    setup: "Setup"
  };

  document.getElementById("screenTitle").textContent = titles[viewName] || "Home";
}
