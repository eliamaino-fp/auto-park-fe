function getAreas() {
    return [
        {
            busy: 42,
            coordinates: [
                [48.85, 2.4022],
                [48.85, 2.3722],
                [48.81, 2.3722],
                [48.81, 2.43]
            ]
        },
        {
            busy: 12,
            coordinates: [
                [48.85, 2.3722],
                [48.85, 2.34228],
                [48.81, 2.3222],
                [48.81, 2.3722]
            ]
        },
        {
            busy: 25,
            coordinates: [
                [48.865, 2.43],
                [48.86, 2.4022],
                [48.85, 2.4022],
                [48.81, 2.43]
            ]
        },
        {
            busy: 77,
            coordinates: [
                [48.865, 2.43],
                [48.86, 2.4022],
                [48.85, 2.4022],
            ]
        },
        {
            busy: 90,
            coordinates: [
                [48.845, 2.2922],
                [48.85, 2.34228],
                [48.81, 2.3222],
            ]
        }
    ]
}

function getDropouts() {
    return [
        [48.828, 2.3122],
        [48.84, 2.3922],
        [48.835, 2.3622],
        [48.83, 2.3222]
    ]
}

export function buildAreas(map) {
    const areas = getAreas()
    const dropouts = getDropouts()

    areas.forEach(area => {
        let color = 'grey'

        if (area.busy <= 40) {
            color = 'green'
        } else if (area.busy <= 75) {
            color = 'orange'
        } else {
            color = 'red'
        }

        L.polygon(
            area.coordinates, {
            color: color,
            fillColor: color,
            fillOpacity: 0.3,
        }).addTo(map);
    })

    let dropoutCounter = 1
    dropouts.forEach(dropout => {
        const icon = L.icon({
            iconUrl: `icons/${dropoutCounter.toString()}.png`,
            iconSize: [18, 18],
            iconAnchor: [0, 0],
        });
        L.marker(dropout, {
            icon
        }).addTo(map);

        dropoutCounter++
    })
}

let hasAreas = false;
export function displayAreas(map) {
    if (hasAreas) {
        return;
    }
    buildAreas(map)
    hasAreas = true;
}
