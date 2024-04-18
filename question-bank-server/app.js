const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const cors = require("cors");
const modules = [
  {
    code: 1,
    routePath: "config",
    moduleName: "Cấu hình",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 2,
    routePath: "dashboard",
    moduleName: "Dashboard",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 3,
    routePath: "purchasing",
    moduleName: "Mua hàng",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 4,
    routePath: "distribution",
    moduleName: "Điều phối",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 5,
    routePath: "marketing",
    moduleName: "Marketing",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 6,
    routePath: "ecommerce",
    moduleName: "Ecommerce",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 7,
    routePath: "business",
    moduleName: "Kinh doanh",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
  {
    code: 8,
    routePath: "employee",
    moduleName: "Nhân sự",
    subModules: [
      { codeSub: 1, subName: "Cơ cấu tổ chức" },
      { codeSub: 2, subName: "Hồ sơ nhân sự" },
      { codeSub: 3, subName: "Đánh giá nhân sự" },
      { codeSub: 4, subName: "Tiền lương" },
    ],
    features: [
      { codeSub: 1, featureName: "Điểm làm việc", routePath: "location" },
      {
        codeSub: 2,
        featureName: "Danh sách nhân sự",
        routePath: "employeesList",
      },
      {
        codeSub: 3,
        featureName: "Từ điển năng lực",
        routePath: "competenceDictionary",
      },
      {
        codeSub: 3,
        featureName: "Khung năng lực",
        routePath: "competenceLevel",
      },
      {
        codeSub: 3,
        featureName: "Ngân hàng câu hỏi",
        routePath: "questionBank",
      },
      {
        codeSub: 3,
        featureName: "Phân nhóm câu hỏi",
        routePath: "questionGroup",
      },
      { codeSub: 4, featureName: "Bảng lương", routePath: "salary" },
    ],
  },
];
let questions = [
  {
    code: "001",
    questionCode: "Q.001",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Đang soạn thảo",
    questionCalculating: "",
  },
  {
    code: "002",
    questionCode: "Q.002",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Gửi duyệt",
    questionCalculating: "",
  },
  {
    code: "003",
    questionCode: "Q.003",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Duyệt áp dụng",
    questionCalculating: "",
  },
  {
    code: "004",
    questionCode: "Q.004",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Ngưng áp dụng",
    questionCalculating: "",
  },
  {
    code: "005",
    questionCode: "Q.005",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Trả về",
    questionCalculating: "",
  },
  {
    code: "006",
    questionCode: "Q.006",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Đang soạn thảo",
    questionCalculating: "",
  },
  {
    code: "007",
    questionCode: "Q.007",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Gửi duyệt",
    questionCalculating: "",
  },
  {
    code: "008",
    questionCode: "Q.008",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Duyệt áp dụng",
    questionCalculating: "",
  },
  {
    code: "009",
    questionCode: "Q.009",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Ngưng áp dụng",
    questionCalculating: "",
  },
  {
    code: "010",
    questionCode: "Q.010",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Trả về",
    questionCalculating: "",
  },
  {
    code: "011",
    questionCode: "Q.011",
    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Đang soạn thảo",
    questionCalculating: "",
  },
  {
    code: "012",
    questionCode: "Q.012",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Gửi duyệt",
    questionCalculating: "",
  },
  {
    code: "013",
    questionCode: "Q.013",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",


    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Duyệt áp dụng",
    questionCalculating: "",
  },
  {
    code: "014",
    questionCode: "Q.014",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Ngưng áp dụng",
    questionCalculating: "",
  },
  {
    code: "015",
    questionCode: "Q.015",

    questionName:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci distinctio temporibus aliquid voluptatem rerum quasi?",

    questionType: "Một lựa chọn",
    questionGroup: "Thương hiệu",
    questionTime: 30,
    questionStatus: "Trả về",
    questionCalculating: "",
  },
];

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/modules", (req, res) => {
  res.json({ status: "OK", message: "Get modules successful", data: modules });
});
app.get("/questions", (req, res) => {

  let { page, items, status, searchText } = req.query;
  page = Number(page);
  items = Number(items);
  if (String(status) != "undefined") {
    status = JSON.parse(status);
  }

  if (!page > 0) {
    page = 1;
  }
  if (!items > 0) {
    items = 5;
  }
  let questionFilter = [];
  let questionDisplay = [];
  if (Array.isArray(status) && status.length > 0) {
    status.forEach((s) => {
      questions.forEach((q) => {
        if (q.questionStatus == s) {
          questionFilter.push(q);

        }
      });
    });
  } else {
    questionFilter = questions;
  }
  if (searchText && searchText != "") {
    let questionTemp = [];
    questionFilter.forEach((q) => {
      if (q.questionName.includes() || q.questionCode.includes(searchText)) {
        questionTemp.push(q);
      }
    });
    questionFilter = questionTemp;
  }
  let startIndex = (page - 1) * items;
  let endIndex = page * items;
  questionDisplay = questionFilter.slice(startIndex, endIndex);

  res.json({
    status: "OK",
    message: "Get questions successful",
    data: {
      questions: questionDisplay,
      totalPages: Math.ceil(questions.length / items),
      page: page,
      items: items,
    },
  });
});
app.put("/questions", (req, res) => {
  let questionUpdate = req.body.questionUpdate;

  const index = questions.findIndex((q) => q.code == questionUpdate.code);
  if (index != -1) {
    questions[index] = questionUpdate;
    res.json({
      status: "OK",
      message: "Update question successful",
      data: {},
    });
  } else {
    res.json({
      status: "FAIL",
      message: "Update question failed",
      data: {},
    });
  }
});
app.post("/questions", (req, res) => {
  let questionNew = req.body.questionNew;
  questionNew.code = String(Date.now());
  questions.push(questionNew);
  res.json({
    status: "OK",
    message: "Update question successful",
    data: {},
  });
});
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
