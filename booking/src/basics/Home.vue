<script setup>
import ListHome from '../components/ListHome.vue';

</script>

<template>
    <div class="main">

        <div class="top">
            <div class="search">
                <!-- <input type="text" v-model="city" placeholder="City" class="register-input one" required> -->
                <div>
                    <input type="text" v-model="city" @input="filterOptions" class="register-input one" placeholder="City..." required>
                    <ul :class="['options-list', { 'show-list': city !== '' }]">
                    <li v-for="option in filteredOptions" :key="option" @click="selectOption(option)">{{ option }}</li>
                    </ul>
                </div>
                <input type="date" v-model="arrivalDate" placeholder="Date of arrival" class="register-input two" required>
                <input type="date" v-model="departureDate" placeholder="Date of departure" class="register-input two" required>
                <input type="number" v-model="numberOfPeople" placeholder="Number of people" class="register-input end" required>
                <button type="submit" @click="search" class="search-button-main">Search</button>
            </div>
        </div>

        <div class="bottom">
            <div class="filter">
                 <h1>Filter by the following criteria:</h1>  
                <div class="main-filters">
                    <div class="price-filter">
                        <label class="label" for="price">Your price:</label>
                        <input type="number" v-model="minPrice" placeholder="min-price" class="price-input" />
                        <input type="number" v-model="maxPrice" placeholder="max-price" class="price-input" />
                    </div>

                    <div class="stars-filter">
                        <label class="label" for="price">Number of stars:</label>
                        <input type="number" v-model="numberOfStars" placeholder="3" class="register-input" required>
                    </div> 
                </div>


                <div class="other-filters">
                    <div class="check">
                        <label for="price">Availability of breakfast:</label>
                        <input type="checkbox" v-model="availabilityOfBreakfast" value="1" /> 
                    </div>

                    <div class="check">
                        <label for="price">Availability of parking:</label>
                        <input type="checkbox" v-model="availabilityOfParking" value="1" />
                        
                    </div>

                    <button type="submit" class="search-button" @click="search2">Search</button>
                </div>

                

                <!-- TODO мінімальний рейтинг готелю !!! -->

                
            </div> 
            <div class="list container">
              <div v-if="!dataToTransfer">
                No data available.
              </div>
              <div v-else class="item">
                <div class="item2" v-for="info in dataToTransfer" :key="info.id">
                  <div class="img">Img</div>
                  <div class="data">
                    <div class="name">Hotel name: {{ info.Hotel["name"] }}</div>
                    <div class="location">Max Guests: {{ info.maxGuests }}</div>
                    <div class="location">Number of Beds: {{ info.bed }}</div>
                    <div class="stars">Stars: {{ info.Hotel["stars"] }}</div>
                  </div>
                  <div class="price">
                    <div>Price: {{ info.price }}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>
    
</template>

<script>
import axios from 'axios'
import cities from './cities.json';
export default {
    data() {
      return {
        city: '',
        options: cities,
        selectedOption: null,
        dataFromHome: 'Hello From Home',
        dataToTransfer: null,
      };
    },
    computed: {
      filteredOptions() {
        if (!this.city) {
          return [];
        }

        const searchRegex = new RegExp(this.city, 'i');
        return this.options.filter(option => searchRegex.test(option) && option !== this.selectedOption);
      }
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
        this.city = option;
        this.$nextTick(() => {
          const ulElement = document.querySelector('.options-list');
          ulElement.classList.remove('show-list');
        });
        console.log(this.selectedOption);
      },
      async search2() {
        var dataResponse;
        try {
          const queryParams = {
            city: this.city,
            numberOfPeople: this.numberOfPeople,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
            numberOfStars: this.numberOfStars,
            availabilityOfBreakfast: this.availabilityOfBreakfast,
            // availabilityOfParking: this.availabilityOfParking
          };

          const queryString = Object.keys(queryParams)
            .filter((key) => queryParams[key] !== undefined)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
            .join('&');

          const response = await axios.get(`http://localhost:3000/rooms?${queryString}`);
          console.log(response["data"]);
          this.dataToTransfer = response["data"];
          dataResponse = response["data"];
        } catch (error) {
          console.error(error); // Handle any error
        }
        return dataResponse;
      },
      async search(){
        try {
            const response = await axios.get(`http://localhost:3000/rooms/${this.city}/${this.numberOfPeople}`);
            console.log(response["data"])
            this.dataToTransfer = response["data"];
            
        } catch (error) {
            console.error(error); // Handle any error
        }
      }
    }
  };
