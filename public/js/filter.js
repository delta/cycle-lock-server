var button = document.getElementById('inlineFormInputGroupFilter');
window.addEventListener('load', (event) => {
    button.value = "";
});
  
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