const BASE_URL = `https://daily-todos-c93cd-default-rtdb.asia-southeast1.firebasedatabase.app/`;

const RequestWrapper = async (path= 'expenses.json',{method='GET', body= null}={}) =>{
    const url = BASE_URL+path;
    const options = {
        method, 
        headers:{'Content-Type': 'application/json'}, // Corrected header name
    }
    if(body){
        options.body = JSON.stringify(body);
    }

    try{
        const res = await fetch(url, options);
        const data = await res.json();

        if(!res.ok){
            let errorMessage="Error sending expense request!";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage};
        }
        else{
            return { ok:true, data: data};
        }
    }catch(error){
        return {ok:false, error: error};
    }
};  

const sendExpense = async (newExpense) =>{
    return RequestWrapper('expenses.json', {method:'POST', body: newExpense})
};
const getExpense = async () =>{
    return RequestWrapper('expenses.json', {method:'GET'})
};

export { sendExpense, getExpense };