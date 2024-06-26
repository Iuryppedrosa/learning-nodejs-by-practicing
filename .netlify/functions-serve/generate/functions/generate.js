var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/qr-image/lib/encode.js
var require_encode = __commonJS({
  "node_modules/qr-image/lib/encode.js"(exports2, module2) {
    "use strict";
    function pushBits(arr, n, value) {
      for (var bit = 1 << n - 1; bit; bit = bit >>> 1) {
        arr.push(bit & value ? 1 : 0);
      }
    }
    function encode_8bit(data) {
      var len = data.length;
      var bits = [];
      for (var i = 0; i < len; i++) {
        pushBits(bits, 8, data[i]);
      }
      var res = {};
      var d = [0, 1, 0, 0];
      pushBits(d, 16, len);
      res.data10 = res.data27 = d.concat(bits);
      if (len < 256) {
        var d = [0, 1, 0, 0];
        pushBits(d, 8, len);
        res.data1 = d.concat(bits);
      }
      return res;
    }
    var ALPHANUM = function(s) {
      var res = {};
      for (var i = 0; i < s.length; i++) {
        res[s[i]] = i;
      }
      return res;
    }("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:");
    function encode_alphanum(str) {
      var len = str.length;
      var bits = [];
      for (var i = 0; i < len; i += 2) {
        var b = 6;
        var n = ALPHANUM[str[i]];
        if (str[i + 1]) {
          b = 11;
          n = n * 45 + ALPHANUM[str[i + 1]];
        }
        pushBits(bits, b, n);
      }
      var res = {};
      var d = [0, 0, 1, 0];
      pushBits(d, 13, len);
      res.data27 = d.concat(bits);
      if (len < 2048) {
        var d = [0, 0, 1, 0];
        pushBits(d, 11, len);
        res.data10 = d.concat(bits);
      }
      if (len < 512) {
        var d = [0, 0, 1, 0];
        pushBits(d, 9, len);
        res.data1 = d.concat(bits);
      }
      return res;
    }
    function encode_numeric(str) {
      var len = str.length;
      var bits = [];
      for (var i = 0; i < len; i += 3) {
        var s = str.substr(i, 3);
        var b = Math.ceil(s.length * 10 / 3);
        pushBits(bits, b, parseInt(s, 10));
      }
      var res = {};
      var d = [0, 0, 0, 1];
      pushBits(d, 14, len);
      res.data27 = d.concat(bits);
      if (len < 4096) {
        var d = [0, 0, 0, 1];
        pushBits(d, 12, len);
        res.data10 = d.concat(bits);
      }
      if (len < 1024) {
        var d = [0, 0, 0, 1];
        pushBits(d, 10, len);
        res.data1 = d.concat(bits);
      }
      return res;
    }
    function encode_url(str) {
      var slash = str.indexOf("/", 8) + 1 || str.length;
      var res = encode(str.slice(0, slash).toUpperCase(), false);
      if (slash >= str.length) {
        return res;
      }
      var path_res = encode(str.slice(slash), false);
      res.data27 = res.data27.concat(path_res.data27);
      if (res.data10 && path_res.data10) {
        res.data10 = res.data10.concat(path_res.data10);
      }
      if (res.data1 && path_res.data1) {
        res.data1 = res.data1.concat(path_res.data1);
      }
      return res;
    }
    function encode(data, parse_url) {
      var str;
      var t = typeof data;
      if (t == "string" || t == "number") {
        str = "" + data;
        data = new Buffer(str);
      } else if (Buffer.isBuffer(data)) {
        str = data.toString();
      } else if (Array.isArray(data)) {
        data = new Buffer(data);
        str = data.toString();
      } else {
        throw new Error("Bad data");
      }
      if (/^[0-9]+$/.test(str)) {
        if (data.length > 7089) {
          throw new Error("Too much data");
        }
        return encode_numeric(str);
      }
      if (/^[0-9A-Z \$%\*\+\.\/\:\-]+$/.test(str)) {
        if (data.length > 4296) {
          throw new Error("Too much data");
        }
        return encode_alphanum(str);
      }
      if (parse_url && /^https?:/i.test(str)) {
        return encode_url(str);
      }
      if (data.length > 2953) {
        throw new Error("Too much data");
      }
      return encode_8bit(data);
    }
    module2.exports = encode;
  }
});

