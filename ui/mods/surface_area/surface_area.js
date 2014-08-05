(function() {
  model.systemSurfaceArea = ko.computed(function() {
    var area = 0
    model.system().planets.forEach(function(planet) {
      area += 4 * Math.PI * Math.pow(planet.planet.radius, 2)
    })
    return (area/1000).toFixed(0)
  })

  model.planetSurfaceArea = ko.computed(function() {
    var area = 4 * Math.PI * Math.pow(model.radius(), 2)
    return (area/1000).toFixed(0)
  })

  $.get('coui://ui/mods/surface_area/surface_area.html').then(function(html) {
    var $html = $(html)
    $('#version_info').append($html)
    ko.applyBindings(model, $html.get(0));
  })

  $('.div_sys_editor_group table tr:nth(3) td:first')
    .append('<div><span data-bind="text: model.planetSurfaceArea"></span> km<sup>2</sup></div>')
})()
