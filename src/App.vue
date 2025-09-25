<template>
  <div class="app">
    <h1>📝 Трекер задач</h1>
    <form @submit.prevent="addTask" class="add-form">
      <input
        v-model="newTask"
        type="text"
        placeholder="Введите задачу..."
        autocomplete="off"
        required
      />
      <button type="submit">➕ Добавить</button>
    </form>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <label>
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task.id)"
          />
          <span :class="{ completed: task.completed }">{{ task.text }}</span>
        </label>
        <button @click="removeTask(task.id)" class="delete-btn">×</button>
      </li>
    </ul>

    <div v-if="tasks.length === 0" class="empty">
      Нет задач. Добавьте первую!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const newTask = ref('')
const tasks = ref([])

// Загрузка из localStorage
onMounted(() => {
  const saved = localStorage.getItem('tasks')
  if (saved) tasks.value = JSON.parse(saved)
})

// Сохранение в localStorage
const save = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      text: newTask.value.trim(),
      completed: false
    })
    newTask.value = ''
    save()
  }
}

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    save()
  }
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
  save()
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f8f9fa;
}

.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.add-form button {
  padding: 10px 16px;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.add-form button:hover {
  background: #0b5ed7;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.task-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
}

.task-item input[type="checkbox"] {
  margin-right: 12px;
  transform: scale(1.3);
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 20px 0;
}
</style>