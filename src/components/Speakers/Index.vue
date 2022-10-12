<template>
    <div>
      <h1>Speaker</h1>
      <div>จํานวน Speaker {{ speakers.length }}</div>
        <div v-for="speaker in speakers" v-bind:key="speaker.id">
        <p>model: <input type="text" v-model="speaker.model" /></p>
        <p>brand: <input type="text" v-model="speaker.brand" /></p>
        <p>watt: <input type="text" v-model="speaker.watt" /></p>
        <p>power: <input type="text" v-model="speaker.power_input" /></p>
        <p>status: <input type="text" v-model="speaker.status" /></p>
        <p>type: <input type="text" v-model="speaker.type" /></p>
        
        <p>
          <button v-on:click="navigateTo('/speaker/' + speaker.id)">
            ดูข้อมูล
          </button>
          <button v-on:click="navigateTo('/speaker/edit/' + speaker.id)">
            แก้ไขข้อมูล
          </button>
          <button v-on:click="deleteSpeaker(speaker)">ลบข้อมูล</button>
        </p>
        <hr />
      </div>
    </div>
  </template>
  <script>
  import SpeakerServices from "@/services/SpeakerService";
  export default {
    data() {
      return {
        BASE_URL: "http://10.31.27.240:8081",
        speakers: []
      };
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      },
      async deleteSpeaker(speaker) {
        let result = confirm("Want to delete?");
        if (result) {
          try {
            await SpeakerServices.delete(speaker);
            this.refreshData()
          } catch (err) {
            console.log(err);
          }
        }
      },
      async refreshData() {
        this.speakers = (await SpeakerServices.index()).data;
      }
    },
    async created() {
      this.Speakers = (await SpeakerServices.index()).data;
    }
  };
  </script>
  <style scoped></style>
  