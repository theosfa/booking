<template>
    <div class="data-from-home">{{ dataToTransfer }}</div>
    <div class="container">
        <div class="item" v-for="data in dataToTransfer">
        <div class="item2" v-for="info in dataToTransfer">
            <div class="img">Img</div>
            <div class="data">
                <div class="name">{{data["name"]}}</div>
                <div class="location">{{data["location"]["city"]}} {{data["location"]["address"]}}</div>
            </div>
            <div class="price">
                <div>Price : {{ info["price"] }}</div>
            </div>
        </div>
        </div> 
    </div>
</template>

<script>


export default{
    props: {
        dataToTransfer: {
            type: Array, // Adjust the data type accordingly based on your data structure
            required: true
        }
    }
}

</script>

<style scoped>
.container{
    display: flex;
    flex-flow : column nowrap;
    align-items: center;
}
.item{
    width: 80%;
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