</script>

<style scoped>
@use base;
@use container;

.main{
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: center; */
    align-items: center;
    font-family: Inria Serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.top{
    /* background-image:url("http://localhost:3000/basicImages/homeSearch.png"); */
    /* background-repeat: no-repeat;
    background-size: cover;
    background-position: center; */
    height: 20em;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    color: #1E1E1E;
    background: linear-gradient(
        to bottom,
        rgba(130, 111, 88, 0.15) 0%,
        rgba(130, 111, 88, 0.15) 95%,
        white 95%,
        white 100%
    );
    /* background: rgba(130, 111, 88, 0.15); */

}

.bottom{
    padding-top: 3%;
    display: flex;
    flex-flow: row nowrap;
    width: 90%;
}

.filter{
    width: 35%;
    margin-left: 10%;
    /* background-color: rgb(137, 142, 136); */
    line-height: 32px;
    display: flex;
    flex-flow: column nowrap;
    /* line-break: anywhere; */
}

.list{
    width: 65%;
    margin-right: 10%;
}
.main-filters{
    padding-top: 10px;
    padding-bottom: 20px;
    border-radius: 12px 12px 0px 0px;
border: 1px solid #B8AAAA;
background: rgba(130, 111, 88, 0.00);
}

.other-filters{
    padding-top: 10px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-radius: 0px 0px 12px 12px;
border: 1px solid #B8AAAA;
background: rgba(130, 111, 88, 0.00);

}

.search-button {
    border-radius: 3px;
border: 1px solid #683434;
background: #683434;
    margin: 30px;
  padding: 12px 24px;
  color: white;
  border: none;
  cursor: pointer;
  
  
}

.search-button:hover {
    margin: 30px;
    background: #884444;
}

.price-filter {
    margin-top: 10px;
  padding-right: 5%;
    padding-left: 5%;
    
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

.stars-filter{
    margin-top: 10px;
  padding-right: 5%;
    padding-left: 5%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

.price-filter label {
  margin-right: 10px;
}

.price-filter span {
  margin-left: 10px;
}
.price-input{
    height: 40%;
    width: 30%;
}

.register-input{
    /* height: 100%; */
    width: 30%;
}

.label{
    margin-right: 10px;
}

.search{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15%;
    border-radius: 12px;
    border: 5px solid #683434;
background: #683434;
    
}

.check{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-right: 5%;
    padding-left: 5%;

}

.search-button-main {
    border-radius: 12px;
    height: 100%;
border: 1px solid #683434;
background: rgba(233, 228, 223, 0.44);
padding-left: 25px;
padding-top: 9px;

  margin-left: 10px;
  color: white;
  border: none;
  cursor: pointer;
  
  
}
.options-list {
  list-style-type: none;
  padding: 0;
  max-height: 100px; /* Set the maximum height for the list */
  overflow-y: auto; /* Enable vertical scrolling when the list exceeds the maximum height */
  position: absolute; /* Set the position to absolute */
  margin: 0;
  background: white;
  width: 200px !important;
  z-index: 999; /* Set a high z-index to make the list appear above other elements */
}

.options-list.show-list {
  display: block; /* Show the list when this class is applied */
  border: 1px solid #000000; /* Add a border */
  border-radius: 4px; /* Add border radius for rounded corners */
}
li{
  display: block;
  cursor: pointer;
}

.search-button-main:hover {
    background: rgba(255, 242, 224, 0.44);

}

.one{
    border-radius: 12px 0px 0px 12px;
    width: 100% !important;
    height: 90%;
}

.two{
    border-radius: 0px 0px 0px 0px;
}

.end{
    border-radius: 0px 12px 12px 0px;
}

.container{
    display: flex;
    flex-flow : column nowrap;
    align-items: flex-end;
}
.item{
    width: 90%;
}
.item2{
    border-radius: 12px;
    border: 1px solid #606060;
    display: flex;
    flex-flow : row nowrap;
    padding: 7px;
    margin: 5px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    height: 150px;
}

.img{
    display: flex;
    width: 100px;
    background: grey;
    margin-right: 15px;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
}
.name{
    color: #683434;
    /* text-align: center; */
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.location{
    color: #000;
    font-family: Inria Serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.price{
    flex-grow: 1;
}
.data{
    display: flex;
    flex-flow : column nowrap;
    flex-grow: 1;
    margin-right: 10px;
    margin-top: 10px;
}
</style>