// node_modules/qr-image/lib/errorcode.js
var require_errorcode = __commonJS({
  "node_modules/qr-image/lib/errorcode.js"(exports2, module2) {
    "use strict";
    var GF256_BASE = 285;
    var EXP_TABLE = [1];
    var LOG_TABLE = [];
    for (i = 1; i < 256; i++) {
      n = EXP_TABLE[i - 1] << 1;
      if (n > 255)
        n = n ^ GF256_BASE;
      EXP_TABLE[i] = n;
    }
    var n;
    var i;
    for (i = 0; i < 255; i++) {
      LOG_TABLE[EXP_TABLE[i]] = i;
    }
    var i;
    function exp(k) {
      while (k < 0)
        k += 255;
      while (k > 255)
        k -= 255;
      return EXP_TABLE[k];
    }
    function log(k) {
      if (k < 1 || k > 255) {
        throw Error("Bad log(" + k + ")");
      }
      return LOG_TABLE[k];
    }
    var POLYNOMIALS = [
      [0],
      // a^0 x^0
      [0, 0],
      // a^0 x^1 + a^0 x^0
      [0, 25, 1]
      // a^0 x^2 + a^25 x^1 + a^1 x^0
      // and so on...
    ];
    function generatorPolynomial(num) {
      if (POLYNOMIALS[num]) {
        return POLYNOMIALS[num];
      }
      var prev = generatorPolynomial(num - 1);
      var res = [];
      res[0] = prev[0];
      for (var i2 = 1; i2 <= num; i2++) {
        res[i2] = log(exp(prev[i2]) ^ exp(prev[i2 - 1] + num - 1));
      }
      POLYNOMIALS[num] = res;
      return res;
    }
    module2.exports = function calculate_ec(msg, ec_len) {
      msg = [].slice.call(msg);
      var poly = generatorPolynomial(ec_len);
      for (var i2 = 0; i2 < ec_len; i2++)
        msg.push(0);
      while (msg.length > ec_len) {
        if (!msg[0]) {
          msg.shift();
          continue;
        }
        var log_k = log(msg[0]);
        for (var i2 = 0; i2 <= ec_len; i2++) {
          msg[i2] = msg[i2] ^ exp(poly[i2] + log_k);
        }
        msg.shift();
      }
      return new Buffer(msg);
    };
  }
});

