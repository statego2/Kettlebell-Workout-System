function render() {
  if (!state.meta.isSetupComplete) {
    setView("setup");
  }

  renderShell();
  renderHome();
  renderLevels();
  renderSystem();
  renderHistory();
  renderStats();
  renderSetup();
  renderWelcome();
}

function renderShell() {
  const weekCount = state.workouts.filter((workout) => isThisWeek(workout.date)).length;
  document.getElementById("railCurrent").textContent = `${state.profile.currentLevelKg}kg`;
  document.getElementById("railWeek").textContent = `${weekCount}/${state.profile.weeklyTarget}`;
}

function renderHome() {
  const currentClass = getCurrentClass();
  const currentLevel = state.profile.currentLevelKg;
  const ownership = getOwnershipScore();
  const weekCount = state.workouts.filter((workout) => isThisWeek(workout.date)).length;

  document.getElementById("categoryLabel").textContent = `${currentClass.name} category`;
  document.getElementById("currentLevelTitle").textContent = `${currentLevel} kg`;
  document.getElementById("currentLevelSubtitle").textContent = `Active ${currentClass.name} level`;
  document.getElementById("weekProgress").textContent = `${weekCount}/${state.profile.weeklyTarget}`;
  document.getElementById("weekProgressText").textContent = weekCount >= state.profile.weeklyTarget ? "target hit" : "sessions logged";
  document.getElementById("readinessSignal").textContent = `${ownership.percent}%`;
  document.getElementById("readinessText").textContent = ownership.text;
  document.getElementById("nearbyPill").textContent = `${currentLevel}kg zone`;
  document.getElementById("ownershipTitle").textContent = `${currentLevel}kg command`;
  document.getElementById("ownershipPill").textContent = ownership.label;
  document.getElementById("ownershipMeterFill").style.width = `${ownership.percent}%`;
  document.getElementById("ownershipList").innerHTML = ownership.parts.map((part) => (
    `<article class="ownership-item">
      <div>
        <strong>${part.label}</strong>
        <span>${part.value}${part.suffix}/${part.target}${part.suffix}</span>
      </div>
      <div class="ownership-track">
        <span style="width:${Math.min(100, Math.round((part.score / part.points) * 100))}%"></span>
      </div>
    </article>`
  )).join("");

  const currentIndex = LEVELS.indexOf(currentLevel);
  const percent = currentIndex / (LEVELS.length - 1);
  document.getElementById("climberDot").style.left = `${38 + percent * 30}%`;

  document.getElementById("nearbyLevels").innerHTML = getNearbyLevels().map((level) => (
    `<article class="level-node ${getLevelStatus(level)}">
      <strong>${level}kg</strong>
      <span>${getLevelStatus(level)}</span>
    </article>`
  )).join("");

  renderActivityList("recentWorkouts", sortByDateDesc(state.workouts).slice(0, 4));
}

function renderLevels() {
  const currentClass = getCurrentClass();
  document.getElementById("classTitle").textContent = currentClass.name;
  document.getElementById("classRange").textContent = currentClass.range;
  document.getElementById("classDescription").textContent = currentClass.description;
  document.getElementById("classMeter").innerHTML = CLASSES.map((item) => {
    const isCurrent = item.name === currentClass.name;
    const isPast = item.max < state.profile.currentLevelKg;
    const meterStatus = isCurrent ? "active" : isPast ? "conquered" : "locked";

    return `<span class="class-chip ${meterStatus}${isCurrent ? " is-current" : ""}">
      ${item.name}
    </span>`;
  }).join("");

  const terrainMap = document.getElementById("terrainMap");
  const visibleTerrain = getTerrainLevels();
  terrainMap.innerHTML = visibleTerrain.map((level) => {
    const status = getLevelStatus(level);
    return `<div class="terrain-band ${status}">
      <span>${level}kg</span>
      <span>${statusLabels[status]}</span>
    </div>`;
  }).join("");

  const hiddenLockedCount = LEVELS.filter((level) => (
    level > Math.max(...visibleTerrain) && getLevelStatus(level) === "locked"
  )).length;

  if (hiddenLockedCount > 0) {
    terrainMap.insertAdjacentHTML("beforeend", `<div class="terrain-fog">
      <span>Higher summit</span>
      <strong>${hiddenLockedCount} locked weights above</strong>
    </div>`);
  }

  const focusLevels = LEVELS.filter((level) => {
    const status = getLevelStatus(level);
    return status !== "locked" || level <= state.profile.currentLevelKg + 8;
  });

  document.getElementById("levelList").innerHTML = focusLevels.map((level) => {
    const status = getLevelStatus(level);
    const work = getLevelWork(level);
    const action = getLevelAction(level, status);
    const levelDetail = getLevelDetail(level, status, work);

    return `<article class="level-row ${status}">
      <div>
        <strong>${level}kg</strong>
        <span>${levelDetail}</span>
      </div>
      ${action}
    </article>`;
  }).join("");

  renderLevelTimeline();
}

