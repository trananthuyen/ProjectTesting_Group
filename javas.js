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
            customers.push(new InforPerson("Nguyễn Thị Lan", "2003-02-02", "123456789012", "Nữ"));
            customers.push(new InforPerson("Nguyễn Văn An", "2001-02-16", "123456789012", "Nam"));
            customers.push(new InforPerson("Nguyễn B", "2013-01-06", "123456789012", "Nữ"));
            customers.push(new InforPerson("Nguyen Van A", "1990-01-01", "987654321123", "Nam"));
            addRowToTable();
        }

        function isValidDate(dateString) {
            const date = new Date(dateString);
            
            // Kiểm tra nếu `date` không phải là "Invalid Date" và chuỗi ban đầu không bị rỗng
            return date instanceof Date && !isNaN(date) && dateString.trim() !== "";
        }

        

        // Lấy thông tin từ form và thêm vào bảng
        function submitInfor(event) {
            
            const name = document.getElementById("name").value;
            const birthdate = document.getElementById("birthdate").value;
            const numberInput = document.getElementById("numberInput").value;
            let gender = document.getElementById("mr").checked ? "Nam" : "Nữ";

            

            if (name && birthdate && numberInput && gender) {

                const containsNumber = /\d/;              // Kiểm tra có số (0-9)
                const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Kiểm tra có ký tự đặc biệt

                const check =  containsNumber.test(name) || containsSpecialChar.test(name);
                
                if(check) {
                    const messager = document.querySelector(".text-red-addForm");
                    messager.innerHTML = '<div class="text-red-addForm"><p class="paragraph">Name should not be has numbers and special characters </p></div>'
                    return;
                }

                const regex_num = /^\d+$/; // Chỉ cho phép các số từ 0-9
                const check_num = regex_num.test(numberInput); // Trả về true nếu chuỗi chỉ chứa số

                if(!check_num) {
                    const messager = document.querySelector(".text-red-addForm");
                    messager.innerHTML = '<div class="text-red-addForm"><p class="paragraph">CCCD should be numbers </p></div>';
                    return;
                }

                if(!isValidDate(birthdate)) {
                    const messager = document.querySelector(".text-red-addForm");
                    messager.innerHTML = '<div class="text-red-addForm"><p class="paragraph">it is not valid date </p></div>';
                    return;
                }

                if(numberInput.length != 12) {
                    const messager = document.querySelector(".text-red-addForm");
                    messager.innerHTML = '<div class="text-red-addForm"><p class="paragraph">CCCD should have 12 numbers </p></div>';
                    return;
                }

                const messager = document.querySelector(".text-red-addForm");
                messager.innerHTML = '<div class="text-red-addForm"><p class="paragraph">Add success! </p></div>';

                customers.push(new InforPerson(name, birthdate, numberInput, gender));
                addRowToTable();
                document.getElementById("addForm").reset();
            } else {
                const messager = document.querySelector(".text-red-addForm");
                messager.innerHTML = '<div class="text-red-addForm"><p class="paragraph">Vui lòng nhập đầy đủ thông tin. </p></div>';
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

            document.getElementById("numberlist").innerHTML = `row: ${customers.length}`;

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

                const containsNumber = /\d/;              // Kiểm tra có số (0-9)
                const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Kiểm tra có ký tự đặc biệt

                const check =  containsNumber.test(name) || containsSpecialChar.test(name);
                
                if(check) {
                    const messager = document.querySelector(".text-red-editForm");
                    messager.innerHTML = '<div class="text-red-editForm"><p class="paragraph">Name should not be has numbers and special characters </p></div>'
                    return;
                }

                const regex_num = /^\d+$/; // Chỉ cho phép các số từ 0-9
                const check_num = regex_num.test(numberInput); // Trả về true nếu chuỗi chỉ chứa số

                if(!check_num) {
                    const messager = document.querySelector(".text-red-editForm");
                    messager.innerHTML = '<div class="text-red-editForm"><p class="paragraph">CCCD should be numbers </p></div>';
                    return;
                }

                if(!isValidDate(birthdate)) {
                    const messager = document.querySelector(".text-red-editForm");
                    messager.innerHTML = '<div class="text-red-editForm"><p class="paragraph">it is not valid date </p></div>';
                    return;
                }

                if(numberInput.length != 12) {
                    const messager = document.querySelector(".text-red-editForm");
                    messager.innerHTML = '<div class="text-red-editForm"><p class="paragraph">CCCD should have 12 numbers </p></div>';
                    return;
                }

                const messager = document.querySelector(".text-red-editForm");
                messager.innerHTML = '<div class="text-red-editForm"><p class="paragraph">Add success! </p></div>';

                customers[index] = new InforPerson(name, birthdate, numberInput, gender);
                addRowToTable();
                document.getElementById("selectRow").innerHTML = 'row: ';
                document.getElementById("editForm").reset();
            } else {
                const messager = document.querySelector(".text-red-editForm");
                messager.innerHTML = '<div class="text-red-editForm"><p class="paragraph">Vui lòng nhập đầy đủ thông tin. </p></div>';
                
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

                document.getElementById("numberlist").innerHTML = `row: ${filteredCustomers.length}`;

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
                    
                    
                });
            }

           
        }
        
       
                           
    


