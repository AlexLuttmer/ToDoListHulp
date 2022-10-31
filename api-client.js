let serverUrl = `http://localhost:3000/`;

let getAllData = async function () {

    try {
        let rawData = await fetch(serverUrl,
            {method: "GET", 
            headers: {'Content-Type':'application/json'}})
        let jsonData = await rawData.json();
        console.log(jsonData)
        return jsonData;
    } 

    catch {
        (error) => {console.log(error)}
    }
}

let getSpecificData = async function (itemID) {

    try {
        let rawData = await fetch(serverUrl + itemID,
            {method: "GET",
            headers: {'Content-Type':'application/json'}});
        let jsonData = await rawData.json();
        console.log("getSpecificData ", jsonData)
        return jsonData;
    }

    catch {
        (error) => {console.log(error)}
    }
}

let postData = async function (data) {
    
    try {
        let jsonData = JSON.stringify(data)
        await fetch(serverUrl,
            {method: "POST", 
            headers: {'Content-Type':'application/json'},
            body: jsonData})
    }

    catch {
        (error) => console.log(error)
    }
}

let putData = async function (itemID, updatedItem) {

    try {
        let jsonData = JSON.stringify(updatedItem)
        await fetch(serverUrl + itemID,
            {method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: jsonData})
    }

    catch {
        (error) => console.log(error)
    }
}

let delSpecificData = async function (taskID) {

    try {
        const ret = await fetch(serverUrl + taskID,
            {method: "DELETE",
            headers: {'Content-Type':'application/json'}})
    return ret;
    }

    catch {
        (error) => console.log(error)
    }
}