function getCompletedLessonIds() {
  return state.learning?.completedLessonIds || [];
}

function isLessonCompleted(lessonId) {
  return getCompletedLessonIds().includes(lessonId);
}

function isLessonAvailable(lessonId) {
  const index = SYSTEM_LESSONS.findIndex((lesson) => lesson.id === lessonId);
  if (index <= 0) return true;
  return isLessonCompleted(SYSTEM_LESSONS[index - 1].id);
}

function getLessonState(lessonId) {
  if (isLessonCompleted(lessonId)) return "completed";
  if (isLessonAvailable(lessonId)) return "available";
  return "locked";
}

function getNextLesson() {
  return SYSTEM_LESSONS.find((lesson) => !isLessonCompleted(lesson.id)) || SYSTEM_LESSONS[SYSTEM_LESSONS.length - 1];
}

function renderSystem() {
  const completed = getCompletedLessonIds().length;
  const nextLesson = getNextLesson();
  const currentModule = nextLesson?.module || "Complete";

  document.getElementById("systemProgressValue").textContent = `${completed}/${SYSTEM_LESSONS.length}`;
  document.getElementById("systemProgressText").textContent = completed === SYSTEM_LESSONS.length ? "system complete" : "lessons complete";
  document.getElementById("systemGateValue").textContent = currentModule;
  document.getElementById("systemGateText").textContent = completed === SYSTEM_LESSONS.length ? "all gates passed" : `${nextLesson.id}. ${nextLesson.title}`;

  document.getElementById("systemModuleList").innerHTML = SYSTEM_MODULES.map((moduleName) => {
    const lessons = SYSTEM_LESSONS.filter((lesson) => lesson.module === moduleName);
    const moduleCompleted = lessons.filter((lesson) => isLessonCompleted(lesson.id)).length;

    return `<section class="panel system-module">
      <div class="section-head">
        <div>
          <p class="eyebrow">Module</p>
          <h3>${moduleName}</h3>
        </div>
        <span class="pill">${moduleCompleted}/${lessons.length}</span>
      </div>
      <div class="lesson-list">
        ${lessons.map((lesson) => renderLessonRow(lesson)).join("")}
      </div>
    </section>`;
  }).join("");

  renderLessonDetail();
}

function renderLessonRow(lesson) {
  const status = getLessonState(lesson.id);
  const disabled = status === "locked" ? "disabled" : "";
  const action = status === "completed" ? "Completed" : status === "available" ? "Open" : "Locked";

  return `<button class="lesson-row ${status}" type="button" data-open-lesson="${lesson.id}" ${disabled}>
    <span class="lesson-mark">${status === "completed" ? "✓" : lesson.id}</span>
    <span class="lesson-row-copy">
      <strong>${lesson.title}</strong>
      <small>${lesson.summary}</small>
    </span>
    <span class="lesson-state">${action}</span>
  </button>`;
}

