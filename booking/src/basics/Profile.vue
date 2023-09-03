<template>
  <div>
    <!-- <button @click="pushHotels">Push Hotels</button>
    <button @click="pushRooms">Push Rooms</button> -->
  </div>
</template>

<script>
import hotels from '../json/hotels.json';
import axios from 'axios';

  export default {
    data() {
      return {
        city: '',
        options: hotels,
        selectedOption: null
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
      async pushHotels(){
        try {
          const promises = hotels.map(async (element) => {
            console.log(element);
            try {
              const response = await axios.post('http://localhost:3000/hotels/', {
                // Request payload or data
                hotel_id: element["id"],
                name: element["name"],
                city: element["location"]["city"],
                stars: element["stars"],
              });
              console.log(response.data); // Handle the response
            } catch (error) {
              console.error(error); // Handle any error
            }
          });
          await Promise.all(promises);
          console.log('All requests completed.'); // This will be printed after all requests are finished
        } catch (error) {
          console.error('Error in postHotelsToServer:', error);
        }
      },
      async pushRooms() {
        try {
          const promises = hotels.map(async (element) => {
            const roomPromises = element["rooms"].map(async (rooms) => {
              // console.log(rooms);
              try {
                const response = await axios.post('http://localhost:3000/rooms/', {
                  // Request payload or data
                  hotel_id: element["id"],
                  price: rooms["price"],
                  maxGuests: rooms["maxGuests"],
                  bed: rooms["beds"],
                  availabilityOfBreakfast: rooms["breakfast"],
                  // availabilityOfParking: room["availabilityOfParking"],
                  availability: rooms["available"],
                });
                console.log(response.data); // Handle the response
              } catch (error) {
                console.error(error); // Handle any error
              }
            });
            return Promise.all(roomPromises);
          });

          // Wait for all hotel promises to resolve
          await Promise.all(promises);

          console.log('All requests completed.'); // This will be printed after all requests are finished
        } catch (error) {
          console.error('Error in pushRooms:', error);
        }
      },
      // selectOption(option) {
      //   this.selectedOption = option;
      //   this.city = option;
      //   this.$nextTick(() => {
      //     const ulElement = document.querySelector('.options-list');
      //     ulElement.classList.remove('show-list');
      //   });
      //   console.log(this.selectedOption);
      // }
    }
  };
</script>


<style>
.options-list {
  list-style-type: none;
  padding: 0;
  max-height: 200px; /* Set the maximum height for the list */
  overflow-y: auto; /* Enable vertical scrolling when the list exceeds the maximum height */
  position: absolute; /* Set the position to absolute */
  margin: 0;
  width: 200px !important;
  z-index: 999; /* Set a high z-index to make the list appear above other elements */
}

.options-list.show-list {
  display: block; /* Show the list when this class is applied */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 4px; /* Add border radius for rounded corners */
}
li{
  display: block;
  cursor: pointer;
}
</style>