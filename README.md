# React Datetime Picker

날짜와 시간을 선택할 수 있는 라이브러리 flatpickr 를 React 에서 사용할 수 있게 개발되었습니다.

UI 는 Bootstrap 을 사용했으며 필수는 아닙니다. 직접 UI 를 고칠 수 있습니다.

크롬, 파이어폭스, 사파리 그리고 IE 11 이상에서 테스트되었습니다.

flatpickr 의 기능을 모두 사용할 수 있습니다.

사용하기 전에 아래의 데모 소스 와 실행 화면을 확인 하시기 바랍니다.

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

모든 날짜 데이터는 date type 이여야 한다. `parseDate` 를 이용하여 날짜 형식으로 생성할 수 있다.

```
// ui 를 직접 만들때 사용한다.
children: PropTypes.node,
// <input> readOnly
readOnly: false,
// input type date, datetime, time
type: 'date',
// ui 를 직접 만들때 감쌓기 위한 nodeName
wrapper: 'div',
className: PropTypes.string,
style: PropTypes.shape({}),

// button icon className
iconSuccess: PropTypes.string,
iconClear: PropTypes.string,
iconOpen: PropTypes.string,

// only mode single
startDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
endDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),

// 기본값으로 사용할 수 있다. 한번만 설정된다.
defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
// 선택한 날짜를 지울때 기본 값을 사용할지 여부
isDefaultValue: false,
```

### startDate & endDate

`mode='single'` 에서만 사용할 수 있는 기능으로 두개의 날짜 선택기를 서로 비교하며 자동으로 날짜를 설정 및 일자 선택을 차단할 수 있다.

즉 `startDate =  시작일` 은 `endDate = 종료일` 보다 이후 날짜를 선택할 수 없고 종료일은 반대로 선택할 수 없다. 두개가 같은 날짜인 경우 시작일은 모든 날짜를 선택할 수 있다.

시작일은 있고 종료일이 없으면 시작일을 종료일에 대처한다. 반대로 종료일은 시작일에 대처된다.

종료일이 시작일보단 이전이면 종료일은 제거된다. 시작일도 마찬가지다.

### defaultDate & defaultValue

둘 옵션 중 한개만 사용하면 된다. `defaultDate` 는 항상 변하는 날짜로 `state` 에 설정된 값으로 사용하면 되고 `defaultValue` 는 한번만 설정되는 날짜로 직접 날짜를 설정하면 된다.

둘다 사용할 경우 `isDefaultValue=true` 설정하고 선택 날짜를 `clear` 버튼으로 제거할때 기본 날짜를 `defaultValue` 로 설정할 수 있다.

### flatpickr options

https://chmln.github.io/flatpickr/options/

```
// type 을 사용할 경우 아래의 옵션은 내부적으로 사용되기 때문에 변경할 수 없다.
wrap: false,
inline: false,
clickOpens: false,
allowInput: false,
```