function renderLessonDetail() {
  const mapView = document.getElementById("systemMapView");
  const detailView = document.getElementById("lessonDetailView");
  const lesson = SYSTEM_LESSONS.find((item) => item.id === selectedLessonId);

  if (!lesson) {
    mapView.hidden = false;
    detailView.hidden = true;
    detailView.innerHTML = "";
    return;
  }

  const status = getLessonState(lesson.id);
  const nextLesson = SYSTEM_LESSONS[SYSTEM_LESSONS.findIndex((item) => item.id === lesson.id) + 1];
  mapView.hidden = true;
  detailView.hidden = false;
  detailView.innerHTML = `
    <button class="text-button lesson-back" type="button" data-system-back>← Course map</button>
    <section class="lesson-hero ${lesson.art}">
      ${renderLessonArt(lesson.art)}
    </section>
    <section class="panel lesson-body">
      <p class="eyebrow">${lesson.eyebrow}</p>
      <h2>${lesson.id}. ${lesson.title}</h2>
      <p class="lesson-lede">${lesson.summary}</p>
      ${renderLectureSections(lesson)}
      <div class="doctrine-card">
        <span>The rule</span>
        <strong>${lesson.rule}</strong>
      </div>
      <div class="practice-card">
        <span>Practice</span>
        <p>${lesson.practice}</p>
      </div>
      <button class="submit-button lesson-complete-button" type="button" data-complete-lesson="${lesson.id}" ${status === "completed" ? "disabled" : ""}>
        ${status === "completed" ? "Lesson completed" : "Mark lesson complete"}
      </button>
      ${nextLesson ? `<p class="quiet-text lesson-next">Next: ${nextLesson.title}</p>` : `<p class="quiet-text lesson-next">System complete.</p>`}
    </section>
  `;
}

function renderLectureSections(lesson) {
  if (!lesson.body?.length) return "";

  return `<div class="lecture-content">
    ${lesson.body.map((section) => `
      <section class="lecture-section">
        <h3>${section.heading}</h3>
        ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </section>
    `).join("")}
  </div>`;
}

function renderLessonArt(art) {
  if (art === "triad") {
    return `<div class="art-triad">
      <div class="bell-icon large"></div>
      <span>Engine</span><span>Bridge</span><span>Base</span>
    </div>`;
  }

  if (art === "swing") {
    return `<div class="art-swing">
      <span class="swing-arc"></span>
      <span class="swing-bell"></span>
      <span class="ground-line"></span>
    </div>`;
  }

  if (art === "press") {
    return `<div class="art-press">
      <span></span><span></span><span></span><span></span>
    </div>`;
  }

  if (art === "deadlift") {
    return `<div class="art-deadlift">
      <span class="body-line"></span>
      <span class="side-bell"></span>
      <span class="square-line"></span>
    </div>`;
  }

  if (art === "spectrum") {
    return `<div class="art-spectrum">
      <span>Swing</span><span>Squat-To-Press</span><span>Deadlift</span>
    </div>`;
  }

  if (art === "ladder" || art === "unlock") {
    return `<div class="art-ladder">
      <span>Technique</span><span>Density</span><span>Repeat</span><span>Load</span>
    </div>`;
  }

  if (art === "emom" || art === "snatch") {
    return `<div class="art-clock">
      <span>10</span>
      <strong>${art === "snatch" ? "100/5" : "EMOM"}</strong>
    </div>`;
  }

  if (art === "week" || art === "mobility" || art === "loop") {
    return `<div class="art-loop">
      <span></span><span></span><span></span><span></span>
    </div>`;
  }

  return `<div class="art-generic">
    <div class="bell-icon large"></div>
    <span></span><span></span><span></span>
  </div>`;
}

function getLevelDetail(level, status, work) {
  const workText = `${work.max} Max · ${work.medium} Medium`;

  if (status === "active") {
    return `${statusLabels[status]} · ${workText}`;
  }

  if (status === "locked") {
    return `${statusLabels[status]} · future weight`;
  }

  return `${statusLabels[status]} · ${workText}`;
}