// node_modules/qr-image/lib/matrix.js
var require_matrix = __commonJS({
  "node_modules/qr-image/lib/matrix.js"(exports2, module2) {
    "use strict";
    function init(version) {
      var N = version * 4 + 17;
      var matrix = [];
      var zeros = new Buffer(N);
      zeros.fill(0);
      zeros = [].slice.call(zeros);
      for (var i = 0; i < N; i++) {
        matrix[i] = zeros.slice();
      }
      return matrix;
    }
    function fillFinders(matrix) {
      var N = matrix.length;
      for (var i = -3; i <= 3; i++) {
        for (var j = -3; j <= 3; j++) {
          var max = Math.max(i, j);
          var min = Math.min(i, j);
          var pixel = max == 2 && min >= -2 || min == -2 && max <= 2 ? 128 : 129;
          matrix[3 + i][3 + j] = pixel;
          matrix[3 + i][N - 4 + j] = pixel;
          matrix[N - 4 + i][3 + j] = pixel;
        }
      }
      for (var i = 0; i < 8; i++) {
        matrix[7][i] = matrix[i][7] = matrix[7][N - i - 1] = matrix[i][N - 8] = matrix[N - 8][i] = matrix[N - 1 - i][7] = 128;
      }
    }
    function fillAlignAndTiming(matrix) {
      var N = matrix.length;
      if (N > 21) {
        var len = N - 13;
        var delta = Math.round(len / Math.ceil(len / 28));
        if (delta % 2)
          delta++;
        var res = [];
        for (var p = len + 6; p > 10; p -= delta) {
          res.unshift(p);
        }
        res.unshift(6);
        for (var i = 0; i < res.length; i++) {
          for (var j = 0; j < res.length; j++) {
            var x = res[i], y = res[j];
            if (matrix[x][y])
              continue;
            for (var r = -2; r <= 2; r++) {
              for (var c = -2; c <= 2; c++) {
                var max = Math.max(r, c);
                var min = Math.min(r, c);
                var pixel = max == 1 && min >= -1 || min == -1 && max <= 1 ? 128 : 129;
                matrix[x + r][y + c] = pixel;
              }
            }
          }
        }
      }
      for (var i = 8; i < N - 8; i++) {
        matrix[6][i] = matrix[i][6] = i % 2 ? 128 : 129;
      }
    }
    function fillStub(matrix) {
      var N = matrix.length;
      for (var i = 0; i < 8; i++) {
        if (i != 6) {
          matrix[8][i] = matrix[i][8] = 128;
        }
        matrix[8][N - 1 - i] = 128;
        matrix[N - 1 - i][8] = 128;
      }
      matrix[8][8] = 128;
      matrix[N - 8][8] = 129;
      if (N < 45)
        return;
      for (var i = N - 11; i < N - 8; i++) {
        for (var j = 0; j < 6; j++) {
          matrix[i][j] = matrix[j][i] = 128;
        }
      }
    }
    var fillReserved = function() {
      var FORMATS = Array(32);
      var VERSIONS = Array(40);
      var gf15 = 1335;
      var gf18 = 7973;
      var formats_mask = 21522;
      for (var format = 0; format < 32; format++) {
        var res = format << 10;
        for (var i = 5; i > 0; i--) {
          if (res >>> 9 + i) {
            res = res ^ gf15 << i - 1;
          }
        }
        FORMATS[format] = (res | format << 10) ^ formats_mask;
      }
      for (var version = 7; version <= 40; version++) {
        var res = version << 12;
        for (var i = 6; i > 0; i--) {
          if (res >>> 11 + i) {
            res = res ^ gf18 << i - 1;
          }
        }
        VERSIONS[version] = res | version << 12;
      }
      var EC_LEVELS = { L: 1, M: 0, Q: 3, H: 2 };
      return function fillReserved2(matrix, ec_level, mask) {
        var N = matrix.length;
        var format2 = FORMATS[EC_LEVELS[ec_level] << 3 | mask];
        function F(k) {
          return format2 >> k & 1 ? 129 : 128;
        }
        ;
        for (var i2 = 0; i2 < 8; i2++) {
          matrix[8][N - 1 - i2] = F(i2);
          if (i2 < 6)
            matrix[i2][8] = F(i2);
        }
        for (var i2 = 8; i2 < 15; i2++) {
          matrix[N - 15 + i2][8] = F(i2);
          if (i2 > 8)
            matrix[8][14 - i2] = F(i2);
        }
        matrix[7][8] = F(6);
        matrix[8][8] = F(7);
        matrix[8][7] = F(8);
        var version2 = VERSIONS[(N - 17) / 4];
        if (!version2)
          return;
        function V(k) {
          return version2 >> k & 1 ? 129 : 128;
        }
        ;
        for (var i2 = 0; i2 < 6; i2++) {
          for (var j = 0; j < 3; j++) {
            matrix[N - 11 + j][i2] = matrix[i2][N - 11 + j] = V(i2 * 3 + j);
          }
        }
      };
    }();
    var fillData = /* @__PURE__ */ function() {
      var MASK_FUNCTIONS = [
        function(i, j) {
          return (i + j) % 2 == 0;
        },
        function(i, j) {
          return i % 2 == 0;
        },
        function(i, j) {
          return j % 3 == 0;
        },
        function(i, j) {
          return (i + j) % 3 == 0;
        },
        function(i, j) {
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        },
        function(i, j) {
          return i * j % 2 + i * j % 3 == 0;
        },
        function(i, j) {
          return (i * j % 2 + i * j % 3) % 2 == 0;
        },
        function(i, j) {
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        }
      ];
      return function fillData2(matrix, data, mask) {
        var N = matrix.length;
        var row, col, dir = -1;
        row = col = N - 1;
        var mask_fn = MASK_FUNCTIONS[mask];
        var len = data.blocks[data.blocks.length - 1].length;
        for (var i = 0; i < len; i++) {
          for (var b = 0; b < data.blocks.length; b++) {
            if (data.blocks[b].length <= i)
              continue;
            put(data.blocks[b][i]);
          }
        }
        len = data.ec_len;
        for (var i = 0; i < len; i++) {
          for (var b = 0; b < data.ec.length; b++) {
            put(data.ec[b][i]);
          }
        }
        if (col > -1) {
          do {
            matrix[row][col] = mask_fn(row, col) ? 1 : 0;
          } while (next());
        }
        function put(byte) {
          for (var mask2 = 128; mask2; mask2 = mask2 >> 1) {
            var pixel = !!(mask2 & byte);
            if (mask_fn(row, col))
              pixel = !pixel;
            matrix[row][col] = pixel ? 1 : 0;
            next();
          }
        }
        function next() {
          do {
            if (col % 2 ^ col < 6) {
              if (dir < 0 && row == 0 || dir > 0 && row == N - 1) {
                col--;
                dir = -dir;
              } else {
                col++;
                row += dir;
              }
            } else {
              col--;
            }
            if (col == 6) {
              col--;
            }
            if (col < 0) {
              return false;
            }
          } while (matrix[row][col] & 240);
          return true;
        }
      };
    }();
    function calculatePenalty(matrix) {
      var N = matrix.length;
      var penalty = 0;
      for (var i = 0; i < N; i++) {
        var pixel = matrix[i][0] & 1;
        var len = 1;
        for (var j = 1; j < N; j++) {
          var p = matrix[i][j] & 1;
          if (p == pixel) {
            len++;
            continue;
          }
          if (len >= 5) {
            penalty += len - 2;
          }
          pixel = p;
          len = 1;
        }
        if (len >= 5) {
          penalty += len - 2;
        }
      }
      for (var j = 0; j < N; j++) {
        var pixel = matrix[0][j] & 1;
        var len = 1;
        for (var i = 1; i < N; i++) {
          var p = matrix[i][j] & 1;
          if (p == pixel) {
            len++;
            continue;
          }
          if (len >= 5) {
            penalty += len - 2;
          }
          pixel = p;
          len = 1;
        }
        if (len >= 5) {
          penalty += len - 2;
        }
      }
      for (var i = 0; i < N - 1; i++) {
        for (var j = 0; j < N - 1; j++) {
          var s = matrix[i][j] + matrix[i][j + 1] + matrix[i + 1][j] + matrix[i + 1][j + 1] & 7;
          if (s == 0 || s == 4) {
            penalty += 3;
          }
        }
      }
      function I(k) {
        return matrix[i][j + k] & 1;
      }
      ;
      function J(k) {
        return matrix[i + k][j] & 1;
      }
      ;
      for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
          if (j < N - 6 && I(0) && !I(1) && I(2) && I(3) && I(4) && !I(5) && I(6)) {
            if (j >= 4 && !(I(-4) || I(-3) || I(-2) || I(-1))) {
              penalty += 40;
            }
            if (j < N - 10 && !(I(7) || I(8) || I(9) || I(10))) {
              penalty += 40;
            }
          }
          if (i < N - 6 && J(0) && !J(1) && J(2) && J(3) && J(4) && !J(5) && J(6)) {
            if (i >= 4 && !(J(-4) || J(-3) || J(-2) || J(-1))) {
              penalty += 40;
            }
            if (i < N - 10 && !(J(7) || J(8) || J(9) || J(10))) {
              penalty += 40;
            }
          }
        }
      }
      var numDark = 0;
      for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
          if (matrix[i][j] & 1)
            numDark++;
        }
      }
      penalty += 10 * Math.floor(Math.abs(10 - 20 * numDark / (N * N)));
      return penalty;
    }
    function getMatrix(data) {
      var matrix = init(data.version);
      fillFinders(matrix);
      fillAlignAndTiming(matrix);
      fillStub(matrix);
      var penalty = Infinity;
      var bestMask = 0;
      for (var mask = 0; mask < 8; mask++) {
        fillData(matrix, data, mask);
        fillReserved(matrix, data.ec_level, mask);
        var p = calculatePenalty(matrix);
        if (p < penalty) {
          penalty = p;
          bestMask = mask;
        }
      }
      fillData(matrix, data, bestMask);
      fillReserved(matrix, data.ec_level, bestMask);
      return matrix.map(function(row) {
        return row.map(function(cell) {
          return cell & 1;
        });
      });
    }
    module2.exports = {
      getMatrix,
      init,
      fillFinders,
      fillAlignAndTiming,
      fillStub,
      fillReserved,
      fillData,
      calculatePenalty
    };
  }
});

