const btnOpenForm = document.querySelector("#btnOpenForm");
const formAddUser = document.querySelector("#formAddUser");
const btnCloseForm = document.querySelector("#btnCloseForm");
const userName = document.querySelector("#userName");
const dateOfBirth = document.querySelector("#dateOfBirth");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const phoneNumber = document.querySelector("#phoneNumber");
const address = document.querySelector("#address");
const formElement = document.querySelector("#form");
const tbodyElement = document.querySelector("#tbody");

let users = JSON.parse(localStorage.getItem("users")) || [];

/**
 * Hàm mở form thêm mới
 */
function handleOpenForm() {
  // Thay đổi thuộc tính css của form từ display: none thành flex
  formAddUser.style.display = "flex";
}

/**
 * Hàm đóng form thêm mới
 */
function handleCloseForm() {
  // Thay đổi thuộc tính css của form từ display: flex thành none
  formAddUser.style.display = "none";
}

// Lắng nghe sự kiện khi click vào button thêm mới
btnOpenForm.addEventListener("click", () => {
  handleOpenForm();
});

// Reset các giá trị trong form
function resetForm() {
  userName.value = "";
  dateOfBirth.value = "";
  email.value = "";
  phoneNumber.value = "";
  address.value = "";
  password.value = "";
}

// Lắng nghe sự kiện khi click vào button đóng thì sẽ ẩn form
btnCloseForm.addEventListener("click", () => {
  handleCloseForm();
});

// Lắng nghe sự kiện submit form
formElement.addEventListener("submit", (e) => {
  // Ngăn chặn hành vi mặc định của form
  e.preventDefault();

  // Tạo đối tượng newUser chứa dư liệu lấy từ form
  const newUser = {
    userId: Math.ceil(Math.random() * 100000),
    userName: userName.value,
    dateOfBirth: dateOfBirth.value,
    email: email.value,
    password: password.value,
    phoneNumber: phoneNumber.value,
    address: address.value,
    createdDate: new Date().toISOString().split("T")[0],
  };

  // Thêm dữ liệu vào đầu mảng
  users.unshift(newUser);

  // Lưu dữ liệu lên local
  localStorage.setItem("users", JSON.stringify(users));

  // Gọi hàm reset lại form
  resetForm();

  // Đóng form thêm mới
  handleCloseForm();

  //   window.location.reload();

  // Gọi hàm render để lấy dữ liệu mới nhất từ local
  renderUsers();
});

// Hàm render danh sách user
function renderUsers() {
  const trHtmls = users.map((user, index) => {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${user.userName}</td>
            <td>${user.dateOfBirth}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.address}</td>
            <td>
              <button>Sửa</button>
            </td>
            <td>
              <button class="btn-delete" id="btnDelete_${
                user.userId
              }">Xóa</button>
            </td>
        </tr>
    `;
  });

  // Ép kiểu từ mảng về string
  const trHtml = trHtmls.join("");

  // Gắn chuỗi html vào trong tbody
  tbodyElement.innerHTML = trHtml;
}

renderUsers();

const btnDelete = document.querySelectorAll(".btn-delete");
btnDelete.forEach((btn) => {
  // Lắng nghe sự kiện onclick trên từng button
  btn.addEventListener("click", (e) => {
    // Cắt chuỗi id để lấy id thực tế của user
    const idDelete = +e.target.id.split("_")[1];

    // Từ mảng trên local, lọc ra những bản ghi có id khác với id cần xóa
    const filterUser = users.filter((user) => user.userId !== idDelete);

    // Gán lại giá trị mới nhất cho biến users
    users = filterUser;

    // Lưu dữ liệu mới nhất lên local
    localStorage.setItem("users", JSON.stringify(filterUser));

    // Gọi hàm render để nhận dữ liệu mới nhất từ local
    renderUsers();
  });
});

// Khi click vào nut sửa thì sẽ lấy ra id của bản ghi cần cập nhật
// Tạo ra một biến userUpdate = null
// Tìm kiếm vị trí của bản ghi cần cập nhật trong bảng (findIndex())
// Từ vị trí, truy cập và lấy ra bản ghi cần cập nhật. Ví dụ index = 1, => array[index]
// Mở form và gán lại giá trị của đối tượng user tìm thấy và hiển thị lên các ô input
// Thực hiện sửa lại dữ liệu
// Lưu dữ liệu lên local và render lại dữ liệu mới nhất
