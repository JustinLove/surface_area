(function() {
  model.systemSurfaceArea = ko.computed(function() {
    var area = 0
    model.system().planets.forEach(function(planet) {
      area += 4 * Math.PI * Math.pow(planet.planet.radius, 2)
      console.log(planet, planet.radius, area)
    })
    return (area/1000).toFixed(0)
  })

  $.get('coui://ui/mods/surface_area/surface_area.html').then(function(html) {
    var $html = $(html)
    $('#version_info').append($html)
    ko.applyBindings(model, $html.get(0));
  })
})()
