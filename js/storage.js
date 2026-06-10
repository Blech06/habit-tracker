const STORAGE_KEY = 'habit_tracker_data';
let habits = [];   // глобальная переменная, доступная другим модулям

function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      habits = JSON.parse(saved);
    } catch (e) {
      habits = [];
    }
  } else {
    // Демо-привычка при первом запуске
    habits = [
      {
        id: '1',
        name: 'Читать 30 минут',
        completedDays: {},
        createdAt: new Date().toISOString()
      }
    ];
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}