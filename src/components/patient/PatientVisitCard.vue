<template>
  <v-card class="patient-visit-card">
    <!-- FRONT CARD -->
    <div id="pdf-content">
      <v-card class="card card--front mt-10">
        <div class="qr-container">
          <div class="qr">
            <QrcodeVue
              :value="patient.patient_id"
              class="qr-code"
              size="95"
              level="H"
            />
          </div>
          <div class="patient_id pa-0 ma-0">{{ patient.patient_id }}</div>
        </div>
        <div class="patient-info">
          <div class="align-self-start">
            <p
              class="label ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Name
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.name }}</p>
          </div>
          <div class="align-self-start">
            <p
              class="label ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Date of birth
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.date_of_birth }}</p>
          </div>
          <div class="align-self-start">
            <p
              class="label ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Sex
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.sex }}</p>
          </div>
        </div>
      </v-card>
      <!-- BACK CARD -->
      <v-card class="card card--back mt-5">
        <div class="logos">
          <img :src="logopda" class="logo" />
          <img :src="logohkes" class="logo logohkes" />
          <img :src="logomrmc" class="logo" />
        </div>
        <div class="card-down">
          <p class="pr-name white--text">Health-aid</p>
          <div class="hospital-info">
            <div class="align-self-start mb-3 d-flex align-center">
              <v-icon color="white" class="mr-2">mdi-phone</v-icon>
              <p class="white--text ma-0 text-caption">9886534480</p>
            </div>
            <div class="align-self-start mb-3 d-flex align-center">
              <v-icon color="white" class="mr-2">mdi-gmail</v-icon>
              <p class="white--text ma-0 text-caption">healthaid@gmail.com</p>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <v-btn
      class="mt-7 white--text"
      :color="$vuetify.theme.themes.light.primary"
      @click="downloadPDF"
      >Download</v-btn
    >
  </v-card>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QrcodeVue from "qrcode.vue";
export default {
  props: ["patient"],
  components: {
    QrcodeVue,
  },
  data() {
    return {
      logo: require("@/assets/img/logo1024.png"),
      logomrmc: require("@/assets/img/mrmc.jpeg"),
      logohkes: require("@/assets/img/hkes.jpeg"),
      logopda: require("@/assets/img/pda.jpeg"),
    };
  },
  methods: {
    downloadPDF() {
      // Capture the content of the div element
      html2canvas(document.querySelector("#pdf-content"), {
        useCORS: true,
        scale: 1.1,
        logging: true,
        letterRendering: 1,
        allowTaint: false,
        dpi: 600,
        imageTimeout: 0,
        windowHeight: document.querySelector("#pdf-content").scrollHeight,
        windowWidth: document.querySelector("#pdf-content").scrollWidth,
        quality: 2,
        backgroundColor: "white",
        removeContainer: true,
        imageType: "image/jpeg",
        output: "dataurlnewwindow",
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Create a new PDF document
        const pdf = new jsPDF("p", "mm", "a4", false, 600);

        // Add the captured image to the PDF document
        pdf.addImage(imgData, "PNG", 10, 10);

        // Download the PDF document
        pdf.save("document.pdf");
      });
    },
  },
};
</script>

<style scoped>
.patient-visit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
}
/* #pdf-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
} */
.card {
  background-color: white;
  width: 25rem;
  height: 13rem;
  border: 1.5px solid black;
  border-radius: 0.8rem;
  overflow: hidden;
}
.card--front {
  display: grid;
  grid-template-columns: 42fr 58fr;
  align-items: center;
  /* padding: 1.5rem 1.8rem 1.5rem 1.8rem; */
}

.card--back {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #011f4b;
  border-radius: 0 !important;
}
.qr {
  padding: 0.6rem;
  background-color: #fff;
  border: 3px solid black;
}
.qr-code {
  display: flex;
  justify-content: center;
  align-items: center;
}
.patient-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-left: 1rem;
}
.card-down {
  background-color: #011f4b;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0 0rem 0;
}
.label {
  font-size: 0.85rem;
}
.logos {
  display: flex;
  gap: 1rem;
  height: 100%;
  align-items: center;
}
.logo {
  height: 60px;
}
.logohkes {
  transform: translateX(3px);
}
.patient_id {
  color: #fff;
  letter-spacing: 10px;
  font-weight: 500;
  margin-top: 0.5rem !important;
  transform: translateX(5px);
}

.hospital-info {
  display: flex;
  gap: 1rem;
}
.pr-name {
  color: black;
  text-align: center;
  font-size: 1.8rem;
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .card--front {
    width: 22rem;
    gap: 1rem;
  }
}
</style>