function renderLevelTimeline() {
  const timeline = LEVELS
    .map((level) => ({ level, ...state.levels[level] }))
    .filter((item) => item.status === "conquered" || item.status === "active")
    .reverse();

  const target = document.getElementById("levelTimeline");

  if (!timeline.length) {
    target.innerHTML = `<article class="timeline-item"><strong>No level history yet</strong><span>Your climb starts after setup.</span></article>`;
    return;
  }

  target.innerHTML = timeline.map((item) => {
    const isActive = item.status === "active";
    const started = item.activatedAt || item.unlockedAt || todayISO();
    const label = isActive ? "Active level" : "Conquered level";

    return `<article class="timeline-item ${item.status}">
      <strong>${item.level}kg</strong>
      <span>${label} · started ${formatDate(started)}</span>
    </article>`;
  }).join("");
}

function getTerrainLevels() {
  const currentIndex = LEVELS.indexOf(state.profile.currentLevelKg);
  const lastVisibleIndex = Math.min(
    LEVELS.length - 1,
    Math.max(currentIndex + 2, LEVELS.indexOf(state.profile.highestUnlockedKg) + 1)
  );

  return LEVELS.slice(0, lastVisibleIndex + 1);
}

function getLevelAction(level, status) {
  const currentIndex = LEVELS.indexOf(state.profile.currentLevelKg);
  const levelIndex = LEVELS.indexOf(level);
  const nextLevel = LEVELS[currentIndex + 1];

  if (status === "locked" && levelIndex === currentIndex + 1) {
    return `<button class="status-action locked" type="button" data-unlock="${level}">Unlock</button>`;
  }

  if (status === "unlocked") {
    return `<button class="status-action unlocked" type="button" data-activate="${level}">Set active</button>`;
  }

  if (status === "active" && nextLevel && nextLevel <= state.profile.highestUnlockedKg) {
    return `<button class="status-action active" type="button" data-conquer="${level}">Mark conquered</button>`;
  }

  return `<span class="status-pill ${status}">${statusLabels[status]}</span>`;
}

