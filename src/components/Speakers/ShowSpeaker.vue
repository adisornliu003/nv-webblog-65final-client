<template>
    <div>
      <h1>Show User</h1>
      <div v-for="speaker in speakers" v-bind:key="speaker.id"></div>
        <p>model: <input type="text" v-model="speaker.model" /></p>
        <p>brand: <input type="text" v-model="speaker.brand" /></p>
        <p>watt: <input type="text" v-model="speaker.watt" /></p>
        <p>power: <input type="text" v-model="speaker.power_input" /></p>
        <p>status: <input type="text" v-model="speaker.status" /></p>
        <p>type: <input type="text" v-model="speaker.type" /></p>
    </div>
  </template>
  <script>
  import SpeakerService from "@/services/SpeakerService";
  
  export default {
    data() {
      return {
        BASE_URL: "http://10.31.27.240:8081",
        speaker: null
      };
    },
    async created() {
      let speakerId = this.$route.params.speakerId;
      this.speaker = (await SpeakerService.show(speakerId)).data
      console.log(this.speakerId)
    }
  };
  </script>
  <style scoped></style>
  