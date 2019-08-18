<template>
  <div class="login">
    <div class="login-form">
      <h1>login</h1>

      <div class="txtb">
        <input
          v-model="username"
          @focus="focusUsername = true"
          @blur="focusUsername = username?true:false"
          :class="{ focus: focusUsername}"
          type="text"
        />
        <span data-placeholder="Username"></span>
      </div>

      <div class="txtb">
        <input
          v-model="password"
          @focus="focusPassword = true"
          @blur="focusPassword = password?true:false"
          :class="{ focus: focusPassword}"
          type="password"
        />
        <span data-placeholder="Password"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      focusUsername: false,
      focusPassword: false,
      username: null,
      password: null
    };
  },
  methods: {
    clickFocus() {}
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #3498db, #8e44ad);
}
.login-form {
  width: 360px;
  height: 580px;
  background: #f1f1f1;
  padding: 80px 40px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-form > h1 {
  text-align: center;
  margin-top: 60px;
}
.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 30px 0;
}
.txtb > input {
  width: 100%;
  font-size: 15px;
  color: #333;
  border: none;
  outline: none;
  background: none;
  padding: 0 5px;
  height: 40px;
}
.txtb span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: #adadad;
  z-index: -1;
  transition: 0.4s;
}
.txtb span::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(120deg, #3498db, #8e44ad);
  transition: 0.4s;
}
.focus + span::before {
  top: -5px;
}
.focus + span::after {
  width: 100%;
}
</style>

