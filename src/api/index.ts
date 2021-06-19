import axios, { AxiosInstance } from 'axios';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

const instance: AxiosInstance = axios.create({ headers });

export default instance;