function renderHistory() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthWorkouts = state.workouts.filter((workout) => {
    const date = new Date(`${workout.date}T00:00:00`);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  document.getElementById("monthName").textContent = new Intl.DateTimeFormat("en", { month: "long" }).format(now);
  document.getElementById("monthTotal").textContent = monthWorkouts.length;

  const buckets = Array.from({ length: 12 }, (_, index) => {
    const start = index * 3 + 1;
    const end = start + 2;
    return monthWorkouts.filter((workout) => {
      const day = new Date(`${workout.date}T00:00:00`).getDate();
      return day >= start && day <= end;
    }).length;
  });

  const maxBucket = Math.max(...buckets, 1);
  document.getElementById("monthBars").innerHTML = buckets.map((count) => (
    `<div class="bar" style="height:${8 + (count / maxBucket) * 100}px" title="${count} workouts"></div>`
  )).join("");

  renderActivityList("allWorkouts", sortByDateDesc(state.workouts));
}

function renderStats() {
  const stats = sortByDateDesc(state.bodyStats);
  const latest = stats[0];
  const baseline = state.bodyStats[state.bodyStats.length - 1];
  const delta = latest && baseline ? latest.bodyweightKg - baseline.bodyweightKg : 0;
  const ownership = getOwnershipScore();

  document.getElementById("bodyweightValue").textContent = latest ? `${latest.bodyweightKg}kg` : "--";
  document.getElementById("bodyweightDelta").textContent = delta === 0 ? "baseline" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)}kg`;
  document.getElementById("statsOwnershipValue").textContent = `${ownership.percent}%`;
  document.getElementById("statsOwnershipLabel").textContent = ownership.label;
  document.getElementById("bodyweightInput").value = latest ? latest.bodyweightKg : 92;

  const bodyStatsList = document.getElementById("bodyStatsList");
  bodyStatsList.innerHTML = stats.map((item) => (
    `<article class="activity-item">
      <div>
        <strong>${item.bodyweightKg}kg</strong>
        <span>${formatDate(item.date)}${item.note ? ` · ${escapeHtml(item.note)}` : ""}</span>
      </div>
      <div class="activity-badge other">KG</div>
    </article>`
  )).join("");
}

function renderSetup() {
  const currentSelect = document.getElementById("currentLevelSelect");
  const unlockedSelect = document.getElementById("highestUnlockedSelect");
  const options = LEVELS.map((level) => `<option value="${level}">${level}kg</option>`).join("");

  currentSelect.innerHTML = options;
  unlockedSelect.innerHTML = options;
  document.getElementById("profileName").value = state.profile.name;
  currentSelect.value = state.profile.currentLevelKg;
  unlockedSelect.value = state.profile.highestUnlockedKg;
  document.getElementById("weeklyTargetSelect").value = state.profile.weeklyTarget;
  document.getElementById("levelAgeMonths").value = Math.round((daysBetween(getCurrentLevelRecord().activatedAt || todayISO()) / 30) * 2) / 2;
  document.getElementById("setupHeroTitle").textContent = `${state.profile.currentLevelKg}kg active`;
  document.getElementById("setupCurrentPreview").textContent = `${state.profile.currentLevelKg}kg`;
  document.getElementById("setupUnlockedPreview").textContent = `${state.profile.highestUnlockedKg}kg`;
  document.getElementById("setupWeekPreview").textContent = `${state.profile.weeklyTarget}x`;
  document.getElementById("workoutDate").value = todayISO();
}

function renderWelcome() {
  document.getElementById("welcomeModal").hidden = state.meta.isSetupComplete;
}

function renderActivityList(targetId, workouts) {
  const target = document.getElementById(targetId);

  if (!workouts.length) {
    target.innerHTML = `<article class="activity-item"><div><strong>No workouts yet</strong><span>Log your first session.</span></div></article>`;
    return;
  }

  target.innerHTML = workouts.map((workout) => {
    const label = workoutLabels[workout.type];
    const level = workout.levelKg ? `${workout.levelKg}kg` : "free";
    return `<article class="activity-item">
      <div>
        <strong>${label.title}</strong>
        <span>${formatDate(workout.date)} · ${level} · ${workout.durationMinutes || 0} min</span>
      </div>
      <div class="activity-controls">
        <button class="mini-button" type="button" data-edit-workout="${workout.id}">Edit</button>
        <button class="mini-button danger" type="button" data-delete-workout="${workout.id}">Delete</button>
        <div class="activity-badge ${label.badge}">${label.short}</div>
      </div>
    </article>`;
  }).join("");
}

function dateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - Math.max(0, days));
  return date.toISOString().slice(0, 10);
}

function openConquestModal(level) {
  const status = getLevelStatus(level);
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];

  if (status !== "active" || !nextLevel || nextLevel > state.profile.highestUnlockedKg) {
    closeConquestModal();
    showToast("Unlock the next kettlebell first");
    return;
  }

  const work = getLevelWork(level);
  const ownership = getOwnershipScore(level);

  pendingConquestLevel = level;
  document.getElementById("conquestTitle").textContent = `Mark ${level}kg conquered?`;
  document.getElementById("conquestCopy").textContent = nextLevel
    ? `This will close ${level}kg and move your active level to ${nextLevel}kg.`
    : `This will mark the final summit as conquered.`;
  document.getElementById("conquestStats").innerHTML = `
    <div><span>Ownership</span><strong>${ownership.percent}%</strong></div>
    <div><span>Max</span><strong>${work.max}</strong></div>
    <div><span>Medium</span><strong>${work.medium}</strong></div>
    <div><span>Strong weeks</span><strong>${getStrongWeeksForLevel(level)}</strong></div>
  `;
  document.getElementById("conquestModal").hidden = false;
}

function closeConquestModal() {
  pendingConquestLevel = null;
  document.getElementById("conquestModal").hidden = true;
}

function confirmConquest() {
  if (!pendingConquestLevel) {
    closeConquestModal();
    return;
  }

  const level = pendingConquestLevel;
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];

  state.levels[level] = {
    ...(state.levels[level] || {}),
    status: "conquered",
    conqueredAt: todayISO()
  };

  if (nextLevel) {
    LEVELS.forEach((item) => {
      if (state.levels[item]?.status === "active") {
        state.levels[item].status = item === level ? "conquered" : state.levels[item].status;
      }
    });

    state.profile.currentLevelKg = nextLevel;
    state.profile.highestUnlockedKg = Math.max(state.profile.highestUnlockedKg, nextLevel);
    state.levels[nextLevel] = {
      ...(state.levels[nextLevel] || {}),
      status: "active",
      unlockedAt: state.levels[nextLevel]?.unlockedAt || todayISO(),
      activatedAt: todayISO(),
      conqueredAt: null
    };
  }

  saveState();
  closeConquestModal();
  render();
  showToast(`${level}kg conquered`);
}

function editWorkout(id) {
  const workout = state.workouts.find((item) => item.id === id);
  if (!workout) return;

  document.getElementById("editingWorkoutId").value = workout.id;
  document.getElementById("workoutType").value = workout.type;
  document.getElementById("workoutDate").value = workout.date;
  document.getElementById("workoutDuration").value = workout.durationMinutes || 45;
  document.getElementById("workoutNotes").value = workout.notes || "";
  document.getElementById("workoutSubmitButton").textContent = "Save workout";
  document.getElementById("cancelEditButton").hidden = false;
  setView("log");
}

function resetWorkoutForm() {
  document.getElementById("editingWorkoutId").value = "";
  document.getElementById("workoutType").value = "max_level_full_body";
  document.getElementById("workoutDate").value = todayISO();
  document.getElementById("workoutDuration").value = 45;
  document.getElementById("workoutNotes").value = "";
  document.getElementById("workoutSubmitButton").textContent = "Log workout";
  document.getElementById("cancelEditButton").hidden = true;
}

function activateLevel(level) {
  LEVELS.forEach((item) => {
    if (state.levels[item]?.status === "active" && item !== level) {
      state.levels[item].status = item < level ? "conquered" : "unlocked";
      state.levels[item].conqueredAt = item < level ? (state.levels[item].conqueredAt || todayISO()) : null;
    }
  });

  state.profile.currentLevelKg = level;
  state.profile.highestUnlockedKg = Math.max(state.profile.highestUnlockedKg, level);
  state.levels[level] = {
    ...(state.levels[level] || {}),
    status: "active",
    unlockedAt: state.levels[level]?.unlockedAt || todayISO(),
    activatedAt: todayISO(),
    conqueredAt: null
  };
}

function deleteWorkout(id) {
  const index = state.workouts.findIndex((workout) => workout.id === id);
  if (index === -1) return;

  lastDeletedWorkout = state.workouts[index];
  state.workouts.splice(index, 1);
  saveState();
  render();
  showUndoToast("Workout deleted");
}

function showUndoToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = `${message} <button type="button" id="undoDeleteButton">Undo</button>`;
  toast.classList.add("is-visible");
  window.clearTimeout(undoTimer);
  undoTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    lastDeletedWorkout = null;
  }, 4200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function saveDataFile() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "kettlebell-workout-system-export.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Data saved");
}

function uploadDataFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const uploadedState = normalizeState(JSON.parse(reader.result));
      const shouldReplace = window.confirm("Upload this backup and replace the current app data?");
      if (!shouldReplace) return;

      state = uploadedState;
      saveState();
      render();
      setView("home");
      showToast("Data uploaded");
    } catch {
      showToast("Invalid backup file");
    }
  });
  reader.readAsText(file);
}

