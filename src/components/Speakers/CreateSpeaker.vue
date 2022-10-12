<template>
    <div>
      <h1>Create Speaker</h1>
      <form v-on:submit.prevent="createSpeaker">
        <p>model: <input type="text" v-model="speaker.model" /></p>
        <p>brand: <input type="text" v-model="speaker.brand" /></p>
        <p>watt: <input type="text" v-model="speaker.watt" /></p>
        <p>power: <input type="text" v-model="speaker.power_input" /></p>
        <p>status: <input type="text" v-model="speaker.status" /></p>
        <p>type: <input type="text" v-model="speaker.type" /></p>
        
          <div class="dropbox">
            <input
              type="file"
              multiple
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="
                filesChange($event.target.name, $event.target.files);
                fileCount = $event.target.files.length;
              "
              accept="image/*"
              class="input-file"
            />
            <!-- <p v-if="isInitial || isSuccess"> -->
            <p v-if="isInitial">
              คลิกใส่รูปภาพ<br />
              
            </p>
            <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
            <p v-if="isSuccess">Upload Successful.</p>
            <p v-if="isFailed">Upload Failed.</p>
          </div>
          <button class="button3" v-on:click.prevent="delFile(picture)">ลบ</button>
                <button class="button1" v-on:click.prevent="useThumbnail(picture.name)">
                  ยืนยัน
                </button>
        <p><button type="submit">create</button></p>
        
      </form>
      
    </div>
  </template>
  <script>
  import SpeakersService from "@/services/SpeakerService";
  
  export default {
    data() {
      return {
        BASE_URL: "http://10.31.27.240:8081",
        speaker: {
            model: "",
            brand: "",
            watt: "",
            power_input: "",
            status: "",
            type: ""
            
        },
      };
    },
    methods: {
      async createSpeaker() {
        try {
          await SpeakersService.post(this.speaker);
          this.$router.push({
            name: "speakers"
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        // this.uploadedFiles = []
        this.uploadError = null;
        this.uploadedFileNames = [];
      },
      async save(formData) {
        // upload data to the server
        try {
          this.currentStatus = STATUS_SAVING;
          await UploadService.upload(formData);
          this.currentStatus = STATUS_SUCCESS;
  
          // update image uploaded display
          let pictureJSON = [];
          this.uploadedFileNames.forEach(uploadFilename => {
            let found = false;
            for (let i = 0; i < this.pictures.length; i++) {
              if (this.pictures[i].name == uploadFilename) {
                found = true;
                break;
              }
            }
            if (!found) {
              this.pictureIndex++;
              let pictureJSON = {
                id: this.pictureIndex,
                name: uploadFilename
              };
              this.pictures.push(pictureJSON);
            }
          });
  
          this.clearUploadResult();
        } catch (error) {
          console.log(error);
          this.currentStatus = STATUS_FAILED;
        }
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        // append the files to FormData
        Array.from(Array(fileList.length).keys()).map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
          this.uploadedFileNames.push(fileList[x].name);
        });
        // save it
        this.save(formData);
      },
      clearUploadResult: function() {
        setTimeout(() => this.reset(), 5000);
      },
      async delFile(material) {
        let result = confirm("Want to delete?");
        if (result) {
          let dataJSON = {
            filename: material.name
          };
          await UploadService.delete(dataJSON);
          for (var i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].id === material.id) {
              this.pictures.splice(i, 1);
              this.materialIndex--;
              break;
            }
          }
        }
      },
      useThumbnail(filename) {
        console.log(filename);
        this.speaker.thumbnail = filename;
      }
    };
  </script>
  <style scoped></style>
  