function fetchJSONData() {
            fetch('./data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();  
                })
                .then(data => console.log(data))  
                .catch(error => console.error('Failed to fetch data:', error)); 
        }
        fetchJSONData();  


function clicked(){
    let data_name = document.getElementById("name").value;
    let data_id = document.getElementById("id").value;
    document.getElementsByClassName("text_input")[0].value='';
    document.getElementsByClassName("text_input")[1].value='';
}

let erisData = fetchJSONData();
console.log(erisData);