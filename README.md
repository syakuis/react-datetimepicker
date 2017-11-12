# React Datetime Picker

날짜와 시간을 선택할 수 있는 라이브러리 flatpickr 를 이용하여 React 에서 사용할 수 있게 수정하였습니다.

크롬, 파이어폭스, 사파리 그리고 IE 11 이상에서 테스트되었습니다.

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/xGZD4L0ne_E/0.jpg)](https://youtu.be/xGZD4L0ne_E)

## install

```
// required
$ npm install flatpickr moment

// optional
$ npm install bootstrap font-awesome

$ npm install react-datetimepicker-syaku

or

$ yarn add react-datetimepicker-syaku
```

## Setting

기본 css style 라이브러리는 Bootstrap 과 Fontawesome 을 사용합니다. 직접 변경도 가능합니다.

```
import DatetimePicker from 'react-datetimepicker-syaku';

// flatpickr theme setting (Optional)
import 'flatpickr/dist/flatpickr.min.css';

// locale setting (Optional)
import locale from 'flatpickr/dist/l10n/ko';
DatetimePicker.setLocale(locale.ko, 'ko');

// bootstrap & fontawesome (Optional)
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

onDatetime(datetime, value, stateName) {
  console.log(datetime, value, stateName);
}

<DatetimePicker
  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'value')}
/>

or

<DatetimePicker
  ref={(node) => { this.datetimeRef = node; }}
  onDatetime={(datetime, value) => this.onDatetime(datetime, value, 'custom')}
>
  <button className="btn btn-secondary" type="button" onClick={this.onOpen}>
    삭제
  </button>
</DatetimePicker>
```

자세한 정보는 `src/demo/DemoContainer.js` 참고하세요.


### DatetimePicker method

```
static setLocale(Locale: Flatpickr.Locale, locale: String) : locale

onOpen() : Flatpickr.toggle()
onClear() : Flatpickr.clear()
setDatetime(value: String, triggerChange = true) : Flatpickr.setDate()
```

### DatetimePicker options

```
children: undefined, // custom ui
onDatetime: undefined, // callback func
readOnly: false, // input readOnly
type: 'date', // input type date, datetime, time
stringFormat: 'YYYYMMDD', // key input date format
```

### flatpickr options

https://chmln.github.io/flatpickr/options/

```
// 아래의 옵션은 내부적으로 사용되기 때문에 변경할 수 없다.
wrap: false,
inline: false,
clickOpens: false,
allowInput: false,
parseDate: (date) => {
  const d = moment(date, this.type.stringFormat);
  return d.isValid() ? d.toDate() : null;
},
onChange: this.onChangeCallback,
```