<template>
  <div class="sign">
  <div class="register-container">
    <h2 class="register-title">Register</h2>
    <form @submit="register" class="register-form">
      <input type="text" v-model="username" placeholder="Username" class="register-input" required>
      <input type="email" v-model="email" placeholder="Email" class="register-input" required>
      <input type="password" v-model="password" placeholder="Password" class="register-input" required>
      <button type="submit" class="register-button">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
  async register() {
   // Provide the email parameter
    const res = 'true';
    try {
      const response = await axios.get(`http://localhost:3000/users/${this.email}`);
      if(response.data['response'] === "false"){
        try {
          const response = await axios.post('http://localhost:3000/users', {
            // Request payload or data
            name: this.username,
            email: this.email,
            password: this.password,
          });
          console.log(response.data); // Handle the response
        } catch (error) {
          console.error(error); // Handle any error
        }
      }else{
        this.errorMessage = "Such user exists";
      }
    } catch (error) {
      console.error(error); // Handle any error
    }
    
    },
  }
}
</script>

<style>
.sign{
  height: 65vh;
  display: flex;
  align-items: center;
}

.register-container {

  /* min-width: 40%; */
  width: 25%;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #f5f5f5; */
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-input {
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #000;
  background: #FFF;
  font-size: 16px;
}

.register-button {
  padding: 12px 24px;
  background-color: #4682B4;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
  border-radius: 3px;
  border: 1px solid #683434;
  background: #683434;
}

.register-button:hover {
  background: #884444;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 14px;
}
</style>
