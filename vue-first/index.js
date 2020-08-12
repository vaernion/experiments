import Vue from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm.browser.js";

const app = new Vue({
  el: "#app",
  data: {
    message: "first vue state",
    newTodo: "",
    todos: [],
    todoIds: 0,
  },
  methods: {
    addNewTodo() {
      if (!this.newTodo) return;
      this.todos.push({ id: ++this.todoIds, text: this.newTodo });
      this.newTodo = "";
    },
    clearTodos() {
      this.todos = [];
    },
    clearTodo(id) {
      this.todos = this.todos.filter((e) => e.id !== id);
    },
  },
});
