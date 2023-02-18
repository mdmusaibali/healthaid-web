<template>
  <div class="scanner-container">
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      :track="paintOutline"
      class="scanner"
    ></qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      error: null,
    };
  },
  watch: {
    error(value) {
      if (value) this.$toast.open({ type: "error", message: value });
    },
  },
  methods: {
    onDecode(patientId) {
      // ...
      if (patientId) {
        this.$router.push({
          name: "patient-details",
          query: {
            patientId,
          },
        });
      }
    },
    async onInit(promise) {
      try {
        await promise;
        this.error = null;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "You need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "No camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "Secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "Is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "Installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `Camera error (${error.name})`;
        }
      }
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
  },
};
</script>

<style scoped>
.scanner-container {
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.scanner {
  height: 35rem !important;
  width: 35rem !important;
}
</style>
