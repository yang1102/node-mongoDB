import {readFileSync} from 'fs';
import {transform, zipObject} from 'lodash';
import {resolve} from 'path';

export function readData(path) {
  let content;
  const result = [];
  try {
    content = readFileSync(resolve(__dirname, path), "utf8");
  } catch (err) {
    console.error('read data faild:', err);
  }

  return _parseCSV(content);
}

function _parseCSV(content) {
  const result = transform(content.split('\n'), (result, value, index) => {
    // the first line is the field title
    if (index === 0) {
      result.push(value.split(','));
    } else {
      const title = result[0];
      const valueArray = value.split(',');
      if (valueArray.length > 1) {
        result.push(zipObject(title, valueArray));
      }
    }
  }, []);

  // remove the title line
  result.shift();
  return result;
}
