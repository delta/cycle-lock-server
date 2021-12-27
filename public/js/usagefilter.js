var button = document.getElementById('inlineFormInputGroupFilter');
var button1 = document.getElementById('inlineFormInputGroupFilter1');

window.addEventListener('load', (event) => {
    button.value = "";
    button1.value = "";
});

const btn1 = document.getElementById("btnradio1");
const btn2 = document.getElementById("btnradio2");
btn2.addEventListener("input", () => {
    document.getElementById("RollNo").style.display="";
    document.getElementById("Id").style.display="none";
})
btn1.addEventListener("input", () => {
    document.getElementById("Id").style.display="";
    document.getElementById("RollNo").style.display="none";
})
button.addEventListener("input", () => {
    var t = button.value;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";
    
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            cell = tr[i].getElementsByTagName("td")[0];
            if (cell) {
                if (cell.innerHTML.indexOf(t) == 0) {
                tr[i].style.display = "";
                break;
                }
            }
        }
    }
})

button1.addEventListener("input", () => {
    var t = button1.value;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        // Hide the row initially.
        tr[i].style.display = "none";
    
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            cell = tr[i].getElementsByTagName("td")[1];
            if (cell) {
                if (cell.innerHTML.indexOf(t) == 0) {
                tr[i].style.display = "";
                break;
                }
            }
        }
    }
})