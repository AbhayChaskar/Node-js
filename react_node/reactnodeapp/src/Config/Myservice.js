import axios from 'axios';
import { MAIN_URL } from './Url';

export function getPosts() {
    return axios.get(`${MAIN_URL}posts/fetchpost`);
}

export function addPosts(data) {
    return axios.post(`${MAIN_URL}posts/addpost`,data);
}
