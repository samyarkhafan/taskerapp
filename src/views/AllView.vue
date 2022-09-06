<template>
  <TaskViewer :tasks="tasks" mode="3" @delete="deleteTask" />
</template>

<script>
import axios from "axios";
import TaskViewer from "@/components/TaskViewer.vue";
export default {
  name: "AllView",
  emits: ["all", "undone", "create", "sign-up", "signed-in", "today"],
  components: { TaskViewer: TaskViewer },
  data() {
    return {
      tasks: [],
    };
  },
  beforeCreate() {
    this.$emit("all");
    axios
      .get("http://127.0.0.1:8000/api/v1/tasks/", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
      .then((res) => {
        this.tasks = res.data;
      });
  },
  methods: {
    deleteTask(id) {
      const i = this.tasks.findIndex((x) => {
        return x.id == id;
      });
      this.tasks.splice(i, 1);
      axios.delete("http://127.0.0.1:8000/api/v1/tasks/" + id);
    },
  },
};
</script>