// node_modules/qr-image/lib/qr-base.js
var require_qr_base = __commonJS({
  "node_modules/qr-image/lib/qr-base.js"(exports2, module2) {
    "use strict";
    var encode = require_encode();
    var calculateEC = require_errorcode();
    var matrix = require_matrix();
    function _deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    var EC_LEVELS = ["L", "M", "Q", "H"];
    var versions = [
      [],
      // there is no version 0
      // total number of codewords, (number of ec codewords, number of blocks) * ( L, M, Q, H )
      [26, 7, 1, 10, 1, 13, 1, 17, 1],
      [44, 10, 1, 16, 1, 22, 1, 28, 1],
      [70, 15, 1, 26, 1, 36, 2, 44, 2],
      [100, 20, 1, 36, 2, 52, 2, 64, 4],
      [134, 26, 1, 48, 2, 72, 4, 88, 4],
      // 5
      [172, 36, 2, 64, 4, 96, 4, 112, 4],
      [196, 40, 2, 72, 4, 108, 6, 130, 5],
      [242, 48, 2, 88, 4, 132, 6, 156, 6],
      [292, 60, 2, 110, 5, 160, 8, 192, 8],
      [346, 72, 4, 130, 5, 192, 8, 224, 8],
      // 10
      [404, 80, 4, 150, 5, 224, 8, 264, 11],
      [466, 96, 4, 176, 8, 260, 10, 308, 11],
      [532, 104, 4, 198, 9, 288, 12, 352, 16],
      [581, 120, 4, 216, 9, 320, 16, 384, 16],
      [655, 132, 6, 240, 10, 360, 12, 432, 18],
      // 15
      [733, 144, 6, 280, 10, 408, 17, 480, 16],
      [815, 168, 6, 308, 11, 448, 16, 532, 19],
      [901, 180, 6, 338, 13, 504, 18, 588, 21],
      [991, 196, 7, 364, 14, 546, 21, 650, 25],
      [1085, 224, 8, 416, 16, 600, 20, 700, 25],
      // 20
      [1156, 224, 8, 442, 17, 644, 23, 750, 25],
      [1258, 252, 9, 476, 17, 690, 23, 816, 34],
      [1364, 270, 9, 504, 18, 750, 25, 900, 30],
      [1474, 300, 10, 560, 20, 810, 27, 960, 32],
      [1588, 312, 12, 588, 21, 870, 29, 1050, 35],
      // 25
      [1706, 336, 12, 644, 23, 952, 34, 1110, 37],
      [1828, 360, 12, 700, 25, 1020, 34, 1200, 40],
      [1921, 390, 13, 728, 26, 1050, 35, 1260, 42],
      [2051, 420, 14, 784, 28, 1140, 38, 1350, 45],
      [2185, 450, 15, 812, 29, 1200, 40, 1440, 48],
      // 30
      [2323, 480, 16, 868, 31, 1290, 43, 1530, 51],
      [2465, 510, 17, 924, 33, 1350, 45, 1620, 54],
      [2611, 540, 18, 980, 35, 1440, 48, 1710, 57],
      [2761, 570, 19, 1036, 37, 1530, 51, 1800, 60],
      [2876, 570, 19, 1064, 38, 1590, 53, 1890, 63],
      // 35
      [3034, 600, 20, 1120, 40, 1680, 56, 1980, 66],
      [3196, 630, 21, 1204, 43, 1770, 59, 2100, 70],
      [3362, 660, 22, 1260, 45, 1860, 62, 2220, 74],
      [3532, 720, 24, 1316, 47, 1950, 65, 2310, 77],
      [3706, 750, 25, 1372, 49, 2040, 68, 2430, 81]
      // 40
    ];
    versions = versions.map(function(v, index) {
      if (!index)
        return {};
      var res = {};
      for (var i = 1; i < 8; i += 2) {
        var length = v[0] - v[i];
        var num_template = v[i + 1];
        var ec_level = EC_LEVELS[i / 2 | 0];
        var level = {
          version: index,
          ec_level,
          data_len: length,
          ec_len: v[i] / num_template,
          blocks: [],
          ec: []
        };
        for (var k = num_template, n = length; k > 0; k--) {
          var block = n / k | 0;
          level.blocks.push(block);
          n -= block;
        }
        res[ec_level] = level;
      }
      return res;
    });
    function getTemplate(message, ec_level) {
      var i = 1;
      var len;
      if (message.data1) {
        len = Math.ceil(message.data1.length / 8);
      } else {
        i = 10;
      }
      for (; i < 10; i++) {
        var version = versions[i][ec_level];
        if (version.data_len >= len) {
          return _deepCopy(version);
        }
      }
      if (message.data10) {
        len = Math.ceil(message.data10.length / 8);
      } else {
        i = 27;
      }
      for (; i < 27; i++) {
        var version = versions[i][ec_level];
        if (version.data_len >= len) {
          return _deepCopy(version);
        }
      }
      len = Math.ceil(message.data27.length / 8);
      for (; i < 41; i++) {
        var version = versions[i][ec_level];
        if (version.data_len >= len) {
          return _deepCopy(version);
        }
      }
      throw new Error("Too much data");
    }
    function fillTemplate(message, template) {
      var blocks = new Buffer(template.data_len);
      blocks.fill(0);
      if (template.version < 10) {
        message = message.data1;
      } else if (template.version < 27) {
        message = message.data10;
      } else {
        message = message.data27;
      }
      var len = message.length;
      for (var i = 0; i < len; i += 8) {
        var b = 0;
        for (var j = 0; j < 8; j++) {
          b = b << 1 | (message[i + j] ? 1 : 0);
        }
        blocks[i / 8] = b;
      }
      var pad = 236;
      for (var i = Math.ceil((len + 4) / 8); i < blocks.length; i++) {
        blocks[i] = pad;
        pad = pad == 236 ? 17 : 236;
      }
      var offset = 0;
      template.blocks = template.blocks.map(function(n) {
        var b2 = blocks.slice(offset, offset + n);
        offset += n;
        template.ec.push(calculateEC(b2, template.ec_len));
        return b2;
      });
      return template;
    }
    function QR(text, ec_level, parse_url) {
      ec_level = EC_LEVELS.indexOf(ec_level) > -1 ? ec_level : "M";
      var message = encode(text, parse_url);
      var data = fillTemplate(message, getTemplate(message, ec_level));
      return matrix.getMatrix(data);
    }
    module2.exports = {
      QR,
      getTemplate,
      fillTemplate
    };
  }
});

