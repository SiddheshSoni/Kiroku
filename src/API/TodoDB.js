
const BASE_URL = `https://daily-todos-c93cd-default-rtdb.asia-southeast1.firebasedatabase.app/`;

const RequestWrapper = async (path="todos.json", {method='GET', body=null}={}) => {
    const url = BASE_URL+path;
    const options = {
        method,
        headers:{ 'Content-Type':'application/json'},
    }
    if(body){
        options.body = JSON.stringify(body);
    }

    try{
        const res = await fetch(url, options);
        const data = await res.json();

         if(res.ok){
            return { ok: true, data: data };
        }else{
            let errorMessage = "Failed sending data!";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage };
        }
    }catch(err){
        console.log(err);
    };
};

const getCurrentUser = () => { return localStorage.getItem('user')};

const AddTodoDB = async (newTask) => {
    const userId = getCurrentUser();
    return await RequestWrapper(`/${userId}/todos/.json`, {method:'POST', body: newTask});
}
const GetTodoDB = async () => {
    const userId = getCurrentUser();
    return await RequestWrapper(`/${userId}/todos/.json`, {method:'GET'});
}
const UpdateTodoDB = async (id, updatedFields) =>{
    const userId = getCurrentUser();
    return await RequestWrapper(`/${userId}/todos/${id}.json`, {method:'PATCH', body:updatedFields});
}
const DeleteTodoDB = async (id) =>{
    const userId = getCurrentUser();
    return await RequestWrapper(`/${userId}/todos/${id}.json`, {method:'DELETE'});
}

export {AddTodoDB, GetTodoDB, UpdateTodoDB, DeleteTodoDB};