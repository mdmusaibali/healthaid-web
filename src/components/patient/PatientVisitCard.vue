<template>
  <v-card class="patient-visit-card">
    <!-- FRONT CARD -->
    <div id="pdf-content">
      <v-card class="card--front mt-10">
        <div class="mr-8">
          <QrcodeVue :value="patient.patient_id" size="120" level="H" />
        </div>
        <div>
          <div class="align-self-start mb-3">
            <p
              class="ma-0 text-h7 grey--text text--darken-1 font-weight-medium"
            >
              Name
            </p>
            <p class="text-h7 ma-0 black--text">{{ patient.user.name }}</p>
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
        <div class="mr-8">
          <v-img
            src="@/assets/img/logo512.png"
            height="120"
            width="120"
          ></v-img>
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
}
.card--front {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.8rem 1.5rem 1.8rem;
  background-color: white;
  width: 25rem;
  height: 13rem;
  border: 1.5px solid black;
}
</style>