// node_modules/qr-image/lib/crc32buffer.js
var require_crc32buffer = __commonJS({
  "node_modules/qr-image/lib/crc32buffer.js"(exports2, module2) {
    "use strict";
    var crc_table = [];
    for (n = 0; n < 256; n++) {
      c = crc_table[n] = new Buffer(4);
      c.writeUInt32BE(n, 0);
      for (k = 0; k < 8; k++) {
        b0 = c[0] & 1;
        b1 = c[1] & 1;
        b2 = c[2] & 1;
        b3 = c[3] & 1;
        c[0] = c[0] >> 1 ^ (b3 ? 237 : 0);
        c[1] = c[1] >> 1 ^ (b3 ? 184 : 0) ^ (b0 ? 128 : 0);
        c[2] = c[2] >> 1 ^ (b3 ? 131 : 0) ^ (b1 ? 128 : 0);
        c[3] = c[3] >> 1 ^ (b3 ? 32 : 0) ^ (b2 ? 128 : 0);
      }
    }
    var c;
    var b0;
    var b1;
    var b2;
    var b3;
    var k;
    var n;
    function update(c2, buf) {
      var l = buf.length;
      for (var n2 = 0; n2 < l; n2++) {
        var e = crc_table[c2[3] ^ buf[n2]];
        c2[3] = e[3] ^ c2[2];
        c2[2] = e[2] ^ c2[1];
        c2[1] = e[1] ^ c2[0];
        c2[0] = e[0];
      }
    }
    function crc32() {
      var l = arguments.length;
      var c2 = new Buffer(4);
      c2.fill(255);
      for (var i = 0; i < l; i++) {
        update(c2, new Buffer(arguments[i]));
      }
      c2[0] = c2[0] ^ 255;
      c2[1] = c2[1] ^ 255;
      c2[2] = c2[2] ^ 255;
      c2[3] = c2[3] ^ 255;
      return c2.readUInt32BE(0);
    }
    module2.exports = crc32;
  }
});

