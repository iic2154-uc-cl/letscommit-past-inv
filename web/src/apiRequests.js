import axios from 'axios'

async function getFromAPI(url){
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = await axios.get(url,config);
    return response;
}

async function postToAPI(url,data){
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };
    const response = await axios.post(url,data,config);
    return response;
}

async function putToAPI(url,data){
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };
    const response = await axios.put(url,data,config);
    return response;
}

export {getFromAPI, postToAPI, putToAPI }