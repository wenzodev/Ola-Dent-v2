function initMap() {

    let options = {
        center: { lat: 50.534009, lng: 22.722607 },
        zoom: 18
    }
    map = new google.maps.Map(document.getElementById("map"), options)

    // Marker
    const marker = new google.maps.Marker({
        position: { lat: 50.53409916078723, lng: 22.722665315493114 },
        map: map,
        icon: 'https://img.icons8.com/arcade/1x/marker.png'
    })

    // Info Window
    const detailWindow = new google.maps.InfoWindow({
        content: `<h2>Ola-Dent - Michał Mełges</h2>`
    })

    // EventListener
    marker.addListener('mouseover', () => {
        detailWindow.open(map, marker)
    })
}