// node_modules/qr-image/lib/crc32.js
var require_crc32 = __commonJS({
  "node_modules/qr-image/lib/crc32.js"(exports2, module2) {
    "use strict";
    (function() {
      if (process.arch === "arm") {
        module2.exports = require_crc32buffer();
        return;
      }
      var crc_table = [];
      (function() {
        for (var n = 0; n < 256; n++) {
          var c = n;
          for (var k = 0; k < 8; k++) {
            if (c & 1) {
              c = 3988292384 ^ c >>> 1;
            } else {
              c = c >>> 1;
            }
          }
          crc_table[n] = c >>> 0;
        }
      })();
      function update(c, buf) {
        var l = buf.length;
        for (var n = 0; n < l; n++) {
          c = crc_table[(c ^ buf[n]) & 255] ^ c >>> 8;
        }
        return c;
      }
      function crc32() {
        var l = arguments.length;
        var c = -1;
        for (var i = 0; i < l; i++) {
          c = update(c, new Buffer(arguments[i]));
        }
        c = (c ^ -1) >>> 0;
        return c;
      }
      module2.exports = crc32;
    })();
  }
});

// node_modules/qr-image/lib/png.js
var require_png = __commonJS({
  "node_modules/qr-image/lib/png.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var crc32 = require_crc32();
    var PNG_HEAD = new Buffer([137, 80, 78, 71, 13, 10, 26, 10]);
    var PNG_IHDR = new Buffer([0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0]);
    var PNG_IDAT = new Buffer([0, 0, 0, 0, 73, 68, 65, 84]);
    var PNG_IEND = new Buffer([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
    function png(bitmap2, stream) {
      stream.push(PNG_HEAD);
      var IHDR = Buffer.concat([PNG_IHDR]);
      IHDR.writeUInt32BE(bitmap2.size, 8);
      IHDR.writeUInt32BE(bitmap2.size, 12);
      IHDR.writeUInt32BE(crc32(IHDR.slice(4, -4)), 21);
      stream.push(IHDR);
      var IDAT = Buffer.concat([
        PNG_IDAT,
        zlib.deflateSync(bitmap2.data, { level: 9 }),
        new Buffer(4)
      ]);
      IDAT.writeUInt32BE(IDAT.length - 12, 0);
      IDAT.writeUInt32BE(crc32(IDAT.slice(4, -4)), IDAT.length - 4);
      stream.push(IDAT);
      stream.push(PNG_IEND);
      stream.push(null);
    }
    function bitmap(matrix, size, margin) {
      var N = matrix.length;
      var X = (N + 2 * margin) * size;
      var data = new Buffer((X + 1) * X);
      data.fill(255);
      for (var i = 0; i < X; i++) {
        data[i * (X + 1)] = 0;
      }
      for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
          if (matrix[i][j]) {
            var offset = ((margin + i) * (X + 1) + (margin + j)) * size + 1;
            data.fill(0, offset, offset + size);
            for (var c = 1; c < size; c++) {
              data.copy(data, offset + c * (X + 1), offset, offset + size);
            }
          }
        }
      }
      return {
        data,
        size: X
      };
    }
    module2.exports = {
      bitmap,
      png
    };
  }
});

