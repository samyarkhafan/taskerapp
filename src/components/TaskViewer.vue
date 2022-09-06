<template>
  <div
    class="modal fade"
    id="viewModal"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ obj.name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @mouseup="blurButton($event)"
          ></button>
        </div>
        <div class="modal-body">
          <h3>Description :</h3>
          <pre>{{ obj.desc }}</pre>
          <hr />
          <h5>Properties :</h5>
          is interval : {{ obj.is_interval }}
          <span v-if="obj.is_interval"
            >interval days : {{ obj.interval_days }}</span
          >
          <br />
          activates on : {{ obj.activates_on }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-warning"
            data-bs-dismiss="modal"
            @mouseup="blurButton($event)"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @mouseup="blurButton($event)"
          ></button>
        </div>
        <form @submit.prevent="deleteTask(obj.id)">
          <div class="modal-body">
            Are you sure you want to delete {{ obj.name }}?
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @mouseup="blurButton($event)"
            >
              Yes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="renewModal"
    tabindex="-1"
    data-bs-backdrop="static"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Renew task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            @mouseup="blurButton($event)"
          ></button>
        </div>
        <form @submit.prevent="renewTask(obj)">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <label
                  for="active"
                  class="form-label col-form-label col-lg-2 col-12"
                  >Activates on :</label
                >
                <input
                  class="form-control bg-dark text-white col"
                  type="date"
                  v-model="newdate"
                  id="active"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div
              class="bg-danger text-center rounded-3 p-3 w-100"
              v-if="newdate == ''"
            >
              Please fill the activates on field.
            </div>
            <button
              class="btn btn-outline-warning"
              data-bs-dismiss="modal"
              v-if="newdate != ''"
              @mouseup="blurButton($event)"
            >
              Renew
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="toast" class="toast bg-success">
      <div class="toast-header">
        <strong class="me-auto">Task completed</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
        ></button>
      </div>
      <div class="toast-body">You have done the task {{ obj.name }}.</div>
    </div>
  </div>

  <div
    class="bg-black bg-opacity-25 rounded-3 m-3 p-3 shadow-lg row"
    v-for="task in tasks"
    :key="task.id"
  >
    <button
      class="col-lg-7 col-12 btn btn-dark text-lg-start text-center"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#viewModal"
      @click="modalContent(task.id)"
      @focus="blurButton($event)"
    >
      {{ task.name }}
    </button>
    <div class="col-lg-3 col-12 text-center py-1">
      activates on : {{ task.activates_on }}
    </div>
    <div
      class="col-6 col-lg-1 text-lg-end text-center mt-lg-0 mt-3"
      v-if="mode == '3'"
    >
      <button
        class="btn btn-outline-warning"
        @click="editTask(task)"
        @mouseup="blurButton($event)"
        type="button"
      >
        <i class="bi bi-pencil-square"></i>
      </button>
    </div>
    <div
      class="col-6 col-lg-1 text-lg-end text-center mt-lg-0 mt-3"
      v-if="mode == '2' && task.is_interval == false"
    >
      <button
        class="btn btn-outline-warning"
        data-bs-toggle="modal"
        data-bs-target="#renewModal"
        @click="modalContent(task.id)"
        @focus="blurButton($event)"
        type="button"
      >
        <i class="bi bi-arrow-repeat"></i>
      </button>
    </div>
    <div
      class="col-6 col-lg-1 text-lg-end text-center mt-lg-0 mt-3"
      v-if="mode == '2' && task.is_interval == true"
    >
      <button
        class="btn btn-outline-warning"
        @click="renewTask(task)"
        @mouseup="blurButton($event)"
        type="button"
      >
        <i class="bi bi-arrow-repeat"></i>
      </button>
    </div>
    <div
      class="col-12 col-lg-1 text-lg-end text-center mt-lg-0 mt-3"
      v-if="mode == '1'"
    >
      <button
        class="btn btn-outline-warning"
        @click="completeTask(task)"
        @mouseup="blurButton($event)"
        type="button"
      >
        <i class="bi bi-check2"></i>
      </button>
    </div>
    <div
      class="col-6 col-lg-1 text-lg-end text-center mt-lg-0 mt-3"
      v-if="mode == '3' || mode == '2'"
    >
      <button
        class="btn btn-outline-warning"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
        @click="modalContent(task.id)"
        @focus="blurButton($event)"
        type="button"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

export default {
  name: "TaskViewer",
  props: ["tasks", "mode"],
  emits: ["delete", "renew"],
  data() {
    return {
      obj: {},
      newdate: "",
    };
  },
  methods: {
    modalContent(id) {
      this.obj = this.tasks.find((x) => {
        return x.id == id;
      });
      this.newdate = this.obj.activates_on;
    },
    blurButton(e) {
      var x = e.currentTarget;
      x.blur();
    },
    deleteTask(id) {
      this.$emit("delete", id);
    },
    completeTask(task) {
      this.obj = this.tasks.find((x) => {
        return x.id == task.id;
      });
      const toast = new bootstrap.Toast(document.getElementById("toast"));
      toast.show();
      if (task.is_interval == false) {
        this.$emit("delete", task.id);
      } else {
        this.$emit("renew", task);
      }
    },
    renewTask(task) {
      this.$emit("renew", task, this.newdate);
    },
    editTask(task) {
      localStorage.setItem("task", JSON.stringify(task));
      this.$router.push("/edit");
    },
  },
};
</script>
