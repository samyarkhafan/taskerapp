<template>
  <div class="position-fixed shadow-lg p-3 w-25 h-100">
    <ul class="nav nav-pills flex-column">
      <li class="nav-item dropdown" v-if="authed">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
          ><i class="bi bi-person-circle"></i> {{ name }}</a
        >
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <a class="dropdown-item" href="#" @click="signOut"
              ><i class="bi bi-box-arrow-right"></i> Logout</a
            >
          </li>
        </ul>
      </li>
      <li class="nav-item" v-if="!authed">
        <router-link
          :class="signupact ? 'nav-link active' : 'nav-link'"
          to="/signup"
          @click="activateLink(5)"
          ><i class="bi bi-box-arrow-in-left"></i> Sign up / Sign
          in</router-link
        >
      </li>
      <hr />
      <li class="nav-item">
        <router-link
          :class="todayact ? 'nav-link active' : 'nav-link'"
          to="/"
          @click="activateLink(1)"
          ><i class="bi bi-calendar-check"></i> Today's tasks</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :class="undoneact ? 'nav-link active' : 'nav-link'"
          to="/undone"
          @click="activateLink(2)"
          ><i class="bi bi-calendar-x"></i> Undone tasks</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :class="allact ? 'nav-link active' : 'nav-link'"
          to="/all"
          @click="activateLink(3)"
          ><i class="bi bi-calendar"></i> All tasks</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :class="createact ? 'nav-link active' : 'nav-link'"
          to="/create"
          @click="activateLink(4)"
          ><i class="bi bi-calendar-plus"></i> Create a task</router-link
        >
      </li>
    </ul>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <router-view
          @today="activateLink(1)"
          @undone="activateLink(2)"
          @all="activateLink(3)"
          @create="activateLink(4)"
          @sign-up="activateLink(5)"
          @signed-in="signIn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  beforeMount() {
    localStorage.removeItem("task");
    if (localStorage.getItem("token")) {
      this.authed = true;
      this.token = localStorage.getItem("token");
      this.name = localStorage.getItem("name");
      axios.defaults.headers.common["Authorization"] = "Token " + this.token;
    }
  },
  data() {
    return {
      todayact: true,
      undoneact: false,
      allact: false,
      createact: false,
      signupact: false,
      authed: false,
      token: "",
      name: "",
    };
  },
  methods: {
    signIn(token, name) {
      this.authed = true;
      this.token = token;
      this.name = name;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      axios.defaults.headers.common["Authorization"] = "Token " + this.token;
    },
    signOut() {
      axios.post("http://127.0.0.1:8000/api/v1/auth/token/logout/");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.authed = false;
      this.token = "";
      this.name = "";
      axios.defaults.headers.common["Authorization"] = "";
      this.$router.push("/signin");
    },
    activateLink(x) {
      switch (x) {
        case 1:
          this.todayact = true;
          this.undoneact = false;
          this.allact = false;
          this.createact = false;
          this.signupact = false;
          break;
        case 2:
          this.todayact = false;
          this.undoneact = true;
          this.allact = false;
          this.createact = false;
          this.signupact = false;
          break;
        case 3:
          this.todayact = false;
          this.undoneact = false;
          this.allact = true;
          this.createact = false;
          this.signupact = false;
          break;
        case 4:
          this.todayact = false;
          this.undoneact = false;
          this.allact = false;
          this.createact = true;
          this.signupact = false;
          break;
        case 5:
          this.todayact = false;
          this.undoneact = false;
          this.allact = false;
          this.createact = false;
          this.signupact = true;
          break;
      }
    },
    blurButton(e) {
      var x = e.currentTarget;
      x.blur();
    },
  },
};
</script>
