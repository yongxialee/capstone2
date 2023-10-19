import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class BloomInSpringAPI {
     // the token for interactive with the API will be stored here.
    static token;
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BloomInSpringAPI.token}` };
        const params = (method === "get")
            ? data 
            : {};
        

        try {
        const res = (await axios({ url, method, data, params, headers })).data;
            console.log(res)
            return res;
        } catch (err) {
            console.error("API Error:", err.response);
   
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
        }
    }

    //individual API routes

    //getbouquets
    static async getAllProduct(){
        try{
            const res = await this.request(`product`);
            return res;
        }catch(err){
            console.log(err);
            return [];
        }
        
    }
    // getproduct by id
    static async getProductById(id){
        const res = await this.request(`product/${id}`);
        return res;
    }
    static async signUp(formData){
        const res = await this.request(`auth/register`,formData,'post');
        return res.token;
    }

    static async login(formData){
        let res = await this.request(`auth/token`,formData,'post');
        return res.token;
    }
    /**edit user's profile */
    static async profileUpdate(username, formData) {
        let res = await this.request(`users/${username}`, formData, 'patch');
    return res.user;
    }

    /**search bouquets */
    static async searchBouquets(searchTerm) {
        let res = await this.request(`product`, {name: searchTerm});
        return res.bouquets;
    }
    /** Get infomation on current user */
    
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }
    static async removeUser(username){
         await this.request(`users/${username}`,{},'deleted');

    }
    static async addTransaction(username,transactionData){
        let res = await this.request(`users/${username}/transactions`,transactionData,'post');
        return res.transactions;
    }

    static async getTransactions(username){
        let res = await this.request(`users/${username}/transactions`);
        return res.transactions;
    }
    static async updateTransactions(username,transactionData){
        let res = await this.request(`users/${username}/transactions`,transactionData,'put');
        return res.transaction;
    }
}
//this token is for testuer
BloomInSpringAPI.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default BloomInSpringAPI;