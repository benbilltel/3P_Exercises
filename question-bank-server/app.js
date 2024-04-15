const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 8080;
const cors = require("cors")
const modules = [{
    code:1,
    routePath:"/config",
    moduleName: "Cấu hình",
    subModules: {
        "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
        "Hồ sơ nhân sự": ["Danh sách nhân sự"],
        "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
        "Tiền lương":["Bảng lương"]
    }},{
        code:2,
        routePath:"/dashboard",
        moduleName: "Dashboard",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    },{
        code:3,
        routePath:"/purchasing",
        moduleName: "Mua hàng",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    },{
        code:4,
        routePath:"/distribution",
        moduleName: "Điều phối",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    },{
        code:5,
        routePath:"/marketing",
        moduleName: "Marketing",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    },{
        code:6,
        routePath:"/ecommerce",
        moduleName: "Ecommerce",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    },{
        code:7,
        routePath:"/business",
        moduleName: "Kinh doanh",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    },{
        code:8,
        routePath:"/employee",
        moduleName: "Nhân sự",
        subModules: {
            "Cơ cấu tổ chức": ["Cơ cấu tổ chức","Điểm làm việc"],
            "Hồ sơ nhân sự": ["Danh sách nhân sự"],
            "Đánh giá nhân sự":["Từ điển năng lực","Khung năng lực","Ngân hàng câu hỏi","Phân nhóm câu hỏi"],
            "Tiền lương":["Bảng lương"]
        },
    }
]

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/modules", (req, res) => {
    res.json({ status: "OK", message: "Get modules successful", data: modules})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});