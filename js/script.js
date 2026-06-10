function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function calculateStreak(completedDays) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    if (completedDays[dateStr]) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getCurrentWeekDays() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

function getWeekProgress(completedDays, weekDays) {
  let completed = 0;
  weekDays.forEach(d => {
    const dateStr = d.toISOString().split('T')[0];
    if (completedDays[dateStr]) completed++;
  });
  return { 
    completed, 
    total: 7, 
    percent: Math.round((completed / 7) * 100) 
  };
}

function renderHabits() {
  const container = document.getElementById('habitList');
  if (habits.length === 0) {
    container.innerHTML = '<div class="empty-state">Нет привычек. Добавьте первую!</div>';
    return;
  }

  const weekDays = getCurrentWeekDays();
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  container.innerHTML = habits.map(habit => {
    const streak = calculateStreak(habit.completedDays);
    const weekProgress = getWeekProgress(habit.completedDays, weekDays);
    
    const daysHtml = weekDays.map((d, idx) => {
      const dateStr = d.toISOString().split('T')[0];
      const isCompleted = habit.completedDays[dateStr] ? true : false;
      return `<button class="day-btn ${isCompleted ? 'completed' : ''}" 
                    onclick="toggleDay('${habit.id}', '${dateStr}')">
                ${dayNames[idx]}
              </button>`;
    }).join('');

    return `
      <div class="habit-card">
        <div class="habit-header">
          <span class="habit-name">${escapeHtml(habit.name)}</span>
          <div style="display: flex; align-items: center;">
            <span class="habit-streak">🔥 ${streak} дн.</span>
            <button class="delete-btn" onclick="deleteHabit('${habit.id}')">✕</button>
          </div>
        </div>
        <div class="week-row">${daysHtml}</div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${weekProgress.percent}%;"></div>
          </div>
          <span class="progress-text">${weekProgress.completed}/${weekProgress.total} за неделю</span>
        </div>
      </div>
    `;
  }).join('');
}

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', function() {
  loadFromStorage();
  renderHabits();

  const addButton = document.getElementById('addButton');
  if (addButton) {
    addButton.addEventListener('click', addHabit);
  }

  console.log('✅ Трекер привычек успешно запущен');
});

// Автообновление при смене даты
setInterval(renderHabits, 60000);