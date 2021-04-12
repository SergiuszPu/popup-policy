'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// variables
var setVendorName = document.querySelector('.name');
var setPolicyLink = document.querySelector('.link');
var setCheckbox = document.querySelector('.check');
var modal = document.getElementById('modal');
var acceptBtn = document.getElementById('accept');
var header = document.getElementById('header');
// data variables
var policyData = [];
var checkedInputData = [];
//download vendors for cookies policy
function fetchVendorsPolicy() {
    return __awaiter(this, void 0, void 0, function () {
        var text, data, vendors, vendor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json')];
                case 1:
                    text = _a.sent();
                    return [4 /*yield*/, text.json()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, data.vendors];
                case 3:
                    vendors = _a.sent();
                    for (vendor in vendors) {
                        policyData.push({ name: vendors[vendor].name, url: vendors[vendor].policyUrl });
                    }
                    setPopupData(policyData);
                    return [2 /*return*/];
            }
        });
    });
}
// set data into the modal popup (name, link url, checkbox)
function setPopupData(vendors) {
    if (vendors === void 0) { vendors = []; }
    for (var _i = 0, vendors_1 = vendors; _i < vendors_1.length; _i++) {
        var vendor = vendors_1[_i];
        var addName = document.createElement('div');
        addName.innerHTML = vendor.name + " (<a href=\"" + vendor.url + "\" target=\"blank\">Policy</a>)";
        setVendorName === null || setVendorName === void 0 ? void 0 : setVendorName.appendChild(addName);
        var addCheckbox = document.createElement('input');
        addCheckbox.setAttribute("type", "checkbox");
        addCheckbox.setAttribute("id", vendor.name);
        setCheckbox === null || setCheckbox === void 0 ? void 0 : setCheckbox.appendChild(addCheckbox);
    }
}
fetchVendorsPolicy();
// checked all checkbox input with one is checked
function checkedVendorsInput() {
    var inputs = document.querySelectorAll('input');
    for (var input in inputs) {
        if (inputs[input].checked) {
            checkedInputData.push(inputs[input].id);
        }
    }
}
//get and set data for cookie 
var cookieStorage = {
    getItem: function (key) {
        var cookies = document.cookie
            .split(';')
            .map(function (cookie) { return cookie.split('='); })
            .reduce(function (acc, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            return (__assign(__assign({}, acc), (_b = {}, _b[key.trim()] = value, _b)));
        }, []);
        return cookies[key];
    },
    setItem: function (key, value) {
        checkedVendorsInput();
        var date = new Date();
        date.setTime(date.getTime() + (86400000));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = key + "=" + value + " " + expires;
    },
};
var storageType = cookieStorage;
var consentPropertyName = checkedInputData;
// check and save data on the cookie file
var shouldShowPopup = function () { return !storageType.getItem(consentPropertyName); };
var saveToStorage = function () { return storageType.setItem(consentPropertyName, true); };
// when all data on page is loaded open the modal witch policy
window.onload = function () {
    var acceptFn = function () {
        saveToStorage();
        modal === null || modal === void 0 ? void 0 : modal.classList.add('hidden');
        header === null || header === void 0 ? void 0 : header.classList.remove('blur');
    };
    acceptBtn === null || acceptBtn === void 0 ? void 0 : acceptBtn.addEventListener('click', acceptFn);
    if (shouldShowPopup()) {
        modal === null || modal === void 0 ? void 0 : modal.classList.remove('hidden');
        header === null || header === void 0 ? void 0 : header.classList.add('blur');
    }
};