// node_modules/qr-image/lib/vector.js
var require_vector = __commonJS({
  "node_modules/qr-image/lib/vector.js"(exports2, module2) {
    "use strict";
    function matrix2path(matrix) {
      var N = matrix.length;
      var filled = [];
      for (var row = -1; row <= N; row++) {
        filled[row] = [];
      }
      var path2 = [];
      for (var row = 0; row < N; row++) {
        for (var col = 0; col < N; col++) {
          if (filled[row][col])
            continue;
          filled[row][col] = 1;
          if (isDark(row, col)) {
            if (!isDark(row - 1, col)) {
              path2.push(plot(row, col, "right"));
            }
          } else {
            if (isDark(row, col - 1)) {
              path2.push(plot(row, col, "down"));
            }
          }
        }
      }
      return path2;
      function isDark(row2, col2) {
        if (row2 < 0 || col2 < 0 || row2 >= N || col2 >= N)
          return false;
        return !!matrix[row2][col2];
      }
      function plot(row0, col0, dir) {
        filled[row0][col0] = 1;
        var res = [];
        res.push(["M", col0, row0]);
        var row2 = row0;
        var col2 = col0;
        var len = 0;
        do {
          switch (dir) {
            case "right":
              filled[row2][col2] = 1;
              if (isDark(row2, col2)) {
                filled[row2 - 1][col2] = 1;
                if (isDark(row2 - 1, col2)) {
                  res.push(["h", len]);
                  len = 0;
                  dir = "up";
                } else {
                  len++;
                  col2++;
                }
              } else {
                res.push(["h", len]);
                len = 0;
                dir = "down";
              }
              break;
            case "left":
              filled[row2 - 1][col2 - 1] = 1;
              if (isDark(row2 - 1, col2 - 1)) {
                filled[row2][col2 - 1] = 1;
                if (isDark(row2, col2 - 1)) {
                  res.push(["h", -len]);
                  len = 0;
                  dir = "down";
                } else {
                  len++;
                  col2--;
                }
              } else {
                res.push(["h", -len]);
                len = 0;
                dir = "up";
              }
              break;
            case "down":
              filled[row2][col2 - 1] = 1;
              if (isDark(row2, col2 - 1)) {
                filled[row2][col2] = 1;
                if (isDark(row2, col2)) {
                  res.push(["v", len]);
                  len = 0;
                  dir = "right";
                } else {
                  len++;
                  row2++;
                }
              } else {
                res.push(["v", len]);
                len = 0;
                dir = "left";
              }
              break;
            case "up":
              filled[row2 - 1][col2] = 1;
              if (isDark(row2 - 1, col2)) {
                filled[row2 - 1][col2 - 1] = 1;
                if (isDark(row2 - 1, col2 - 1)) {
                  res.push(["v", -len]);
                  len = 0;
                  dir = "left";
                } else {
                  len++;
                  row2--;
                }
              } else {
                res.push(["v", -len]);
                len = 0;
                dir = "right";
              }
              break;
          }
        } while (row2 != row0 || col2 != col0);
        return res;
      }
    }
    function pushSVGPath(matrix, stream, margin) {
      matrix2path(matrix).forEach(function(subpath) {
        var res = "";
        for (var k = 0; k < subpath.length; k++) {
          var item = subpath[k];
          switch (item[0]) {
            case "M":
              res += "M" + (item[1] + margin) + " " + (item[2] + margin);
              break;
            default:
              res += item.join("");
          }
        }
        res += "z";
        stream.push(res);
      });
    }
    function SVG_object(matrix, margin) {
      var stream = [];
      pushSVGPath(matrix, stream, margin);
      var result = {
        size: matrix.length + 2 * margin,
        path: stream.filter(Boolean).join("")
      };
      return result;
    }
    function SVG(matrix, stream, margin, size) {
      var X = matrix.length + 2 * margin;
      stream.push('<svg xmlns="http://www.w3.org/2000/svg" ');
      if (size > 0) {
        var XY = X * size;
        stream.push('width="' + XY + '" height="' + XY + '" ');
      }
      stream.push('viewBox="0 0 ' + X + " " + X + '">');
      stream.push('<path d="');
      pushSVGPath(matrix, stream, margin);
      stream.push('"/></svg>');
      stream.push(null);
    }
    function EPS(matrix, stream, margin) {
      var N = matrix.length;
      var scale = 9;
      var X = (N + 2 * margin) * scale;
      stream.push([
        "%!PS-Adobe-3.0 EPSF-3.0",
        "%%BoundingBox: 0 0 " + X + " " + X,
        "/h { 0 rlineto } bind def",
        "/v { 0 exch neg rlineto } bind def",
        "/M { neg " + (N + margin) + " add moveto } bind def",
        "/z { closepath } bind def",
        scale + " " + scale + " scale",
        ""
      ].join("\n"));
      matrix2path(matrix).forEach(function(subpath) {
        var res = "";
        for (var k = 0; k < subpath.length; k++) {
          var item = subpath[k];
          switch (item[0]) {
            case "M":
              res += item[1] + margin + " " + item[2] + " M ";
              break;
            default:
              res += item[1] + " " + item[0] + " ";
          }
        }
        res += "z\n";
        stream.push(res);
      });
      stream.push("fill\n%%EOF\n");
      stream.push(null);
    }
    function PDF(matrix, stream, margin) {
      var N = matrix.length;
      var scale = 9;
      var X = (N + 2 * margin) * scale;
      var data = [
        "%PDF-1.0\n\n",
        "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
        "2 0 obj << /Type /Pages /Count 1 /Kids [ 3 0 R ] >> endobj\n"
      ];
      data.push("3 0 obj << /Type /Page /Parent 2 0 R /Resources <<>> /Contents 4 0 R /MediaBox [ 0 0 " + X + " " + X + " ] >> endobj\n");
      var path2 = scale + " 0 0 " + scale + " 0 0 cm\n";
      path2 += matrix2path(matrix).map(function(subpath) {
        var res = "";
        var x, y;
        for (var k = 0; k < subpath.length; k++) {
          var item = subpath[k];
          switch (item[0]) {
            case "M":
              x = item[1] + margin;
              y = N - item[2] + margin;
              res += x + " " + y + " m ";
              break;
            case "h":
              x += item[1];
              res += x + " " + y + " l ";
              break;
            case "v":
              y -= item[1];
              res += x + " " + y + " l ";
              break;
          }
        }
        res += "h";
        return res;
      }).join("\n");
      path2 += "\nf\n";
      data.push("4 0 obj << /Length " + path2.length + " >> stream\n" + path2 + "endstream\nendobj\n");
      var xref = "xref\n0 5\n0000000000 65535 f \n";
      for (var i = 1, l = data[0].length; i < 5; i++) {
        xref += ("0000000000" + l).substr(-10) + " 00000 n \n";
        l += data[i].length;
      }
      data.push(
        xref,
        "trailer << /Root 1 0 R /Size 5 >>\n",
        "startxref\n" + l + "\n%%EOF\n"
      );
      stream.push(data.join(""));
      stream.push(null);
    }
    module2.exports = {
      svg: SVG,
      eps: EPS,
      pdf: PDF,
      svg_object: SVG_object
    };
  }
});

