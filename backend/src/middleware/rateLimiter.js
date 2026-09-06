
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {

        const ip = req.ip;

        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, try again later",
            });
        }

        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;
