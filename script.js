const selectTag = document.querySelectorAll('select');
const translateBtn = document.querySelector('button');
const exchangeIcon = document.querySelector('.exchange');
const icons = document.querySelectorAll('.row i')
const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');

const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // console.log(countries[country_code])
        // selecting the deffault languages
        let selected;
        if (id == 0 && country_code == 'en-GB') {
            selected = 'selected';
        }
        else if (id == 1 && country_code == 'tr-TR') {
            selected = 'selected';
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option); // adding options tag inside select tag
    }
});

exchangeIcon.addEventListener('click', () => {
    // exchanging textarea and selecttag values
    let tempText = fromText.value;
    tempoLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempoLang;
})

translateBtn.addEventListener('click', () => {
    let text = fromText.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute('placeholder', 'Translating...');
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // console.log(text, translateFrom, translateTo);

    // here we fetch the api response and return it with parsing into js obj and with another then method receive that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute('placeholder', 'Translation');
    }).catch(error => {
        fromText.innerText = `Something went wrong`;
    })
});

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        if (target.classList.contains('fa-copy')) {
            // if clicked icon has from id, copy fromTextarea valur else copy toTextarea value
            if (target.id == 'from') {
                navigator.clipboard.writeText(fromText.value);
            }
            else {
                navigator.clipboard.writeText(toText.value);
            }
        }
        else {
            let utterance;
            // if clicked icon has from id, speak fromTextarea else speak toTextarea
            if (target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // set utterance language to fromSelect tag value
            }
            else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // set utterance language to toSelect tag value
            }
            speechSynthesis.speak(utterance); // speak the passed uterance
        }
    })
})
