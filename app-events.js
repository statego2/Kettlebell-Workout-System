document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    setView(viewButton.dataset.view);
    return;
  }

  const logButton = event.target.closest("[data-workout]");
  if (logButton) {
    document.getElementById("workoutType").value = logButton.dataset.workout;
    document.getElementById("workoutDate").value = todayISO();
    setView("log");
    return;
  }

  const openLessonButton = event.target.closest("[data-open-lesson]");
  if (openLessonButton) {
    const lessonId = openLessonButton.dataset.openLesson;
    if (getLessonState(lessonId) === "locked") {
      showToast("Complete the previous lesson first");
      return;
    }

    selectedLessonId = lessonId;
    renderSystem();
    return;
  }

  if (event.target.closest("[data-system-back]")) {
    selectedLessonId = null;
    renderSystem();
    return;
  }

  const completeLessonButton = event.target.closest("[data-complete-lesson]");
  if (completeLessonButton) {
    const lessonId = completeLessonButton.dataset.completeLesson;
    if (!isLessonCompleted(lessonId)) {
      state.learning.completedLessonIds.push(lessonId);
      state.learning.completedLessonIds = [...new Set(state.learning.completedLessonIds)];
      saveState();
      renderSystem();
      showToast("Lesson complete");
    }
    return;
  }

  const editButton = event.target.closest("[data-edit-workout]");
  if (editButton) {
    editWorkout(editButton.dataset.editWorkout);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-workout]");
  if (deleteButton) {
    deleteWorkout(deleteButton.dataset.deleteWorkout);
    return;
  }

  if (event.target.id === "undoDeleteButton" && lastDeletedWorkout) {
    state.workouts.push(lastDeletedWorkout);
    lastDeletedWorkout = null;
    saveState();
    render();
    showToast("Workout restored");
    return;
  }

  const unlockButton = event.target.closest("[data-unlock]");
  if (unlockButton) {
    state.profile.highestUnlockedKg = Number(unlockButton.dataset.unlock);
    saveState();
    render();
    showToast(`${unlockButton.dataset.unlock}kg unlocked`);
    return;
  }

  const activateButton = event.target.closest("[data-activate]");
  if (activateButton) {
    const level = Number(activateButton.dataset.activate);
    activateLevel(level);
    saveState();
    render();
    showToast(`${level}kg is now active`);
    return;
  }

  const conquerButton = event.target.closest("[data-conquer]");
  if (conquerButton) {
    openConquestModal(Number(conquerButton.dataset.conquer));
  }
});

document.getElementById("workoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const type = document.getElementById("workoutType").value;
  const duration = Number(document.getElementById("workoutDuration").value);
  const notes = document.getElementById("workoutNotes").value.trim();
  const editingId = document.getElementById("editingWorkoutId").value;

  const workoutData = {
    id: editingId || makeId(),
    date: document.getElementById("workoutDate").value || todayISO(),
    type,
    levelKg: type === "other" ? null : state.profile.currentLevelKg,
    durationMinutes: duration,
    notes
  };

  if (editingId) {
    state.workouts = state.workouts.map((workout) => (
      workout.id === editingId ? { ...workout, ...workoutData } : workout
    ));
  } else {
    state.workouts.push(workoutData);
  }

  resetWorkoutForm();
  saveState();
  render();
  setView("home");
  showToast(editingId ? "Workout updated" : "Workout logged");
});

document.getElementById("bodyStatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const bodyweight = Number(document.getElementById("bodyweightInput").value);
  const note = document.getElementById("bodyweightNote").value.trim();

  state.bodyStats.push({
    id: makeId(),
    date: todayISO(),
    bodyweightKg: bodyweight,
    note
  });

  document.getElementById("bodyweightNote").value = "";
  saveState();
  render();
  showToast("Body stat added");
});

document.getElementById("setupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const currentLevel = Number(document.getElementById("currentLevelSelect").value);
  const highestUnlocked = Number(document.getElementById("highestUnlockedSelect").value);
  const levelAgeMonths = Math.max(0, Number(document.getElementById("levelAgeMonths").value) || 0);
  const activeDate = dateDaysAgo(Math.round(levelAgeMonths * 30));

  state.profile.name = document.getElementById("profileName").value.trim() || "Athlete";
  state.profile.currentLevelKg = currentLevel;
  state.profile.highestUnlockedKg = Math.max(highestUnlocked, currentLevel);
  state.profile.weeklyTarget = Number(document.getElementById("weeklyTargetSelect").value);
  state.meta.isSetupComplete = true;
  state.meta.isDemo = false;
  state.levels = createLevelState(currentLevel, state.profile.highestUnlockedKg, activeDate);

  saveState();
  render();
  setView("home");
  showToast("Setup saved");
});

document.getElementById("resetButton").addEventListener("click", () => {
  const shouldReset = window.confirm("Reset all app data? This clears setup, workouts, levels and System progress.");
  if (!shouldReset) return;

  state = emptyState();
  saveState();
  render();
  setView("setup");
  showToast("App data reset");
});

document.getElementById("demoButton").addEventListener("click", () => {
  state = defaultState();
  saveState();
  render();
  setView("home");
  showToast("Demo data loaded");
});

document.getElementById("welcomeDemoButton").addEventListener("click", () => {
  state = defaultState();
  saveState();
  render();
  setView("home");
  showToast("Demo data loaded");
});

document.getElementById("startSetupButton").addEventListener("click", () => {
  document.getElementById("welcomeModal").hidden = true;
  setView("setup");
});

document.getElementById("confirmConquestButton").addEventListener("click", confirmConquest);
document.getElementById("cancelConquestButton").addEventListener("click", closeConquestModal);
document.getElementById("cancelEditButton").addEventListener("click", resetWorkoutForm);

document.getElementById("exportButton").addEventListener("click", saveDataFile);
document.getElementById("saveDataButton").addEventListener("click", saveDataFile);
document.getElementById("uploadDataButton").addEventListener("click", () => {
  document.getElementById("uploadDataInput").click();
});
document.getElementById("uploadDataInput").addEventListener("change", (event) => {
  uploadDataFile(event.target.files[0]);
  event.target.value = "";
});

render();
