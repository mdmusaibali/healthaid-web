<template>
  <v-card class="patient-visit-card">
    <!-- FRONT CARD -->
    <div id="pdf-content">
      <v-card class="card--front mt-10">
        <div>
          <QrcodeVue :value="patient.patient_id" size="120" level="H" />
        </div>
        <div>
          <div class="align-self-start mb-3">
            <p
              class="ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Name
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.name }}</p>
          </div>
          <div class="align-self-start mb-3">
            <p
              class="ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Date of birth
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.date_of_birth }}</p>
          </div>
          <div class="align-self-start mb-3">
            <p
              class="ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Sex
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.sex }}</p>
          </div>
        </div>
      </v-card>
      <!-- BACK CARD -->
      <v-card class="card--front mt-5">
        <div>
          <img :src="logo" height="120" width="120" />
        </div>
        <div>
          <div class="align-self-start mb-3 d-flex align-center">
            <v-icon color="black" class="mr-3">mdi-map-marker</v-icon>
            <p class="black--text ma-0 text-caption">
              8VG3+435, Sedam Rd, Rajapur, Kalaburagi
            </p>
          </div>
          <div class="align-self-start mb-3 d-flex align-center">
            <v-icon color="black" class="mr-3">mdi-phone</v-icon>
            <p class="black--text ma-0 text-caption">9886534480</p>
          </div>
          <div class="align-self-start mb-3 d-flex align-center">
            <v-icon color="black" class="mr-3">mdi-gmail</v-icon>
            <p class="black--text ma-0 text-caption">healthaid@gmail.com</p>
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
      logo: require("@/assets/img/logo512.png"),
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
.card--front {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.8rem 1.5rem 1.8rem;
  background-color: white;
  width: 25rem;
  height: 13rem;
  border: 1.5px solid black;
  gap: 2rem;
}

@media (max-width: 768px) {
  .card--front {
    width: 22rem;
    gap: 1rem;
  }
}
</style>
