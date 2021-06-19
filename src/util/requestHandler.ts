import axios from 'axios';

export default async function requestHandler(
  func: Function,
  params: any[],
	showError: boolean = true
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await func(...params);
      return resolve(data);
    } catch (e) {
      let error, message;
      if (showError && axios.isAxiosError(e) && e.response) {
        error = 'Error ' + e.response.status;
        message = e.response.data.message;
        return Promise.reject({ error, message });
      }
      error = e?.request?.message || 'Internal Error';
      message = e.response?.message || 'Unexpected error occured. Please, try again later.';
      return reject({ error, message });
    }
  });
}
