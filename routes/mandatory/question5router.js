var express = require("express");
var router = express.Router();

var questionController = require("../../controllers/mandatory/question5.controller");

const routes = [
  { step: "1", isAddToAList: false },
  { step: "2", isAddToAList: true },
  { step: "3", isAddToAList: true },
  { step: "4", isAddToAList: true },
  { step: "5", isAddToAList: true },
  { step: "6", isAddToAList: true },
  { step: "7", isAddToAList: true },
];

routes.forEach((route) => {
  router.get(
    "/question5-" + route.step,
    questionController["question5Page" + route.step]
  );
  router.post(
    "/question5-" + route.step,
    questionController["question5Page" + route.step + "Post"]
  );

  if (route.isAddToAList) {
    router.get(
      "/question5-" + route.step + "a",
      questionController["question5Page" + route.step + "A"]
    );
    router.post(
      "/question5-" + route.step + "a",
      questionController["question5Page" + route.step + "APost"]
    );
    router.get(
      "/question5-" + route.step + "b",
      questionController["question5Page" + route.step + "B"]
    );
    router.post(
      "/question5-" + route.step + "b",
      questionController["question5Page" + route.step + "BPost"]
    );
    router.get(
      "/question5-" + route.step + "b-rem/:id",
      questionController["question5Page" + route.step + "BRem"]
    );
    router.get(
      "/question5-" + route.step + "b-cya/:id",
      questionController["question5Page" + route.step + "Bcya"]
    );
  }
});

router.post("/question5-2ConfPost", questionController.question5Page2ConfPost);
router.post("/question5-3ConfPost", questionController.question5Page3ConfPost);
router.post("/question5-4ConfPost", questionController.question5Page4ConfPost);
router.post("/question5-5ConfPost", questionController.question5Page5ConfPost);
router.post("/question5-6ConfPost", questionController.question5Page6ConfPost);
router.post("/question5-7ConfPost", questionController.question5Page7ConfPost);

module.exports = router;
