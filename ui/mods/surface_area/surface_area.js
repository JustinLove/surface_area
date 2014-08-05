(function() {
  var formatedString = function (number) {
      var formats = [{ postfix: '', divisor: 1 },
                     { postfix: 'K', divisor: 1000 },
                     { postfix: 'M', divisor: 1000000 },
                     { postfix: 'G', divisor: 1000000000 },
                     { postfix: 'T', divisor: 1000000000000 }];

      number = Math.floor(number);
      if (number === 0)
          return '0';
      var numDigits = String(Math.abs(number)).length;
      var format = formats[Math.floor((numDigits - 1) / 3)];

      number = format.postfix ? (number / format.divisor).toPrecision(3) : number = number / format.divisor

      return number + format.postfix
  };
  
  model.systemSurfaceArea = ko.computed(function() {
    var area = 0
    model.system().planets.forEach(function(planet) {
      area += 4 * Math.PI * Math.pow(planet.planet.radius, 2)
    })
    return formatedString(area, false)
  })

  model.planetSurfaceArea = ko.computed(function() {
    var area = 4 * Math.PI * Math.pow(model.radius(), 2)
    return formatedString(area, false)
  })

  $.get('coui://ui/mods/surface_area/surface_area.html').then(function(html) {
    var $html = $(html)
    $('#version_info').append($html)
    ko.applyBindings(model, $html.get(0));
  })

  $('.div_sys_editor_group table tr:nth(3) td:first')
    .append('<div><span data-bind="text: model.planetSurfaceArea"></span> m<sup>2</sup></div>')
})()
