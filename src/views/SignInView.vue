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
      <div class="toast-body">Signed in successfully.</div>
    </div>
  </div>

  <div class="px-3 py-3">
    <form @submit.prevent="submitForm">
      <div class="mb-3 row">
        <label for="username" class="form-label col-form-label col-lg-2 col-12"
          >Username :
        </label>
        <input
          type="text"
          class="form-control bg-dark text-white col-lg"
          id="username"
          placeholder="Your name"
          v-model="username"
        />
      </div>
      <div class="mb-3 row">
        <label for="pass" class="form-label col-form-label col-lg-2 col-12"
          >Password :
        </label>
        <input
          type="password"
          class="form-control bg-dark text-white col"
          id="pass"
          placeholder="Your password"
          v-model="pass"
        />
      </div>
      <div class="row mb-3">
        <div class="bg-danger text-center rounded-3" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </div>
      <div class="row mb-3">
        <button class="btn btn-outline-warning" @mouseup="blurButton($event)">
          Sign in
        </button>
      </div>
      <div class="row text-center">
        <p>
          Haven't signed up yet? <router-link to="/signup">Sign up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
export default {
  name: "SignIn",
  emits: ["all", "undone", "create", "sign-up", "signed-in", "today"],
  beforeCreate() {
    this.$emit("sign-up");
  },
  data() {
    return {
      username: "",
      pass: "",
      errors: [],
    };
  },
  methods: {
    blurButton(e) {
      var x = e.currentTarget;
      x.blur();
    },
    submitForm() {
      this.errors = [];
      if (this.username == "") {
        this.errors.push("Please enter a username.");
      }
      if (this.pass == "") {
        this.errors.push("Please enter a password.");
      }
      if (!this.errors.length) {
        axios
          .post("http://127.0.0.1:8000/api/v1/auth/token/login", {
            username: this.username,
            password: this.pass,
          })
          .then((res) => {
            const toast = new bootstrap.Toast(document.getElementById("toast"));
            toast.show();
            this.$emit("signed-in", res.data.auth_token, this.username);
            setTimeout(() => {
              toast.hide();
              this.$router.push("/");
            }, 2000);
          })
          .catch(() => {
            this.errors.push("Unable to sign in with provided credentials.");
          });
      }
    },
  },
};
</script>
