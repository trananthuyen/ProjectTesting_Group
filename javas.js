const customers = [];

        // Lớp thông tin khách hàng
        class InforPerson {
            constructor(name, birthdate, numberInput, gender) {
                this.name = name;
                this.birthdate = birthdate;
                this.numberInput = numberInput;
                this.gender = gender;
            }
        }

        // Hàm khởi tạo bảng mặc định
        function tableDefault() {
            customers.push(new InforPerson("Trần An Thuyên", "2003-12-26", "123456789012", "Nam"));
            customers.push(new InforPerson("Nguyễn Thị Lan", "2003-02-02", "123456789012", "Nu"));
            customers.push(new InforPerson("Nguyễn Văn An", "2001-02-16", "123456789012", "Nam"));
            customers.push(new InforPerson("Nguyễn B", "2013-1-06", "123456789012", "Nu"));
            addRowToTable();
        }

        

        // Lấy thông tin từ form và thêm vào bảng
        function submitInfor(event) {
            
            const name = document.getElementById("name").value;
            const birthdate = document.getElementById("birthdate").value;
            const numberInput = document.getElementById("numberInput").value;
            let gender = document.getElementById("mr").checked ? "Nam" : "Nữ";

            if (name && birthdate && numberInput && gender) {
                customers.push(new InforPerson(name, birthdate, numberInput, gender));
                addRowToTable();
                document.getElementById("addForm").reset();
            } else {
                alert("Vui lòng nhập đầy đủ thông tin.");
            }
        }

        // Hàm thêm thông tin vào bảng
        function addRowToTable() {
            const table = document.querySelector("table");
            let rowCount = table.rows.length;

            // Xóa các hàng hiện có (trừ tiêu đề)
            for (let i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
            }

            document.getElementById("numberlist").innerHTML = `row: ${rowCount}`;

            customers.forEach((customer, index) => {
                const newRow = table.insertRow(index + 1);
                newRow.insertCell(0).innerHTML = index + 1;
                newRow.insertCell(1).innerHTML = customer.numberInput;
                newRow.insertCell(2).innerHTML = customer.name;
                newRow.insertCell(3).innerHTML = customer.birthdate;
                newRow.insertCell(4).innerHTML = customer.gender;
                newRow.insertCell(5).innerHTML = `<button style="background-color:red" onclick="deleteRow(${index});">Xóa</button>
                           <br><br> 
                           <button onclick="chooseRow(${index});">Chỉnh sửa</button>`;
            });
        }

        // Hàm xóa hàng
        function deleteRow(index) {
            customers.splice(index, 1);
            addRowToTable();
        }

        // Hàm lấy thông tin hàng để chỉnh sửa
        function chooseRow(index) {
            const customer = customers[index];
            document.getElementById("editName").value = customer.name;
            document.getElementById("editBirthdate").value = customer.birthdate;
            document.getElementById("editNumberInput").value = customer.numberInput;
            document.getElementById("selectRow").innerHTML = `row: ${index + 1}`;

            if (customer.gender === "Nam") {
                document.getElementById("editMr").checked = true;
            } else {
                document.getElementById("editMs").checked = true;
            }

            document.getElementById("selectRow").dataset.index = index;
        }

        // Hàm chỉnh sửa hàng
        function editRowInfor() {
            const index = document.getElementById("selectRow").dataset.index;
            const name = document.getElementById("editName").value;
            const birthdate = document.getElementById("editBirthdate").value;
            const numberInput = document.getElementById("editNumberInput").value;
            let gender = document.getElementById("editMr").checked ? "Nam" : "Nữ";

            if (name && birthdate && numberInput && gender) {
                customers[index] = new InforPerson(name, birthdate, numberInput, gender);
                addRowToTable();
                document.getElementById("selectRow").innerHTML = 'row: ';
                document.getElementById("editForm").reset();
            } else {
                alert("Vui lòng nhập đầy đủ thông tin.");
            }
        }

        function reload() {
            
            addRowToTable();
        }

        function searchCustomer() {
            const searchValue = document.getElementById("searchInput").value.toLowerCase();
            const searchBy = document.getElementById("searchBy").value;
            const tbody = document.querySelector("#customerTable tbody");
            const table = document.querySelector("table");
           
            
            
        
            // Lọc danh sách khách hàng theo tiêu chí tìm kiếm
            const filteredCustomers = customers.filter(customer => {
                if (searchBy === 'name') return customer.name.toLowerCase().includes(searchValue);
                if (searchBy === 'numberInput') return customer.numberInput.includes(searchValue);
                if (searchBy === 'birthdate') return customer.birthdate.includes(searchValue);
                if (searchBy === 'gender') return customer.gender.toLowerCase().includes(searchValue);
                return false;
            });
        
            // Kiểm tra nếu không có kết quả tìm kiếm
            if (filteredCustomers.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6">Không có kết quả tìm kiếm phù hợp</td></tr>`;
            } else {
                let rowCount = table.rows.length;
                for (let i = rowCount - 1; i > 0; i--) {
                    table.deleteRow(i);
                }

                // Hiển thị kết quả tìm kiếm lên bảng
                filteredCustomers.forEach((customer, index) => {
                    const newRow = table.insertRow(index + 1);
                    newRow.insertCell(0).innerHTML = index + 1;
                    newRow.insertCell(1).innerHTML = customer.numberInput;
                    newRow.insertCell(2).innerHTML = customer.name;
                    newRow.insertCell(3).innerHTML = customer.birthdate;
                    newRow.insertCell(4).innerHTML = customer.gender;
                    newRow.insertCell(5).innerHTML = `<button style="background-color:red" onclick="deleteRow(${index});">Xóa</button>
                           <br><br> 
                           <button onclick="chooseRow(${index});">Chỉnh sửa</button>`;
                    
                    tbody.innerHTML += row;
                });
            }

           
        }
        
       
                           
    


