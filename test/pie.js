(function() {
  var Pie, data, expect, pie;

  Pie = require('../dist/node/pie.js');

  expect = require('expect.js');

  data = [
    {
      hp: 45,
      attack: 49,
      defense: 49,
      sp_attack: 65,
      sp_defense: 65,
      speed: 45
    }, {
      hp: 60,
      attack: 62,
      defense: 63,
      sp_attack: 80,
      sp_defense: 80,
      speed: 60
    }, {
      hp: 80,
      attack: 82,
      defense: 83,
      sp_attack: 100,
      sp_defense: 100,
      speed: 80
    }, {
      hp: 45,
      attack: 25,
      defense: 50,
      sp_attack: 25,
      sp_defense: 25,
      speed: 35
    }, {
      hp: 58,
      attack: 64,
      defense: 58,
      sp_attack: 80,
      sp_defense: 65,
      speed: 80
    }, {
      hp: 44,
      attack: 48,
      defense: 65,
      sp_attack: 50,
      sp_defense: 64,
      speed: 43
    }, {
      hp: 79,
      attack: 83,
      defense: 100,
      sp_attack: 85,
      sp_defense: 105,
      speed: 78
    }, {
      hp: 60,
      attack: 45,
      defense: 50,
      sp_attack: 90,
      sp_defense: 80,
      speed: 70
    }
  ];

  pie = Pie({
    data: data,
    accessor: function(x) {
      return x.hp;
    },
    center: [1, 1],
    r: 10,
    R: 20
  });

  describe('pie chart', function() {
    it('should generate as many sectors as data', function() {
      return expect(pie.curves).to.have.length(data.length);
    });
    it('should contain circle arcs', function() {
      return expect(pie.curves[1].sector.path.print()).to.match(/A/);
    });
    it('should generate closed sectors', function() {
      return expect(pie.curves[1].sector.path.print()).to.match(/Z/);
    });
    it('should give access to the original items', function() {
      return expect(pie.curves[2].item).to.be(data[2]);
    });
    return it('should allow custom computations', function() {
      var pie1;
      pie1 = Pie({
        data: data,
        accessor: function(x) {
          return x.hp;
        },
        center: [1, 1],
        r: 10,
        R: 20,
        compute: {
          myitem: function(i, d) {
            return d;
          },
          myindex: function(i, d) {
            return i;
          }
        }
      });
      expect(pie1.curves[2].myitem).to.be(pie1.curves[2].item);
      return expect(pie1.curves[2].myindex).to.be(pie1.curves[2].index);
    });
  });

}).call(this);
