const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 8080;
const cors = require("cors")
const modules = [{
    code: 1,
    routePath: "config",
    moduleName: "Cấu hình",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 2,
    routePath: "dashboard",
    moduleName: "Dashboard",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 3,
    routePath: "purchasing",
    moduleName: "Mua hàng",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 4,
    routePath: "distribution",
    moduleName: "Điều phối",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 5,
    routePath: "marketing",
    moduleName: "Marketing",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 6,
    routePath: "ecommerce",
    moduleName: "Ecommerce",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 7,
    routePath: "business",
    moduleName: "Kinh doanh",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}, {
    code: 8,
    routePath: "employee",
    moduleName: "Nhân sự",
    subModules: [{ codeSub: 1, subName: "Cơ cấu tổ chức" }, { codeSub: 2, subName: "Hồ sơ nhân sự" }, { codeSub: 3, subName: "Đánh giá nhân sự" }, { codeSub: 4, subName: "Tiền lương" },],
    features: [{ codeSub: 1, featureName: "Điểm làm việc", routePath:"location" }, { codeSub: 2, featureName: "Danh sách nhân sự", routePath:"employeesList" },
    { codeSub: 3, featureName: "Từ điển năng lực", routePath:"competenceDictionary" }, { codeSub: 3, featureName: "Khung năng lực", routePath:"competenceLevel" },
    { codeSub: 3, featureName: "Ngân hàng câu hỏi", routePath:"questionBank" }, { codeSub: 3, featureName: "Phân nhóm câu hỏi", routePath:"questionGroup" },
    { codeSub: 4, featureName: "Bảng lương", routePath:"salary" },
    ]
}
]

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/modules", (req, res) => {
    res.json({ status: "OK", message: "Get modules successful", data: modules })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});