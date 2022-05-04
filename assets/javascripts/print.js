export const print = {
  init: () => {
    var printBtn = document.getElementById('printPage');

    if (printBtn) {
      printBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
      });
    }
  },
};
