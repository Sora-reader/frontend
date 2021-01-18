import {getListData, ListDataType, searchUrl} from '../../config/ReadManga';
import {CORSProxyUrl} from '../../config';

export function searchItems(queryData: string, setListData: Function) {
  const body = 'q=' + queryData;

  fetch(CORSProxyUrl + searchUrl, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  }).then(res => res.text()).then((data) => {
    const newData: ListDataType = getListData(data);
    setListData(newData);
  }).catch((res) => console.log('Error\n' + res));
}