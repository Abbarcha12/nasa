const {
    getAllLaunches,
    existsLaunchWithId,
    addNewLaunches,
    abortedLaunchById
} = require('../../models/lunches.model')


const httpGetAllLaunches = async (req, res) => {
    return res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date"
        })
    }
    await addNewLaunches(launch)
    res.status(201).json(launch)
}

async function httpAbortLaunch (req, res) {
    const launchId = Number(req.params.id)
    const existsLaunch = await existsLaunchWithId(launchId)
    if (!existsLaunch) {
        return res.status(404).json({
            error: "Launch not found "
        })
    }

    const aborted = await abortedLaunchById(req.params.id)
    if (!aborted) {
        return res.status(400).json({
            error: "launch not"

        })

    }
    return res.status(200).json(aborted)
}
module.exports = {
    httpGetAllLaunches,
    httpAbortLaunch,
    httpAddNewLaunch
}