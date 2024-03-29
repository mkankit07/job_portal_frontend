
import Cookies from "js-cookie";

// post job api

export const post_job = async (formData) => {
    console.log(formData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in post job (service) => ', error);
    }
}


// get job api
export const get_job = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job`, {
            method: 'GET',
            headers : {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting job (service) => ', error);
    }
}

// get specified job api
export const get_specified_job = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting  specified job (service) => ', error);
    }
}



// apply  job api

export const apply_job = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply-job`, {
            method: 'POST',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`},
            body: formData,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error in apply job (service) => ', error);
    }
}


// get my all applied job api
 
export const get_my_applied_job = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply-job`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting  getting my all job (service) => ', error);
    }
}


// get my all posted job api 

export const get_my_posted_job = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/user-job`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all job (service) => ', error);
    }
}


// get my all application of specified jobs api

export const get_all_applications = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply-job/job/${id}`, {
            method: 'POST',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`},
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all application of specified jobs (service) => ', error);
    }
}


// change application status api

export const change_application_status = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply-job`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all application of specified jobs (service) => ', error);
    }
}



export const get_application_details = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply-job/${id}`, {
            method: 'GET',
            headers : {'Authorization': `Bearer ${Cookies.get('token')}`}
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in   getting my all application of specified jobs (service) => ', error);
    }
}