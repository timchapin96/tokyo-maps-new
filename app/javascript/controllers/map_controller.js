import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    apiKey: String, // a string value for the API key
    // areas: Array, // an array of areas
    // user: Object
  }
  static targets = ['globus', 'sortKey']

  connect() {
    const mobileView = {
      center: [139.749888, 35.649098],
      zoom: 9.4,
      pitch: 20
    }
    this.mapInitialize(mobileView);
    this.mapLoad();

      // this.userStep()
      // this.hover()
      // this.#addUserToMap()
  }

  mapInitialize(viewSetting) {
    mapboxgl.accessToken = this.apiKeyValue; // Set the Mapbox access token
    this.map = new mapboxgl.Map({
      container: 'map', // Set the map container
      style: 'mapbox://styles/timchap96/cleky3zxc000g01mxat00cwa8', // Set the map style
      zoom: viewSetting.zoom, // Set the initial zoom level
      center: viewSetting.center, // Set the initial center coordinates
      pitch: viewSetting.pitch,
      projection: 'globe', // Set the map projection to globe
      attributionControl: 'false'
    })
  }

  mapLoad () {
    this.map.on('load', () => {
      // Add source for ward shapes
      this.map.addSource('wards', {
        type: 'geojson',
        data: 'tokyo.geojson'
      })
      this.map.setFog({
        color: 'rgb(186, 210, 235)', // Lower atmosphere
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        'space-color': 'rgb(11, 11, 25)', // Background color
        'star-intensity': 0.6 // Background star brightness (default 0.35 at low zooms )
      })
      this.hoveredStateId = null,
      this.addLayers('white', 'black', '')
    })
  }

  addLayers (baseColor, hoverColor, type) {
    // this.removeSortLayers()
    let firstSymbolId = this.findLabels()
    this.map.addLayer(
      {
        id: `wards${type}-fill`,
        type: 'fill',
        source: 'wards',
        layout: {
          visibility: 'visible' // Set the layer visibility to "visible"
        },
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            hoverColor,
            baseColor
          ],
          'fill-opacity': 1
        }
      },
      firstSymbolId //This variable makes sure that the ward titles appear above the fill layers
    )
    this.map.addLayer(
      {
        id: `wards${type}-outline`,
        type: 'line',
        source: 'wards',
        layout: {},
        paint: {
          'line-color': 'black',
          'line-width': 3,
          'line-opacity': 0.7
        }
      },
      firstSymbolId
    )
  }

  findLabels () {
    //This function finds the ward title layer
    const layers = this.map.getStyle().layers
    // Find the index of the first symbol layer in the map style.
    let firstSymbolId
    for (const layer of layers) {
      if (layer.type === 'symbol') {
        firstSymbolId = layer.id
        break
      }
    }
    return firstSymbolId
  }
}