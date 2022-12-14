// ==UserScript==
// @name         New ES6-Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @match        https://www.geoguessr.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geoguessr.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js
// @require      https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore-compat.js
// @require      https://www.gstatic.com/firebasejs/9.10.0/firebase-auth-compat.js
// @match        <$URL$>
// @icon         <$ICON$>
// ==/UserScript==

var inline_src = (<><![CDATA[

const firebaseConfig = {
    //config
  };

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();
firebase.auth().signInWithEmailAndPassword("Email", "Password").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});

const app = firebase.initializeApp(firebaseConfig);
let API_Key = '';
const ERROR_RESP = -1000000;
let csvGuesses = "data:text/csv;charset=utf-8,";

const storeCSV = 0;
let enableDB = true;

var CountryDict = {
    AF: 'AF',
    AX: 'FI', // Aland Islands
    AL: 'AL',
    DZ: 'DZ',
    AS: 'US', // American Samoa
    AD: 'AD',
    AO: 'AO',
    AI: 'GB', // Anguilla
    AQ: 'AQ', // Antarctica
    AG: 'AG',
    AR: 'AR',
    AM: 'AM',
    AW: 'NL', // Aruba
    AU: 'AU',
    AT: 'AT',
    AZ: 'AZ',
    BS: 'BS',
    BH: 'BH',
    BD: 'BD',
    BB: 'BB',
    BY: 'BY',
    BE: 'BE',
    BZ: 'BZ',
    BJ: 'BJ',
    BM: 'GB', // Bermuda
    BT: 'BT',
    BO: 'BO',
    BQ: 'NL', // Bonaire, Sint Eustatius, Saba
    BA: 'BA',
    BW: 'BW',
    BV: 'NO', // Bouvet Island
    BR: 'BR',
    IO: 'GB', // British Indian Ocean Territory
    BN: 'BN',
    BG: 'BG',
    BF: 'BF',
    BI: 'BI',
    KH: 'KH',
    CM: 'CM',
    CA: 'CA',
    CV: 'CV',
    KY: 'UK', // Cayman Islands
    CF: 'CF',
    TD: 'TD',
    CL: 'CL',
    CN: 'CN',
    CX: 'AU', // Christmas Islands
    CC: 'AU', // Cocos (Keeling) Islands
    CO: 'CO',
    KM: 'KM',
    CG: 'CG',
    CD: 'CD',
    CK: 'NZ', // Cook Islands
    CR: 'CR',
    CI: 'CI',
    HR: 'HR',
    CU: 'CU',
    CW: 'NL', // Curacao
    CY: 'CY',
    CZ: 'CZ',
    DK: 'DK',
    DJ: 'DJ',
    DM: 'DM',
    DO: 'DO',
    EC: 'EC',
    EG: 'EG',
    SV: 'SV',
    GQ: 'GQ',
    ER: 'ER',
    EE: 'EE',
    ET: 'ET',
    FK: 'GB', // Falkland Islands
    FO: 'DK', // Faroe Islands
    FJ: 'FJ',
    FI: 'FI',
    FR: 'FR',
    GF: 'FR', // French Guiana
    PF: 'FR', // French Polynesia
    TF: 'FR', // French Southern Territories
    GA: 'GA',
    GM: 'GM',
    GE: 'GE',
    DE: 'DE',
    GH: 'GH',
    GI: 'UK', // Gibraltar
    GR: 'GR',
    GL: 'DK', // Greenland
    GD: 'GD',
    GP: 'FR', // Guadeloupe
    GU: 'US', // Guam
    GT: 'GT',
    GG: 'GB', // Guernsey
    GN: 'GN',
    GW: 'GW',
    GY: 'GY',
    HT: 'HT',
    HM: 'AU', // Heard Island and McDonald Islands
    VA: 'VA',
    HN: 'HN',
    HK: 'CN', // Hong Kong
    HU: 'HU',
    IS: 'IS',
    IN: 'IN',
    ID: 'ID',
    IR: 'IR',
    IQ: 'IQ',
    IE: 'IE',
    IM: 'GB', // Isle of Man
    IL: 'IL',
    IT: 'IT',
    JM: 'JM',
    JP: 'JP',
    JE: 'GB', // Jersey
    JO: 'JO',
    KZ: 'KZ',
    KE: 'KE',
    KI: 'KI',
    KR: 'KR',
    KW: 'KW',
    KG: 'KG',
    LA: 'LA',
    LV: 'LV',
    LB: 'LB',
    LS: 'LS',
    LR: 'LR',
    LY: 'LY',
    LI: 'LI',
    LT: 'LT',
    LU: 'LU',
    MO: 'CN', // Macao
    MK: 'MK',
    MG: 'MG',
    MW: 'MW',
    MY: 'MY',
    MV: 'MV',
    ML: 'ML',
    MT: 'MT',
    MH: 'MH',
    MQ: 'FR', // Martinique
    MR: 'MR',
    MU: 'MU',
    YT: 'FR', // Mayotte
    MX: 'MX',
    FM: 'FM',
    MD: 'MD',
    MC: 'MC',
    MN: 'MN',
    ME: 'ME',
    MS: 'GB', // Montserrat
    MA: 'MA',
    MZ: 'MZ',
    MM: 'MM',
    NA: 'NA',
    NR: 'NR',
    NP: 'NP',
    NL: 'NL',
    AN: 'NL', // Netherlands Antilles
    NC: 'FR', // New Caledonia
    NZ: 'NZ',
    NI: 'NI',
    NE: 'NE',
    NG: 'NG',
    NU: 'NZ', // Niue
    NF: 'AU', // Norfolk Island
    MP: 'US', // Northern Mariana Islands
    NO: 'NO',
    OM: 'OM',
    PK: 'PK',
    PW: 'PW',
    PS: 'IL', // Palestine
    PA: 'PA',
    PG: 'PG',
    PY: 'PY',
    PE: 'PE',
    PH: 'PH',
    PN: 'GB', // Pitcairn
    PL: 'PL',
    PT: 'PT',
    PR: 'US', // Puerto Rico
    QA: 'QA',
    RE: 'FR', // Reunion
    RO: 'RO',
    RU: 'RU',
    RW: 'RW',
    BL: 'FR', // Saint Barthelemy
    SH: 'GB', // Saint Helena
    KN: 'KN',
    LC: 'LC',
    MF: 'FR', // Saint Martin
    PM: 'FR', // Saint Pierre and Miquelon
    VC: 'VC',
    WS: 'WS',
    SM: 'SM',
    ST: 'ST',
    SA: 'SA',
    SN: 'SN',
    RS: 'RS',
    SC: 'SC',
    SL: 'SL',
    SG: 'SG',
    SX: 'NL', // Sint Maarten
    SK: 'SK',
    SI: 'SI',
    SB: 'SB',
    SO: 'SO',
    ZA: 'ZA',
    GS: 'GB', // South Georgia and the South Sandwich Islands
    ES: 'ES',
    LK: 'LK',
    SD: 'SD',
    SR: 'SR',
    SJ: 'NO', // Svalbard and Jan Mayen
    SZ: 'SZ',
    SE: 'SE',
    CH: 'CH',
    SY: 'SY',
    TW: 'TW', // Taiwan
    TJ: 'TJ',
    TZ: 'TZ',
    TH: 'TH',
    TL: 'TL',
    TG: 'TG',
    TK: 'NZ', // Tokelau
    TO: 'TO',
    TT: 'TT',
    TN: 'TN',
    TR: 'TR',
    TM: 'TM',
    TC: 'GB', // Turcs and Caicos Islands
    TV: 'TV',
    UG: 'UG',
    UA: 'UA',
    AE: 'AE',
    GB: 'GB',
    US: 'US',
    UM: 'US', // US Minor Outlying Islands
    UY: 'UY',
    UZ: 'UZ',
    VU: 'VU',
    VE: 'VE',
    VN: 'VN',
    VG: 'GB', // British Virgin Islands
    VI: 'US', // US Virgin Islands
    WF: 'FR', // Wallis and Futuna
    EH: 'MA', // Western Sahara
    YE: 'YE',
    ZM: 'ZM',
    ZW: 'ZW'
};

function togDB()
{
    enableDB = !enableDB;
};

document.togDB = togDB;

let guiEnabled = true;

const guiHTML = `
<div class="section_sectionHeader__WQ7Xz section_sizeMedium__yPqLK"><div class="bars_root___G89E bars_center__vAqnw"><div class="bars_before__xAA7R bars_lengthLong__XyWLx"></div><span class="bars_content__UVGlL"><h3>Firebase Database</h3></span><div class="bars_after__Z1Rxt bars_lengthLong__XyWLx"></div></div></div>
<div class="start-standard-game_settings__x94PU">
  <div style="display: flex; justify-content: space-around;">
    <div style="display: flex; align-items: center;">
      <span class="game-options_optionLabel__dJ_Cy" style="margin: 0; padding-right: 6px;">Record to DB</span>
      <input type="checkbox" id="toggleDB" onclick="togDB()" class="toggle_toggle__hwnyw" checked>
    </div>
  </div>
</div>
</div>
`

const checkInsertGui = () => {
    if ((document.querySelector('.copy-link_root__dBcXL') || document.querySelector('.radio-box_root__ka_9S')) && document.getElementById('toggleDB') === null && document.querySelector('.section_sectionMedium__yXgE6')) {
        document.querySelector('.section_sectionMedium__yXgE6').insertAdjacentHTML('beforeend', guiHTML);
        if (enableDB)
        {
            document.getElementById('toggleDB').checked = true;
        }
        else
        {
            document.getElementById('toggleDB').checked = false;
        }
    }
}

let observerNew = new MutationObserver((mutations) => {
    if (guiEnabled) {
        checkInsertGui();
    }
});

observerNew.observe(document.body, {
    characterDataOldValue: false,
    subtree: true,
    childList: true,
    characterData: false
});

function checkGameMode() {
    return (location.pathname.startsWith("/game/") || (location.pathname.startsWith("/challenge/")));
};

async function getCoords() {
	const game_tag = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    let api_url = ""
    if (location.pathname.startsWith("/game/")) {
        api_url = "https://www.geoguessr.com/api/v3/games/"+game_tag;
    } else if (location.pathname.startsWith("/challenge/")) {
        api_url = "https://www.geoguessr.com/api/v3/challenges/"+game_tag+"/game";
    };
    var ret = await fetch(api_url)
        .then(res => res.json())
        .then((out) => {
        let guess_counter = out.player.guesses.length;
        let guess = [out.player.guesses[guess_counter-1].lat,out.player.guesses[guess_counter-1].lng];
        let ans = [out.rounds[guess_counter-1].lat,out.rounds[guess_counter-1].lng];
        let round = [guess,ans];
        return round;
    }).catch(err => { throw err });
    return ret;
};

async function getCountryCode(coords) {
    if (coords[0] <= -85.05) {
        return 'AQ';
    };
    let api = "https://api.bigdatacloud.net/data/reverse-geocode?latitude="+coords[0]+"&longitude="+coords[1]+"&localityLanguage=en&key="+API_Key
    let response = await fetch(api)
        .then(res => (res.status !== 200) ? ERROR_RESP : res.json())
        .then(out => (out === ERROR_RESP) ? ERROR_RESP : CountryDict[out.countryCode]);
    return response;
};

function addToCSV(output){
    if (!output.includes(undefined)){
        csvGuesses += output + "\r\n";
    };
};

async function tryAddGuess() {
	if (!checkGameMode()) {
		return;
	};
	
    let prev = sessionStorage.getItem('prevCoords');
	var round = await getCoords(); 
    if (prev == round || round == null){
        round = await getCoords();
    }
    if (prev != round){
        let guess = [round[0][0],round[0][1]];
        let ans = [round[1][0],round[1][1]];
        getCountryCode(guess) 
            .then(guessCode => {
            getCountryCode(ans)
                .then(ansCode => {
                const info = document.getElementsByClassName("status_value__xZMNY");
                let map = info[0].innerHTML;
                
                const info2 = document.getElementsByClassName('round-result_score__LJRS1');
                let points = info2[0].innerHTML.replace(',','');
                points = points.replace(' points','');
                
                let output = [map,ansCode,guess,guessCode,points]; 
                console.log(output);
                sessionStorage.setItem('prevCoords', round);
                //addToCSV(output);
                addDB(output);
            });
        });
    }
};

function writeUserData(map,cC,gCoords,gC,points) {
    console.log(app);
    const db = app.firestore();
    const docRef = db.collection("guesses");
    docRef.add({
        Map: map,
        CorrectCountry: cC,
        GuessesCoords: gCoords,
        GuessedCountry: gC,
        Score: points
    })
        .then(() => {
        console.log("Document successfully written!");
    })
        .catch((error) => {
        console.error("Error writing document: ", error);
    });
};

function addDB(output){
    writeUserData(output[0],output[1],output[2],output[3],output[4]);
};


function outputCSV(){
    if (csvGuesses){
        var encodedUri = encodeURI(csvGuesses);
        window.open(encodedUri);
    };
};

if (sessionStorage.getItem("prevCoords") == null) {
    sessionStorage.setItem('prevCoords',[[0,0],[0,0]]);
};

document.addEventListener('keyup', (e) => { if (e.key === " ") { tryAddGuess(); } });
document.addEventListener('keypress', (e) => { if (e.key === '6') { outputCSV(); } });
//document.addEventListener('keypress', (e) => { if (e.key === '8') { addDB(); } });

]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);