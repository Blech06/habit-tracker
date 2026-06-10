function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addHabit() {
  const input = document.getElementById('habitName');
  const name = input.value.trim();
  if (!name) {
    alert('Введите название привычки');
    return;
  }
  const newHabit = {
    id: generateId(),
    name: name,
    completedDays: {},
    createdAt: new Date().toISOString()
  };
  habits.push(newHabit);
  saveToStorage();
  input.value = '';
  renderHabits();
}

function deleteHabit(id) {
  habits = habits.filter(h => h.id !== id);
  saveToStorage();
  renderHabits();
}

function toggleDay(habitId, dateStr) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;
  
  if (habit.completedDays[dateStr]) {
    delete habit.completedDays[dateStr];
  } else {
    habit.completedDays[dateStr] = true;
  }
  saveToStorage();
  renderHabits();
}