"use strict";
function forForm() {
  const btnAddUser = document.querySelector(".btn");
  const formAddUser = document.querySelector(".modal2");
  const formChange = document.querySelector(".modal");
  const formDelete = document.querySelector(".modal3");
  const cross = document.querySelectorAll(".form-close");
  const table = document.querySelector("tbody");
  const tableCont = document.querySelector(".table-cont");
  const btnAddCont = document.querySelector(".form-btn");
  const btnOtmena = formAddUser.querySelector(".btn-del-form");
  console.log(tableCont);
  const telef = formChange.querySelector(".telfons");

  // const delet = document.querySelectorAll(".btn-table2");
  const poisk = document.querySelector(".header-input");

  const surname = formAddUser.querySelector(".surname");
  const name = formAddUser.querySelector(".name");
  const postName = formAddUser.querySelector(".postName");

  let mass = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];

  btnAddUser.addEventListener("click", () => {
    formAddUser.style.display = "flex";
  });

  btnAddCont.addEventListener("click", () => {
    addPeople();
  });

  btnOtmena.addEventListener("click", () => {
    formAddUser.style.display = "none";
    surname.value = "";
    name.value = "";
    postName.value = "";
  });

  poisk.addEventListener("input", () => {
    tableSearch();
  });

  function addCont(form) {
    let placeCont = form.querySelector(".placeCont");
    const btnAdd = form.querySelector(".btn-form-cont");

    btnAdd.addEventListener("click", () => {
      let cont = document.createElement("div");
      cont.classList.add("tel");

      cont.innerHTML = `
                <select>
                    <option value="Телефон" select>Телефон</option>
                    <option value="Доп. телефон">Доп. телефон</option>
                    <option value="Email">Email</option>
                    <option value="Vk">Vk</option>
                    <option value="Facebook">Facebook</option>
                </select>
                <input type="text" placeholder="Введите данные контакта">
            `;
      btnAdd.before(cont);
    });
  }
  function addContChange(form) {
    let placeCont = form.querySelector(".placeCont");
    const btnAdd = form.querySelector(".btn-form-cont");

    btnAdd.addEventListener("click", () => {
      let cont = document.createElement("div");
      cont.classList.add("tel");

      cont.innerHTML = `
                <select>
                    <option value="Телефон" select>Телефон</option>
                    <option value="Доп. телефон">Доп. телефон</option>
                    <option value="Email">Email</option>
                    <option value="Vk">Vk</option>
                    <option value="Facebook">Facebook</option>
                </select>
                <input type="text" placeholder="Введите данные контакта">
            `;
      telef.append(cont);
    });
  }
  addCont(formAddUser);
  addContChange(formChange);

  function clothForm() {
    let mass = [formAddUser, formChange, formDelete];
    for (let i = 0; i < cross.length; i++) {
      cross[i].addEventListener("click", () => {
        mass[i].style.display = "none";
        telef.innerHTML = ``;
      });
      mass[i].addEventListener("click", (e) => {
        const wind = e.target.closest(".modal__inner");

        if (!wind) {
          mass[i].style.display = "none";
          telef.innerHTML = ``;
        }
      });
    }
  }
  clothForm();

  function drowTable() {
    table.innerHTML = `
      <tr>
      <th class="">
          <div class="text-oposit text-titleID ">
              <p>ID</p>
              <img src="img/arrow_downward.svg" alt="">
          </div> 
      </th>
      <th class="fio">
          <div class="text-oposit text-title">
              <p>Имя Фамилия Отчество</p>
              <img src="img/Group 202.svg" alt="">
          </div>
      </th>
      <th class="">
          <div class="text-oposit text-title data">
              <p>Дата и время создания</p> 
              <img src="img/arrow_downward.svg" alt="">
          </div>
      </th>
      <th class="">
          <div class="text-oposit text-title data">
              <p>Дата и время изменения</p> 
              <img src="img/arrow_downward.svg" alt="">
          </div>
          
      </th>
      <th>
          <div class="text-oposit text-title cont">
              <p>Контакты</p>
          </div>
          
      </th>
      <th>
          <div class="text-oposit text-title ">
              <p>Действия</p>
          </div>
          
      </th>
  </tr>
      `;
    let mass = localStorage.getItem("student")
      ? JSON.parse(localStorage.getItem("student"))
      : [];

    for (let i = 0; i < mass.length; i++) {
      creatStr(mass[i]);
    }
  }
  drowTable();

  function creatStr(obj) {
    let { id, name, surname, postName, dateCreate, DataChange, contacts } = obj;

    let str = document.createElement("tr");

    str.innerHTML = `
            
          <td class="id-content text-title">
                    ${id}
                </td>
                <td class="title-text-black">
                    ${surname} ${name} ${postName}
                </td>
                <td>
                    <div class="text-oposit data-text">
                        <div>
                            <p class="title-text-black">${dateCreate.slice(
                              0,
                              10
                            )}</p>
                        </div>
                        <div class="">
                            <p class="text-2">${dateCreate.slice(10)}</p>
                        </div>       
                    </div>
                </td>
                <td>
                    <div class="text-oposit data-text">
                        <div>
                            <p class="title-text-black">${DataChange.slice(
                              0,
                              10
                            )}</p>
                        </div>
                        <div class="">
                            <p class="text-2">${DataChange.slice(10)}</p>
                        </div>          
                    </div>
                </td>
                <td class="contacts">
                    
                </td>
                <td>
                    <div class="tabl_btn">
                        <button class="btn-table1"><img src="img/Vector3.svg" alt=""> Изменить</button>
                        <button class="btn-table2"><img src="img/Vector (1).svg" alt=""> Удалить</button>
                    </div>                    
                            
                </td>
            
        `;

    let contactsDiv = str.querySelector(".contacts");
    console.log(contactsDiv);

    let getIcons = () => {
      for (let contact of obj.contacts) {
        contactsDiv.innerHTML += `<img class="btn_t" src="./img/icon/${contact.type}.svg">`;
      }
    };
    getIcons();
    table.append(str);
    deletElem();
    changeElem();
  }

  function addPeople() {
    let data = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString().slice(0, 5);

    if (!surname.value) {
      surname.classList.add("error");
      surname.placeholder = "Нужно ввести фамилию*";
    }
    if (!name.value) {
      name.classList.add("error");
      name.placeholder = "Нужно ввести имя*";
    }

    if (surname.value && name.value) {
      let people = {
        id: mass.length,
        name: name.value,
        surname: surname.value,
        postName: postName.value,
        dateCreate: data + time,
        DataChange: data + time,
        contacts: getContact(formAddUser),
      };
      creatStr(people);

      mass.push(people);
      localStorage.setItem("student", JSON.stringify(mass));

      formAddUser.style.display = "none";
      surname.classList.remove("error");
      name.classList.remove("error");

      surname.value = "";
      name.value = "";
      postName.value = "";
    }
  }
  let getContact = (form) => {
    let contacts = form.querySelectorAll(".tel");
    let contactsArr = [];

    for (let contact of contacts) {
      let type = contact.querySelector("select").value;
      let value = contact.querySelector("input").value;
      let obj = { type, value };
      contactsArr.push(obj);
    }
    return contactsArr;
  };

  function deletElem() {
    const delet = document.querySelectorAll(".btn-table2");
    for (let btn = 0; btn < delet.length; btn++) {
      delet[btn].addEventListener("click", () => {
        let idElem = 0;
        let btnDelete = formDelete.querySelector(".form-btn");
        let elem = delet[btn].closest("tr");
        formDelete.style.display = "flex";
        btnDelete.addEventListener("click", () => {
          for (let i = 0; i < mass.length; i++) {
            if (mass[i].id == idElem) {
              mass.splice(i, 1);
              elem.remove();
              localStorage.setItem("student", JSON.stringify(mass));
            }
          }
        });
        idElem = elem.querySelector(".id-content").textContent.trim();
      });
    }
  }

  function changeElem() {
    const change = document.querySelectorAll(".btn-table1");
    for (let btn = 0; btn < change.length; btn++) {
      change[btn].addEventListener("click", () => {
        let idElem = 0;
        let elem = change[btn].closest("tr");
        formChange.style.display = "flex";
        idElem = elem.querySelector(".id-content").textContent.trim();
        for (let i = 0; i < mass.length; i++) {
          if (mass[i].id == idElem) {
            getInfor(mass[i]);
          }
        }
      });
    }
  }

  function getInfor(obj) {
    const id = formChange.querySelector(".text-title");
    const surname = formChange.querySelector(".surname");
    const name = formChange.querySelector(".name");
    const postName = formChange.querySelector(".postName");
    const telephon = formChange.querySelector(".tel");

    id.textContent = "ID: " + obj.id;
    surname.value = obj.surname;
    name.value = obj.name;
    postName.value = obj.postName;

    const btnSave = formChange.querySelector(".form-btn");
    const btnDel2 = formChange.querySelector(".btn-del-form");

    let surnameNew = "";
    let nameNew = "";
    let postNameNew = "";
    let dataNew = "";

    for (let i = 0; i < obj.contacts.length; i++) {
      console.log(obj.contacts[i]);
      const btnAdd = formChange.querySelector(".btn-form-cont");
      let str = document.createElement("div");
      str.classList.add("tel");
      console.log(1);
      str.innerHTML = `
                <select>
                    <option value="Телефон" select>Телефон</option>
                    <option value="Доп. телефон">Доп. телефон</option>
                    <option value="Email" >Email</option>
                    <option value="Vk">Vk</option>
                    <option value="Facebook">Facebook</option>
                </select>
                <input type="text" placeholder="Введите данные контакта">
            `;
      console.log(str.querySelector("select"));
      console.log(obj.contacts[i]);
      str.querySelector("select").value = obj.contacts[i].type;
      str.querySelector("input").value = obj.contacts[i].value;
      telef.append(str);

      // btnAdd.before(str);
    }

    btnSave.addEventListener("click", () => {
      let data = new Date().toLocaleDateString();
      let time = new Date().toLocaleTimeString().slice(0, 5);

      if (surname.value != obj.surname) {
        surnameNew = surname.value;
        dataNew = data + time;
      } else {
        surnameNew = obj.surname;
        dataNew = obj.DataChange;
      }
      if (name.value != obj.name) {
        nameNew = name.value;
        dataNew = data + time;
      } else {
        nameNew = obj.name;
        dataNew = obj.DataChange;
      }
      if (postName.value != obj.postName) {
        postNameNew = postName.value;
        dataNew = data + time;
      } else {
        postNameNew = obj.postName;
        dataNew = obj.DataChange;
      }

      let peopl = {
        id: obj.id,
        name: nameNew,
        surname: surnameNew,
        postName: postNameNew,
        dateCreate: obj.dateCreate,
        DataChange: dataNew,
        contacts: getContact(formChange),
      };
      mass.splice(obj.id, 1, peopl);
      localStorage.setItem("student", JSON.stringify(mass));
      drowTable();
      formChange.style.display = "none";
      surnameNew = "";
      telef.innerHTML = ``;
    });

    btnDel2.addEventListener("click", () => {
      mass.splice(id, 1);
      localStorage.setItem("student", JSON.stringify(mass));
      drowTable();
    });
  }

  function tableSearch() {

    let time = setTimeout(() => {
      let phrase = document.querySelector(".header-input");
      let table = document.querySelector("table");
      let regPhrase = new RegExp(phrase.value, "i");
      let flag = false;
      for (let i = 1; i < table.rows.length; i++) {
        flag = false;
        for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
          flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
          if (flag) break;
        }
        if (flag) {
          table.rows[i].style.display = "";
        } else {
          table.rows[i].style.display = "none";
        }
      }
    }, 1000);
    
  }

  table.addEventListener("click", (e) => {
    switch (e.target.textContent) {
      case "ID":
        sorttableId(mass);
        break;
      case "Имя Фамилия Отчество":
        sorttableSurname(mass);
        break;
      case "Дата и время создания":
        sorttableDateCreate(mass);
        break;
      case "Дата и время изменения":
        sorttableDateChange(mass);
        break;
      case "Контакты":
        // sorttable(mass,svoysto)
        break;
      default:
        break;
    }
  });

  function sorttableId(mass) {
    function SortArray(x, y) {
      if (x.id < y.id) {
        return -1;
      }
      if (x.id > y.id) {
        return 1;
      }
      return 0;
    }
    let s = mass.sort(SortArray);
    console.log(s);
    drowTableForFilter(s);
  }
  function sorttableSurname(mass) {
    function SortArray(x, y) {
      if (x.surname < y.surname) {
        return -1;
      }
      if (x.surname > y.surname) {
        return 1;
      }
      return 0;
    }
    let s = mass.sort(SortArray);
    console.log(s);
    drowTableForFilter(s);
  }
  function sorttableDateCreate(mass) {
    function SortArray(x, y) {
      if (x.dateCreate < y.dateCreate) {
        return -1;
      }
      if (x.dateCreate > y.dateCreate) {
        return 1;
      }
      console.log(x.id, y.id);
      return 0;
    }
    let s = mass.sort(SortArray);
    console.log(s);
    drowTableForFilter(s);
  }
  function sorttableDateChange(mass) {
    function SortArray(x, y) {
      if (x.DataChange < y.DataChange) {
        return -1;
      }
      if (x.DataChange > y.DataChange) {
        return 1;
      }
      return 0;
    }
    let s = mass.sort(SortArray);
    console.log(s);
    drowTableForFilter(s);
  }
  function sorttableCont(mass) {
    function SortArray(x, y) {
      if (x.id < y.id) {
        return -1;
      }
      if (x.id > y.id) {
        return 1;
      }
      console.log(x.id, y.id);
      return 0;
    }
    let s = mass.sort(SortArray);
    console.log(s);
    drowTableForFilter(s);
  }

  function drowTableForFilter(mass) {
    table.innerHTML = `
  <tr>
  <th class="">
      <div class="text-oposit text-titleID ">
          <p>ID</p>
          <img src="img/arrow_downward.svg" alt="">
      </div> 
  </th>
  <th class="fio">
      <div class="text-oposit text-title">
          <p>Имя Фамилия Отчество</p>
          <img src="img/Group 202.svg" alt="">
      </div>
  </th>
  <th class="">
      <div class="text-oposit text-title data">
          <p>Дата и время создания</p> 
          <img src="img/arrow_downward.svg" alt="">
      </div>
  </th>
  <th class="">
      <div class="text-oposit text-title data">
          <p>Дата и время изменения</p> 
          <img src="img/arrow_downward.svg" alt="">
      </div>
      
  </th>
  <th>
      <div class="text-oposit text-title cont">
          <p>Контакты</p>
      </div>
      
  </th>
  <th>
      <div class="text-oposit text-title ">
          <p>Действия</p>
      </div>
      
  </th>
</tr>
  `;
    // let mass = localStorage.getItem("student")? JSON.parse(localStorage.getItem("student")) : [];

    for (let i = 0; i < mass.length; i++) {
      creatStr(mass[i]);
    }
  }
  const dataList = document.querySelector("#browsers");

  for(let i = 0;i<mass.length;i++){
    let option = document.createElement("option")
    option.value = `${mass[i].surname} ${mass[i].name} ${mass[i].postName}`;
    // let time = setTimeout(() => {
     
        dataList.append(option);
      
    // }, 4000);
    
  }


}

forForm();


