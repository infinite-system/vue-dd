import VueDd from "./VueDd.vue";
import XRay from "./XRay.vue";

function install(app) {
  // Base entities
  app.component("VueDd", VueDd);
  app.component("XRay", XRay);
}

export {
  install,
  // Base entities
  VueDd,
  XRay
};
