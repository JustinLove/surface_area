(function() {
  var km2 = 1000000

  var formatedString = function (number) {
    var number = number / km2
    if (number < 1000) {
      return number.toPrecision(3)
    } else {
      return Math.floor(number)
    }
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
    $('.div_header_bar').after($html)
    ko.applyBindings(model, $html.get(0));
  })

  $('.div_sys_editor_group table tr:nth(3) td:first')
    .append('<div><span data-bind="text: model.planetSurfaceArea"></span> km<sup>2</sup></div>')
})()
