import Razorpay from 'razorpay'
import { appConfig } from './app.config.js'

/**
 * Razorpay client singleton.
 *
 * Reads credentials from environment variables so the same codebase works
 * across local / staging / production without code changes.
 *
 * RAZORPAY_KEY_ID     → your Razorpay API key (starts with rzp_test_ or rzp_live_)
 * RAZORPAY_KEY_SECRET → your Razorpay API secret
 * RAZORPAY_WEBHOOK_SECRET → secret set in Razorpay dashboard for webhook verification
 */

const razorpay = new Razorpay({
    key_id: appConfig.razorpay.keyId,
    key_secret: appConfig.razorpay.keySecret,
})

const RAZORPAY_WEBHOOK_SECRET = appConfig.razorpay.webhookSecret

export { razorpay, RAZORPAY_WEBHOOK_SECRET }



























// import Razorpay from 'razorpay'

// const {
//     RAZORPAY_KEY_ID,
//     RAZORPAY_KEY_SECRET,
//     RAZORPAY_WEBHOOK_SECRET
// } = process.env

// // Validate required credentials
// if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
//     throw new Error(
//         '[Razorpay Config] Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment variables'
//     )
// }

// // Razorpay client singleton
// const razorpay = new Razorpay({
//     key_id: RAZORPAY_KEY_ID,
//     key_secret: RAZORPAY_KEY_SECRET
// })

// // Optional warning for webhook setup
// if (!RAZORPAY_WEBHOOK_SECRET) {
//     console.warn(
//         '[Razorpay Config] RAZORPAY_WEBHOOK_SECRET is not configured. Webhook verification will not work.'
//     )
// }

// export {
//     razorpay,
//     RAZORPAY_WEBHOOK_SECRET
// }