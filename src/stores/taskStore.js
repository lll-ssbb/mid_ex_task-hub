import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useTaskStore = defineStore('task-store', () => {
  // --- 1. 状态 (State) ---
  // 使用 Hook 读取任务，并自动将变更同步到 LocalStorage
  const tasks = useLocalStorage('my-tasks', [])
  const filter = ref('all')

  // --- 2. 派生状态 (Getters) ---
  const filteredTasks = computed(() => {
    if (filter.value === 'active') return tasks.value.filter(t => !t.isCompleted)
    if (filter.value === 'completed') return tasks.value.filter(t => t.isCompleted)
    return tasks.value
  })

  // --- 3. 动作 (Actions) ---
  const addTask = (title) => {
    tasks.value.unshift({ id: crypto.randomUUID(), title, isCompleted: false })
  }

  const removeTask = (id) => {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  const toggleTask = (id) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.isCompleted = !task.isCompleted
  }

  return {
    tasks,
    filter,
    filteredTasks,
    addTask,
    removeTask,
    toggleTask
  }
})
