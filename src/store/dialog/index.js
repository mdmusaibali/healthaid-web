export default {
  state: {
    isDialogOpen: false,
    dialogText: "",
  },
  getters: {
    isDialogOpen(state) {
      return state.isDialogOpen;
    },
    dialogText(state) {
      return state.dialogText;
    },
  },
  mutations: {
    openDialog(state, { text }) {
      state.isDialogOpen = true;
      state.dialogText = text;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
    },
  },
  actions: {},
};
