const cache_key = 'calculation_history';

function checkStorage() {
     return typeof (Storage) !== undefined;
}

function putHistory(data) {
     if (checkStorage()) {
          let historyData;
          // Cek apakah di local sudah ada data
          if (localStorage.getItem(cache_key) === null) {
               historyData = [];
          } else {
               historyData = JSON.parse(localStorage.getItem(cache_key));
          }

          // console.log(historyData);

          historyData.unshift(data);

          if (historyData.length > 5) {
               historyData.pop();
          }

          localStorage.setItem(cache_key, JSON.stringify(historyData));
     }
}

function showHistory() {
     if (checkStorage()) {
          return JSON.parse(localStorage.getItem(cache_key)) || [];
     } else {
          return [];
     }
}

function renderHistory() {
     const historyData = showHistory();
     const historyContainer = document.querySelector('.tBody');

        // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
     historyContainer.innerHTML = ' ';

     for (let element of historyData) {
          let tr = document.createElement('tr');

          tr.classList.add('historyList');

          tr.innerHTML = `
               <td> ${element.firstNumber} </td>
               <td> ${element.operator} </td>
               <td> ${element.secondNumber} </td>
               <td> ${element.hasil} </td>
          `;

          historyContainer.appendChild(tr);
     }

     // console.log(historyData.length - historyData.length + 1);


}

renderHistory();