# React Datetime Picker

날짜와 시간을 선택할 수 있는 라이브러리 flatpickr 를 React 에서 사용할 수 있게 개발되었습니다.

UI 는 Bootstrap 을 사용했으며 필수는 아닙니다. 직접 UI 를 고칠 수 있습니다.

크롬, 파이어폭스, 사파리 그리고 IE 11 이상에서 테스트되었습니다.

flatpickr 의 기능을 모두 사용할 수 있습니다.

[![Edit React DatetimePicker Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/v64l7r7mr5)

## install

```
// optional
$ npm install bootstrap font-awesome

// required
$ npm install react react-dom flatpickr

$ npm install react-datetimepicker-syaku

or

$ yarn add react-datetimepicker-syaku
```

## Setting

```js
import DatetimePicker, { parseDate, formatDate, formatDateString, setLocale } from 'react-datetimepicker-syaku';

// flatpickr theme setting (Optional)
import 'flatpickr/dist/flatpickr.min.css';

// locale setting (Optional)
import locale from 'flatpickr/dist/l10n/ko';
setLocale(locale.ko);

// bootstrap & fontawesome (Optional)
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
```

- formatDateString : flatpickr dateObj to string
- parseDate : Flatpickr.parseDate(dateStr, dateFormat)
- formatDate : Flatpickr.formatDate(dateObj, formatStr)
- setLocale : Flatpickr.localize(locale)

## CDN

```html
<script src="./dist/react-datetimepicker.min.js"></script>
```

### DatetimePicker options

```
children: undefined, // custom ui
readOnly: false, // input readOnly
type: 'date', // input type date, datetime, time
```

### flatpickr options

https://chmln.github.io/flatpickr/options/

```
// type 을 사용할 경우 아래의 옵션은 내부적으로 사용되기 때문에 변경할 수 없다.
wrap: false,
inline: false,
clickOpens: false,
allowInput: false,
```