// node_modules/qr-image/lib/qr.js
var require_qr = __commonJS({
  "node_modules/qr-image/lib/qr.js"(exports2, module2) {
    "use strict";
    var Readable = require("stream").Readable;
    var QR = require_qr_base().QR;
    var png = require_png();
    var vector = require_vector();
    var fn_noop = function() {
    };
    var BITMAP_OPTIONS = {
      parse_url: false,
      ec_level: "M",
      size: 5,
      margin: 4,
      customize: null
    };
    var VECTOR_OPTIONS = {
      parse_url: false,
      ec_level: "M",
      margin: 1,
      size: 0
    };
    function get_options(options, force_type) {
      if (typeof options === "string") {
        options = { "ec_level": options };
      } else {
        options = options || {};
      }
      var _options = {
        type: String(force_type || options.type || "png").toLowerCase()
      };
      var defaults = _options.type == "png" ? BITMAP_OPTIONS : VECTOR_OPTIONS;
      for (var k in defaults) {
        _options[k] = k in options ? options[k] : defaults[k];
      }
      return _options;
    }
    function qr_image(text, options) {
      options = get_options(options);
      var matrix = QR(text, options.ec_level, options.parse_url);
      var stream = new Readable();
      stream._read = fn_noop;
      switch (options.type) {
        case "svg":
        case "pdf":
        case "eps":
          process.nextTick(function() {
            vector[options.type](matrix, stream, options.margin, options.size);
          });
          break;
        case "svgpath":
          process.nextTick(function() {
            var obj = vector.svg_object(matrix, options.margin, options.size);
            stream.push(obj.path);
            stream.push(null);
          });
          break;
        case "png":
        default:
          process.nextTick(function() {
            var bitmap = png.bitmap(matrix, options.size, options.margin);
            if (options.customize) {
              options.customize(bitmap);
            }
            png.png(bitmap, stream);
          });
      }
      return stream;
    }
    function qr_image_sync(text, options) {
      options = get_options(options);
      var matrix = QR(text, options.ec_level, options.parse_url);
      var stream = [];
      var result;
      switch (options.type) {
        case "svg":
        case "pdf":
        case "eps":
          vector[options.type](matrix, stream, options.margin, options.size);
          result = stream.filter(Boolean).join("");
          break;
        case "png":
        default:
          var bitmap = png.bitmap(matrix, options.size, options.margin);
          if (options.customize) {
            options.customize(bitmap);
          }
          png.png(bitmap, stream);
          result = Buffer.concat(stream.filter(Boolean));
      }
      return result;
    }
    function svg_object(text, options) {
      options = get_options(options, "svg");
      var matrix = QR(text, options.ec_level);
      return vector.svg_object(matrix, options.margin);
    }
    module2.exports = {
      matrix: QR,
      image: qr_image,
      imageSync: qr_image_sync,
      svgObject: svg_object
    };
  }
});

// functions/generate.js
var generate_exports = {};
__export(generate_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(generate_exports);
var import_qr_image = __toESM(require_qr(), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_os = require("os");
async function handler(event, context) {
  const url = event.body.url;
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "URL is required" })
    };
  }
  const qrCodeImage = (0, import_qr_image.image)(url);
  const filePath = import_path.default.join((0, import_os.tmpdir)(), "qr_img_code.png");
  return new Promise((resolve, reject) => {
    const writeStream = import_fs.default.createWriteStream(filePath);
    qrCodeImage.pipe(writeStream).on("finish", () => {
      resolve({
        statusCode: 200,
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `attachment; filename="qr_img_code.png"`
        },
        body: import_fs.default.readFileSync(filePath, { encoding: "base64" }),
        isBase64Encoded: true
      });
      import_fs.default.unlinkSync(filePath);
    }).on("error", () => {
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: "Could not generate QR code" })
      });
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=generate.js.map
