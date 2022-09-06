<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="toast" class="toast bg-success">
      <div class="toast-header">
        <strong class="me-auto">Success</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
        ></button>
      </div>
      <div class="toast-body">Task created successfully.</div>
    </div>
  </div>

  <div class="px-3 py-3">
    <form @submit.prevent="sendData">
      <div class="mb-3">
        <label for="name" class="form-label">Name : </label>
        <input
          type="text"
          class="form-control bg-dark text-white"
          id="name"
          placeholder="Task's name"
          v-model="name"
        />
      </div>
      <div class="mb-3">
        <label for="desc" class="form-label">Description :</label>
        <textarea
          id="desc"
          class="form-control bg-dark text-white"
          rows="5"
          placeholder="Task's description"
          v-model="desc"
        ></textarea>
      </div>
      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          @click="blurButton($event)"
          id="is_interval"
          v-model="is_interval"
        />
        <label class="form-check-label" for="is_interval"> Interval </label>
      </div>
      <div v-if="is_interval" class="mb-3">
        <label for="days" class="form-label">Interval days :</label>
        <input
          type="number"
          min="1"
          class="form-control bg-dark text-white"
          v-model="interval_days"
          id="days"
        />
      </div>
      <div v-if="!is_interval" class="mb-3">
        <label for="active" class="form-label">Activates on :</label>
        <input
          class="form-control bg-dark text-white"
          type="date"
          v-model="activates_on"
          id="active"
        />
      </div>
      <div class="bg-danger text-center rounded-3 mb-3" v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div class="mb-3">
        <button
          class="btn btn-outline-warning w-100"
          @mouseup="blurButton($event)"
        >
          Create Task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
export default {
  name: "CreateView",
  emits: ["all", "undone", "create", "sign-up", "signed-in", "today"],
  data() {
    return {
      name: "",
      desc: "",
      is_interval: false,
      interval_days: 1,
      activates_on: "",
      errors: [],
    };
  },
  beforeCreate() {
    this.$emit("create");
  },
  methods: {
    sendData() {
      this.errors = [];
      const toastLiveExample = document.getElementById("toast");
      const toast = new bootstrap.Toast(toastLiveExample);
      let data = {};
      if (this.name == "") {
        this.errors.push("Please fill the name field.");
      }
      if (this.is_interval == true) {
        if (this.interval_days == "") {
          this.errors.push("Please fill the interval days field.");
        } else {
          data = {
            name: this.name,
            desc: this.desc,
            is_interval: this.is_interval,
            interval_days: this.interval_days,
          };
        }
      }
      if (this.is_interval == false) {
        if (this.activates_on == "") {
          this.errors.push("Please fill the activates on field.");
        } else {
          data = {
            name: this.name,
            desc: this.desc,
            is_interval: this.is_interval,
            activates_on: this.activates_on,
          };
        }
      }
      if (!this.errors.length) {
        axios
          .post("http://127.0.0.1:8000/api/v1/tasks/", data)
          .then(() => {
            this.name = "";
            this.desc = "";
            this.is_interval = false;
            this.interval_days = 1;
            this.activates_on = "";
            toast.show();
          })
          .catch((err) => {
            for (const e in err.response.data) {
              for (const e2 in err.response.data[e]) {
                this.errors.push(err.response.data[e][e2]);
              }
            }
          });
      }
    },
    blurButton(e) {
      var x = e.currentTarget;
      x.blur();
    },
  },
};
</script>
