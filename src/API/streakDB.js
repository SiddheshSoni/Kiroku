
const BASE_URL = `https://daily-todos-c93cd-default-rtdb.asia-southeast1.firebasedatabase.app/`;

const RequestWrapper = async (path="streak.json", {method='GET', body=null}={}) => {
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
            let errorMessage = "Failed getting streak data!";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage };
        }

    }catch(err){
        console.log(err);
    };
};

const UpdateStreak = async (streak) =>{
    return await RequestWrapper('streak.json', {method:'PATCH', body : streak })
};
const GetStreak = async () => {
    return await RequestWrapper('streak.json', {method:'GET'});
};

export { GetStreak , UpdateStreak};