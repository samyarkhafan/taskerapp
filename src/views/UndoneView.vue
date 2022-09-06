<template>
  <TaskViewer :tasks="tasks" mode="2" @delete="deleteTask" @renew="renewTask" />
</template>

<script>
import axios from "axios";
import TaskViewer from "@/components/TaskViewer.vue";
export default {
  name: "UndoneView",
  emits: ["all", "undone", "create", "sign-up", "signed-in", "today"],
  components: { TaskViewer: TaskViewer },
  data() {
    return {
      tasks: [],
    };
  },
  beforeCreate() {
    this.$emit("undone");
    axios
      .get("http://127.0.0.1:8000/api/v1/tasks/undone", {
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
    renewTask(obj, newdate) {
      const i = this.tasks.findIndex((x) => {
        return x.id == obj.id;
      });
      let data = {};
      this.tasks.splice(i, 1);
      if (obj.is_interval == true) {
        data = {
          name: obj.name,
          desc: obj.desc,
          is_interval: obj.is_interval,
          interval_days: obj.interval_days,
        };
      } else {
        data = {
          name: obj.name,
          desc: obj.desc,
          is_interval: obj.is_interval,
          activates_on: newdate,
        };
      }
      axios.put("http://127.0.0.1:8000/api/v1/tasks/" + obj.id + "/", data);
    },
  },
};
</script>
