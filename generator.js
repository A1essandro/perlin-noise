// Generated by CoffeeScript 1.4.0
var PerlinNoiseGenerator;

PerlinNoiseGenerator = (function() {

  PerlinNoiseGenerator.prototype.terra = [];

  PerlinNoiseGenerator.prototype.size = 0;

  PerlinNoiseGenerator.prototype.persistence = 0;

  function PerlinNoiseGenerator() {}

  PerlinNoiseGenerator.prototype.generate = function(size, persistence) {
    var octave, octaves, x, y, _i;
    this.size = size;
    this.persistence = persistence;
    octaves = Math.log(size, 2);
    this.terra = (function() {
      var _i, _results;
      _results = [];
      for (x = _i = 0; 0 <= size ? _i < size : _i > size; x = 0 <= size ? ++_i : --_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (y = _j = 0; 0 <= size ? _j < size : _j > size; y = 0 <= size ? ++_j : --_j) {
            _results1.push(Math.random());
          }
          return _results1;
        })());
      }
      return _results;
    })();
    for (octave = _i = 0; 0 <= octaves ? _i < octaves : _i > octaves; octave = 0 <= octaves ? ++_i : --_i) {
      this.octave(octave);
    }
    return this.terra;
  };

  PerlinNoiseGenerator.prototype.octave = function(octaveN) {
    var amp, arr, dx0, dx1, dy0, dy1, freq, i, j, kx, ky, m, n, nx, ny, z, _i, _ref, _results;
    freq = Math.pow(2, octaveN);
    amp = Math.pow(this.persistence, octaveN);
    n = m = freq + 1;
    arr = (function() {
      var _i, _results;
      _results = [];
      for (j = _i = 0; 0 <= m ? _i < m : _i > m; j = 0 <= m ? ++_i : --_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (i = _j = 0; 0 <= n ? _j < n : _j > n; i = 0 <= n ? ++_j : --_j) {
            _results1.push(Math.random() * amp);
          }
          return _results1;
        })());
      }
      return _results;
    })();
    nx = this.size / (n - 1);
    ny = this.size / (m - 1);
    _results = [];
    for (ky = _i = 0, _ref = this.size; 0 <= _ref ? _i < _ref : _i > _ref; ky = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (kx = _j = 0, _ref1 = this.size; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; kx = 0 <= _ref1 ? ++_j : --_j) {
          i = parseInt(kx / nx);
          j = parseInt(ky / ny);
          dx0 = kx - i * nx;
          dx1 = nx - dx0;
          dy0 = ky - j * ny;
          dy1 = ny - dy0;
          z = (arr[j][i] * dx1 * dy1 + arr[j][i + 1] * dx0 * dy1 + arr[j + 1][i] * dx1 * dy0 + arr[j + 1][i + 1] * dx0 * dy0) / (nx * ny);
          _results1.push(this.terra[ky][kx] += z);
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  return PerlinNoiseGenerator;

})();
