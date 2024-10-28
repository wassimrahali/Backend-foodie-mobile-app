import { Request, Response } from "express"

export async function getLocation(req: Request, res: Response) {
    try {
        const { long, lat } = req.params

        const latitude = Number(lat)
        const longitude = Number(long)

        if (isNaN(latitude) || isNaN(longitude)) {
            res.status(400).json({ error: "long or lat param is missing" })
        }

        const address = getAddressFromLatLng(latitude, longitude)

        res.json({ address })
    } catch (error) {
        res.status(500).json({ error: "something bad happened" })
    }
}

async function getAddressFromLatLng(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.display_name) {
            const address = data.display_name
            return address
        } else {
            console.error("Error in reverse geocoding: ", data)
        }
    } catch (error) {
        console.error("Error with reverse geocoding request:", error)
    }
}
